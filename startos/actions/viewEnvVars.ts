import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

export const viewEnvVars = sdk.Action.withoutInput(
  'view-env-vars',

  async ({ effects }) => ({
    name: i18n('View Environment Variables'),
    description: i18n('Show all environment variables currently set for your app'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const envVars = (await store.read((s) => s.envVars).once()) ?? []

    return {
      version: '1' as const,
      title: i18n('Environment Variables'),
      message: envVars.length === 0 ? i18n('No environment variables are set.') : null,
      result:
        envVars.length === 0
          ? null
          : {
              type: 'group' as const,
              value: envVars.map(({ key, value }) => ({
                name: key,
                description: null,
                type: 'single' as const,
                value,
                copyable: true,
                qr: false,
                masked: false,
              })),
            },
    }
  },
)
