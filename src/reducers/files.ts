import { globalReducer, Reducer, ReducerInstance } from 'react-hook-utils'
import { IFile, IKeyValue } from '../types'

const reducerConfig: Reducer<IKeyValue> = {
  addFile: (state: IKeyValue, file: IFile) => ({
    ...state,
    [file.hash]: file.size,
  }),
}

export const useFiles = globalReducer({}, reducerConfig)
export type IFilesDispatch = ReducerInstance<IKeyValue, typeof reducerConfig>
