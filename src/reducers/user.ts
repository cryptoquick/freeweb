import { globalReducer, Reducer, ReducerInstance } from 'react-hook-utils'

import { IKeys, IUser } from '../types'

const reducerConfig: Reducer<IUser> = {
  setKeys: (state, keys: IKeys) => ({ ...state, keys }),
}

export const useUser = globalReducer({}, reducerConfig)
export type IUserDispatch = ReducerInstance<IUser, typeof reducerConfig>
