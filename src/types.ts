import * as Peer from 'simple-peer'

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

export interface IPeer {
  id: string
  handshake: number
  signals: string[]
  peer: Peer.Instance
}

export interface IPeers {
  [key: string]: IPeer
}

export interface IPayload<T> {
  payload: T
}

export interface IPacket<T> {
  type: string
  payload: IPayload<T>
}

export interface IResponse {
  body: any
  status: number
  statusText: string
}

export type ReactSetter<D> = React.Dispatch<React.SetStateAction<D>>

export type Resolver = (value: any) => void

export enum EventTypes {
  FIND = 'FIND',
  FOUND = 'FOUND',
  GET = 'GET',
  SET = 'SET',
  CONNECT = 'CONNECT',
}
