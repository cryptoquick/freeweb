import { globalReducer, ReducerInstance } from 'react-hook-utils'

import { IKeys, IUser } from '../types'
import { load, save } from './helpers'

export const useUser = globalReducer(load<IUser>('user', {}), {
  setKeys: (state, keys: IKeys) => save('user', { ...state, keys }),
})

const [_, dispatch] = useUser()

export type IUserDispatch = typeof dispatch
