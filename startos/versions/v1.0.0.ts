import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_0 = VersionInfo.of({
  version: '1.0.0:0',
  releaseNotes: {
    en_US: 'Multi-version Node.js support (18, 20, 22), environment variables, custom start command',
    es_ES: 'Soporte multi-versión de Node.js (18, 20, 22), variables de entorno, comando de inicio personalizado',
    de_DE: 'Multi-Version Node.js-Unterstützung (18, 20, 22), Umgebungsvariablen, benutzerdefinierter Startbefehl',
    pl_PL: 'Obsługa wielu wersji Node.js (18, 20, 22), zmienne środowiskowe, niestandardowe polecenie startowe',
    fr_FR: 'Support multi-version Node.js (18, 20, 22), variables d\'environnement, commande de démarrage personnalisée',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
