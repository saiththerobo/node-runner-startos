import { sdk } from '../sdk'
import { setAppPath } from './setAppPath'
import { setEnvVars } from './setEnvVars'
import { setStartCommand } from './setStartCommand'

export const actions = sdk.Actions.of()
  .addAction(setAppPath)
  .addAction(setEnvVars)
  .addAction(setStartCommand)
