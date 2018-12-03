export interface IUser {
  keys: {
    publicKey: string
    privateKey: string
  }
}

export interface IFile {
  hash: string
  size: string
}
