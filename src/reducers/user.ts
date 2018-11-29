import { globalReducer } from 'react-hook-utils'

export interface User {
  keys: {
    publicKey: string
    privateKey: string
  }
}

export const useUser = globalReducer(null, {
  setKeys: (state, keys) => ({ ...state, keys }),
})
