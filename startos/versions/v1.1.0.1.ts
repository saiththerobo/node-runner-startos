import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_1_0_1 = VersionInfo.of({
  version: '1.1.0:1',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 1.3.2)',
    es_ES: 'Actualizaciones internas (start-sdk 1.3.2)',
    de_DE: 'Interne Updates (start-sdk 1.3.2)',
    pl_PL: 'Wewnętrzne aktualizacje (start-sdk 1.3.2)',
    fr_FR: 'Mises à jour internes (start-sdk 1.3.2)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
