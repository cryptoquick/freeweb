import { globalReducer } from 'react-hook-utils'
import { save, load } from './helpers'

export interface File {
  hash: string
  size: string
}

export const useFiles = globalReducer(load<File[]>('files', []), {
  addFile: (state: File[], file: File) =>
    save<File[]>('files', { ...state, [file.hash]: file.size }),
})
