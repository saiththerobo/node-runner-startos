import { sdk } from '../sdk'
import { setAppPath } from './setAppPath'
import { setEnvVars } from './setEnvVars'
import { viewEnvVars } from './viewEnvVars'

export const actions = sdk.Actions.of()
  .addAction(setAppPath)
  .addAction(setEnvVars)
  .addAction(viewEnvVars)
