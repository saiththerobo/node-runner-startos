import { VersionGraph } from '@start9labs/start-sdk'
import { v_1_1_0 } from './v1.1.0'
import { v_1_0_0 } from './v1.0.0'
import { v_20_19_0 } from './v20.19.0'

export const versionGraph = VersionGraph.of({
  current: v_1_1_0,
  other: [v_1_0_0, v_20_19_0],
})
