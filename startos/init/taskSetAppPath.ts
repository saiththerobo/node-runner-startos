import { setAppPath } from '../actions/setAppPath'
import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

export const taskSetAppPath = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  if (await store.read((s) => s.appPath).once()) return

  await sdk.action.createOwnTask(effects, setAppPath, 'critical', {
    reason: i18n('Set the File Browser folder that contains your Node.js app'),
  })
})
