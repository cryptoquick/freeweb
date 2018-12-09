/// <reference types="webrtc" />
import 'webrtc-adapter'

import { IPacket, PacketTypes, Resolver } from './types'

export class DataBroker {
  private connections = new Map<string, Peer.DataConnection>()
  private promiseHash = new Map<string, Resolver>()

  public addConnection(connection: Peer.DataConnection) {
    this.connections.set(connection.peer, connection)

    connection.on('data', (data: IPacket) => {
      if (data.type === PacketTypes.foundHash) {
        const promise = this.promiseHash.get(data.payload.hash)
        if (promise) {
          promise(data)
        }
      }
    })
  }

  public removeConnection(id: string) {
    this.connections.delete(id)
  }

  public sendData(peer: string, hash: string) {
    const connection = this.connections.get(peer)

    if (connection) {
      chrome.storage.local.get([hash], data => {
        connection.send(data)
      })
    }
  }

  public getData(hash: string) {
    return new Promise(resolve => {
      if (resolve) {
        this.promiseHash.set(hash, resolve)
      }
      this.connections.forEach((connection, _peer) => {
        connection.send({
          payload: {
            hash,
          },
          type: PacketTypes.findHash,
        })
      })
    })
  }
}
