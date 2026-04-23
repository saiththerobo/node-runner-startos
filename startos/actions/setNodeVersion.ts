import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  nodeVersion: Value.select({
    name: i18n('Node.js Version'),
    description: i18n(
      'The Node.js runtime version for your app. npm install will run with the selected version.',
    ),
    default: '24',
    values: {
      '20': 'Node.js 20 (Iron LTS)',
      '22': 'Node.js 22 (Jod LTS)',
      '24': 'Node.js 24 (LTS)',
    },
  }),
})

export const setNodeVersion = sdk.Action.withInput(
  'set-node-version',

  async ({ effects }) => ({
    name: i18n('Set Node.js Version'),
    description: i18n('Choose which Node.js version to run your app with'),
    warning: i18n('Changing the Node.js version will restart the service.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    nodeVersion: (await store.read((s) => s.nodeVersion).once()) ?? '24',
  }),

  async ({ effects, input }) =>
    store.merge(effects, { nodeVersion: input.nodeVersion }),
)
