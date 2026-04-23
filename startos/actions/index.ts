import { sdk } from '../sdk'
import { setAppPath } from './setAppPath'
import { setEnvVars } from './setEnvVars'
import { setStartCommand } from './setStartCommand'
import { setNodeVersion } from './setNodeVersion'

export const actions = sdk.Actions.of()
  .addAction(setAppPath)
  .addAction(setEnvVars)
  .addAction(setStartCommand)
  .addAction(setNodeVersion)
