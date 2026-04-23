import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { store } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Node.js Runner'))

  // Read config reactively — restarts service if user changes either value
  const appPath = (await store.read((s) => s.appPath).const(effects)) || ''
  const envVars = (await store.read((s) => s.envVars).const(effects)) || []
  const customEnv = Object.fromEntries(envVars.map(({ key, value }) => [key, value]))
  const cleanPath = appPath.trim().replace(/^\/+/, '').replace(/\/+$/, '')
  const src = cleanPath
    ? `/mnt/filebrowser/${cleanPath}`
    : '/mnt/filebrowser'

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'work',
      subpath: null,
      mountpoint: '/app/work',
      readonly: false,
    })
    .mountDependency<typeof filebrowserManifest>({
      dependencyId: 'filebrowser',
      volumeId: 'data',
      subpath: null,
      mountpoint: '/mnt/filebrowser',
      readonly: true,
    })

  const appSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'node-runner' },
    mounts,
    'node-runner-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('copy-app', {
      subcontainer: appSub,
      exec: {
        // If the source folder exists and has files, copy it to /app/work.
        // Otherwise fall back to the built-in placeholder at /app/default.
        command: [
          'sh',
          '-c',
          `find /app/work -mindepth 1 -maxdepth 1 ! -name node_modules -exec rm -rf {} + 2>/dev/null || true; ` +
            `if [ -d '${src}' ] && [ "$(ls -A '${src}' 2>/dev/null)" ]; then ` +
            `cp -r '${src}/.' /app/work/; ` +
            `else cp -r /app/default/. /app/work/; fi`,
        ],
        user: 'root',
      },
      requires: [],
    })
    .addOneshot('install-deps', {
      subcontainer: appSub,
      exec: {
        command: [
          'sh',
          '-c',
          '[ -f /app/work/package.json ] && npm install --prefix /app/work || true',
        ],
      },
      requires: ['copy-app'],
    })
    .addDaemon('primary', {
      subcontainer: appSub,
      exec: {
        command: ['sh', '/entrypoint.sh'],
        env: {
          NODE_ENV: 'production',
          ...customEnv,
          PORT: String(uiPort), // always wins — app must listen on this port
        },
      },
      ready: {
        display: i18n('Node.js App'),
        gracePeriod: 30_000,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('App is running'),
            errorMessage: i18n('App is not ready'),
          }),
      },
      requires: ['install-deps'],
    })
})
