import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_1_0 = VersionInfo.of({
  version: '1.1.0:0',
  releaseNotes: {
    en_US: 'Add Node.js 24 (now default), drop EOL Node.js 18',
    es_ES: 'Añade Node.js 24 (ahora predeterminado), elimina Node.js 18 (EOL)',
    de_DE: 'Node.js 24 hinzugefügt (jetzt Standard), EOL Node.js 18 entfernt',
    pl_PL: 'Dodano Node.js 24 (teraz domyślny), usunięto Node.js 18 (EOL)',
    fr_FR: "Ajout de Node.js 24 (désormais par défaut), suppression de Node.js 18 (EOL)",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
