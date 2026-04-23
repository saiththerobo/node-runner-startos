import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  appPath: z.string().catch(''),
  envVars: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .catch([]),
})

export const store = FileHelper.json(
  {
    base: sdk.volumes.startos,
    subpath: '/store.json',
  },
  shape,
)

export type StoreType = z.infer<typeof shape>
