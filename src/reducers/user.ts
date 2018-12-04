import { globalReducer, Reducer, ReducerInstance } from 'react-hook-utils'

import { IKeys, IUser } from '../types'
import { load, save } from './helpers'

const reducerConfig: Reducer<IUser> = {
  setKeys: (state, keys: IKeys) => save('user', { ...state, keys }),
}

export const useUser = globalReducer(load<IUser>('user', {}), reducerConfig)
export type IUserDispatch = ReducerInstance<IUser, typeof reducerConfig>
