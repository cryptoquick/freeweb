import { globalReducer } from 'react-hook-utils'
import { IFile } from '../types'
import { load, save } from './helpers'

export const useFiles = globalReducer(load<IFile[]>('files', []), {
  addFile: (state: IFile[], file: IFile) =>
    save<IFile[]>('files', { ...state, [file.hash]: file.size }),
})

const [_, dispatch] = useFiles()

export type IFilesDispatch = typeof dispatch
