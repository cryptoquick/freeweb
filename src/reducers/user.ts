import { globalReducer } from 'react-hook-utils'
import { load, save } from './helpers'

export const useUser = globalReducer(load('user', {}), {
  setKeys: (state, keys) => save('user', { ...state, keys }),
})
