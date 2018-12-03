export interface IKeys {
  publicKey: string
  privateKey: string
}

export interface IUser {
  keys?: IKeys
}

export interface IFile {
  hash: string
  size: string
}

export type ReactSetter<D> = React.Dispatch<React.SetStateAction<D>>
