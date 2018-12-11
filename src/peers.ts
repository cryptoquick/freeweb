import * as Peer from 'simple-peer'
import * as uuid from 'uuid'

import { IPeer } from './types'

const encode = (data: IPeer) => atob(JSON.stringify(data))
const decode = (str: string) => JSON.parse(btoa(str))
const findPeer = (peers: IPeer[], id: string) =>
  peers.find(peer => peer.id === id)
const updatePeer = (peers: IPeer[], id: string, peer: IPeer) =>
  peers.map(p => (p.id === id ? peer : p))

const local = new Peer({
  trickle: false,
  initiator: peerData.length === 0,
})

local.on('signal', data => {
  setPeerData([...peerData, { id: uuid.v4(), signals: signals.push() }])
})

try {
  const data = evt.currentTarget.value
  const validData = decode(data)

  if (validData) {
    setPeerData(updatePeer(peerData, validData.id, validData))
    setIndex(index + 1)
    const remote = new Peer({ trickle: false })
  }
} catch (err) {
  console.error(err)
}

export class Peers {}

// import { DataBroker } from './databroker'
// import { IPacket, IPeers, PacketTypes } from './types'

// export class Peers {
//   public broker = new DataBroker()

//   private local?: RTCPeerConnection
//   private peers: Map<string, RTCPeerConnection> = new Map()
//   private sendChannels: Map<string, RTCDataChannel> = new Map()
//   private lastSiteMessage?: string

//   private config = {}

//   public init() {
//     this.local = new RTCPeerConnection(this.config)

//     for (const p of this.peers.values()) {
//       this.sendChannels.set(
//         await p.peerIdentity,
//         this.local.createDataChannel('arcjetSendChannel'),
//       )
//     }

//     this.peer.on('connection', async connection => {
//       await this.fetchPeers()
//       this.broker.addConnection(connection)

//       connection.on('data', (data: IPacket) => {
//         if (data.type === PacketTypes.findHash) {
//           this.broker.sendData(connection.peer, data.payload.hash)
//         }
//       })

//       connection.on('close', () => {
//         this.broker.removeConnection(connection.peer)
//       })
//     })
//   }

//   private updatePeers() {
//     localStorage.setItem('arcjet/peers', [...this.peers.keys()].join(','))
//   }

//   private async fetchPeers() {}

//   private publishData(data, signature) {}
// }
