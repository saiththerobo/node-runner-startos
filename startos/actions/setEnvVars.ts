import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec, Value, List } = sdk

const inputSpec = InputSpec.of({
  envVars: Value.list(
    List.obj(
      {
        name: i18n('Environment Variables'),
        description: i18n(
          'Variables are injected into your app at startup. PORT is reserved and cannot be overridden.',
        ),
        default: [],
      },
      {
        spec: InputSpec.of({
          key: Value.text({
            name: i18n('Name'),
            description: null,
            placeholder: 'MY_VAR',
            required: true,
            default: null,
            patterns: [
              {
                regex: '^[A-Za-z_][A-Za-z0-9_]*$',
                description: i18n(
                  'Letters, digits, and underscores only; must not start with a digit.',
                ),
              },
            ],
            masked: false,
            minLength: null,
            maxLength: null,
            inputmode: 'text',
          }),
          value: Value.text({
            name: i18n('Value'),
            description: null,
            placeholder: null,
            required: true,
            default: null,
            patterns: [],
            masked: false,
            minLength: null,
            maxLength: null,
            inputmode: 'text',
          }),
        }),
        displayAs: '{{key}}',
        uniqueBy: 'key',
      },
    ),
  ),
})

export const setEnvVars = sdk.Action.withInput(
  'set-env-vars',

  async ({ effects }) => ({
    name: i18n('Set Environment Variables'),
    description: i18n(
      'Configure environment variables passed to your Node.js app',
    ),
    warning: i18n('Changing environment variables will restart the service.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    envVars: (await store.read((s) => s.envVars).once()) ?? [],
  }),

  async ({ effects, input }) => store.merge(effects, { envVars: input.envVars }),
)
