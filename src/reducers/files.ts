import { globalReducer, Reducer, ReducerInstance } from 'react-hook-utils'
import { IFile } from '../types'
import { load, save } from './helpers'

const reducerConfig = {
  addFile: (state: IFile[], file: IFile) =>
    save<IFile[]>('files', { ...state, [file.hash]: file.size }),
}

export const useFiles = globalReducer(load<IFile[]>('files', []), reducerConfig)
export type IFilesDispatch = ReducerInstance<IFile[], typeof reducerConfig>
