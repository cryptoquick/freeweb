/// <reference types="webrtc" />
import 'webrtc-adapter'

import { DataBroker } from './databroker'
import { IPacket, IPeers, PacketTypes } from './types'

export class Peers {
  public broker = new DataBroker()

  private local?: RTCPeerConnection
  private peers: Map<string, RTCPeerConnection> = new Map()
  private sendChannels: Map<string, RTCDataChannel> = new Map()
  private lastSiteMessage?: string

  private config = {}

  public init() {
    this.local = new RTCPeerConnection(this.config)

    for (const p of this.peers.values()) {
      this.sendChannels.set(
        await p.peerIdentity,
        this.local.createDataChannel('arcjetSendChannel'),
      )
    }

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

  private updatePeers() {
    localStorage.setItem('arcjet/peers', [...this.peers.keys()].join(','))
  }

  private async fetchPeers() {}

  private publishData(data, signature) {}
}
