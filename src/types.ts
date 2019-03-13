export interface IKeys {
  publicKey: string
  privateKey: string
}

export interface IKeyValue {
  [key: string]: string
}

export interface IUser {
  keys?: IKeys
}

export interface IFile {
  hash: string
  size: string
}

export interface IPeer {
  id: string
  handshake: number
  signals: string[]
}

export interface IPeers {
  [key: string]: IPeer
}

export interface IPayload<T> {
  payload: T
}

export interface IRequest<T> {
  method: string
  body: T
}

export interface IResponse {
  body: any
  status: number
  statusText: string
}

export type ReactSetter<D> = React.Dispatch<React.SetStateAction<D>>

export type Resolver = (value: any) => void

export enum LocalMessageTypes {
  FIND = 'FIND',
  FOUND = 'FOUND',
  GET = 'GET',
  SET = 'SET',
  CONNECT = 'CONNECT',
  CREATE_CLIENT_KEY = 'CREATE_CLIENT_KEY',
  CREATE_SITE_KEY = 'CREATE_SITE_KEY',
}
