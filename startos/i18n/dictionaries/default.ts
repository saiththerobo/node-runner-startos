export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Node.js Runner': 0,
  'Node.js App': 1,
  'App is running': 2,
  'App is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The web interface of your Node.js app': 5,

  // actions/setAppPath.ts
  'Set App Path': 6,
  'Configure which folder in File Browser contains your Node.js app': 7,
  'Changing this path will restart the service.': 8,
  'App Folder Path': 9,
  'Path within File Browser containing your Node.js app (e.g. "my-app"). Leave empty to use the File Browser root.': 10,
  'Set the File Browser folder that contains your Node.js app': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
