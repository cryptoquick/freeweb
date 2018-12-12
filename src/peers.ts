import * as _ from 'lodash'
import * as Peer from 'simple-peer'
import * as uuid from 'uuid'

import { getStorageValue } from './storage'
import { IPeer, IPeers } from './types'

const encode = (data: IPeer) => atob(JSON.stringify(data))
const decode = (str: string) => JSON.parse(btoa(str))

let peers: IPeers = {}
let local: string = ''
export const newPeer = (): string => {
  const initiator = countPeers() === 0

  const peer = new Peer({
    initiator,
    trickle: false,
  })

  const id = uuid.v4()

  peer.on('signal', signal => {
    console.log(signal)
    updatePeer(id, { id, signals: [encode(signal)], handshake: 0, peer })
  })

  return id
}
export const findPeer = (id: string): IPeer => peers[id]
export const updatePeer = (id: string, peer: IPeer): IPeer => (peers[id] = peer)
export const countPeers = (): number => Object.keys(peers).length

export const connect = (data: string) => {
  try {
    const signal = decode(data)

    if (signal) {
      updatePeer(signal.id, signal)
      const remote = new Peer({ trickle: false })
    }
  } catch (err) {
    console.error(err)
  }
}

export const init = async () => {
  console.log(getStorageValue)
  peers = JSON.parse(await getStorageValue('arcjet/peers'))
  local = newPeer()
  if (countPeers() > 1) {
    _(peers)
      .filter(({ id }) => id !== local)
      .forEach(remote => {
        // TODO reconnect logic
        console.log(remote)
      })
  }
}

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
