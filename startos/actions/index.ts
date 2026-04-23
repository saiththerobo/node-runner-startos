import { sdk } from '../sdk'
import { setAppPath } from './setAppPath'
import { setEnvVars } from './setEnvVars'

export const actions = sdk.Actions.of().addAction(setAppPath).addAction(setEnvVars)
