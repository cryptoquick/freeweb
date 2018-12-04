import * as Peer from 'peerjs'

import { DataBroker } from './databroker'
import { IPacket, IPeers, PacketTypes } from './types'

export class Peers {
  public broker = new DataBroker()

  private me: string = ''
  private peers: string[] = []
  private peer = new Peer({ host: 'localhost', port: 8080, path: '/api' })

  public init() {
    this.peer.on('open', async (id: string) => {
      await this.fetchPeers()
      this.me = id

      for (const p of this.peers) {
        this.peer.connect(p)
      }
    })

    this.peer.on('connection', async connection => {
      await this.fetchPeers()
      this.broker.addConnection(connection)

      connection.on('data', (data: IPacket) => {
        if (data.type === PacketTypes.findHash) {
          this.broker.sendData(connection.peer, data.payload.hash)
        }
      })

      connection.on('close', () => {
        this.broker.removeConnection(connection.peer)
      })
    })
  }

  private async fetchPeers() {
    const res = await fetch('http://localhost:8080/peers')
    this.peers = (await res.json()) as IPeers
    this.peers = this.peers.filter(p => p !== this.me)
  }
}
