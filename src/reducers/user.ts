import { globalReducer } from 'react-hook-utils'
import { save, load } from './helpers'

export interface User {
  keys: {
    publicKey: string
    privateKey: string
  }
}

export const useUser = globalReducer(load('user', null), {
  setKeys: (state, keys) => save('user', { ...state, keys }),
})
