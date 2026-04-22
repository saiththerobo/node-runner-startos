import { VersionInfo } from '@start9labs/start-sdk'

export const v_20_19_0 = VersionInfo.of({
  version: '20.19.0:0',
  releaseNotes: {
    en_US: 'Initial release of Node.js Runner',
    es_ES: 'Lanzamiento inicial de Node.js Runner',
    de_DE: 'Erstveröffentlichung von Node.js Runner',
    pl_PL: 'Pierwsze wydanie Node.js Runner',
    fr_FR: 'Première version de Node.js Runner',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
