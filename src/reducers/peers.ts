import { globalReducer, Reducer, ReducerInstance } from 'react-hook-utils'

import { IPeers } from '../types'
import { load, save } from './helpers'

const reducerConfig: Reducer<IPeers> = {
  setPeers: (_state, peers) => save('peers', peers),
}

export const useUser = globalReducer(load<IPeers>('user', []), reducerConfig)
export type IPeersDispatch = ReducerInstance<IPeers, typeof reducerConfig>
