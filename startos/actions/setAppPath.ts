import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  appPath: Value.text({
    name: i18n('App Folder Path'),
    description: i18n(
      'Path within File Browser containing your Node.js app (e.g. "my-app"). Leave empty to use the File Browser root.',
    ),
    placeholder: 'my-app',
    required: false,
    default: null,
    patterns: [],
    masked: false,
    minLength: null,
    maxLength: null,
    inputmode: 'text',
  }),
})

export const setAppPath = sdk.Action.withInput(
  'set-app-path',

  async ({ effects }) => ({
    name: i18n('Set App Path'),
    description: i18n(
      'Configure which folder in File Browser contains your Node.js app',
    ),
    warning: i18n('Changing this path will restart the service.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    appPath: (await store.read((s) => s.appPath).once()) || '',
  }),

  async ({ effects, input }) =>
    store.merge(effects, { appPath: input.appPath ?? '' }),
)
