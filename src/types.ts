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

export type IPeers = string[]

export interface IPacket {
  type: string
  payload: any
}

export type ReactSetter<D> = React.Dispatch<React.SetStateAction<D>>

export enum PacketTypes {
  findHash = 'findHash',
  foundHash = 'foundHash',
}

export type Resolver = (value: any) => void
