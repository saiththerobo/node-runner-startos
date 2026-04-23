import { setupManifest } from '@start9labs/start-sdk'
import { short, long, filebrowserDescription } from './i18n'

export const manifest = setupManifest({
  id: 'node-runner',
  title: 'Node.js Runner',
  license: 'MIT',
  packageRepo: 'https://github.com/saiththerobo/node-runner-startos',
  upstreamRepo: 'https://nodejs.org',
  marketingUrl: 'https://nodejs.org',
  donationUrl: null,
  docsUrls: ['https://nodejs.org/en/docs'],
  description: { short, long },
  volumes: ['startos', 'work'],
  images: {
    'node-runner-20': {
      source: { dockerBuild: { dockerfile: './Dockerfile.node20' } },
      arch: ['x86_64', 'aarch64'],
    },
    'node-runner-22': {
      source: { dockerBuild: { dockerfile: './Dockerfile.node22' } },
      arch: ['x86_64', 'aarch64'],
    },
    'node-runner-24': {
      source: { dockerBuild: { dockerfile: './Dockerfile.node24' } },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    filebrowser: {
      description: filebrowserDescription,
      optional: false,
      metadata: {
        title: 'File Browser',
        icon: 'https://raw.githubusercontent.com/Start9Labs/filebrowser-startos/fbf1fefb51cca9731f2a9a9e6f790ca150aa9d04/icon.svg',
      },
    },
  },
})
