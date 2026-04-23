import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  startCommand: Value.text({
    name: i18n('Start Command'),
    description: i18n(
      'Command used to launch your app. Leave empty to auto-detect (npm start → index.js → server.js → app.js).',
    ),
    placeholder: 'npm run dev',
    required: false,
    default: null,
    patterns: [],
    masked: false,
    minLength: null,
    maxLength: null,
    inputmode: 'text',
  }),
})

export const setStartCommand = sdk.Action.withInput(
  'set-start-command',

  async ({ effects }) => ({
    name: i18n('Set Start Command'),
    description: i18n('Override the command used to launch your Node.js app'),
    warning: i18n('Changing the start command will restart the service.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    startCommand: (await store.read((s) => s.startCommand).once()) || '',
  }),

  async ({ effects, input }) =>
    store.merge(effects, { startCommand: input.startCommand ?? '' }),
)
