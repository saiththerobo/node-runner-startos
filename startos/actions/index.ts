import { sdk } from '../sdk'
import { setAppPath } from './setAppPath'

export const actions = sdk.Actions.of().addAction(setAppPath)
