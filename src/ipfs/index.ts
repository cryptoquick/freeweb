// @ts-ignore
import IPFS from 'ipfs'
// @ts-ignore
import Libp2p from 'libp2p'
// @ts-ignore
import Bootstrap from 'libp2p-bootstrap'
// @ts-ignore
import KadDHT from 'libp2p-kad-dht'
// @ts-ignore
import SECIO from 'libp2p-secio'
// @ts-ignore
import WebRTCStar from 'libp2p-webrtc-star'

import assert from 'assert'

/**
 * Options for the libp2p bundle
 * @typedef {Object} libp2pBundle~options
 * @property {PeerInfo} peerInfo - The PeerInfo of the IPFS node
 * @property {PeerBook} peerBook - The PeerBook of the IPFS node
 * @property {Object} config - The config of the IPFS node
 * @property {Object} options - The options given to the IPFS node
 */

/**
 * This is the bundle we will use to create our fully customized libp2p bundle.
 *
 * @param {libp2pBundle~options} opts The options to use when generating the libp2p node
 * @returns {Libp2p} Our new libp2p node
 */
const libp2pBundle = (opts: any) => {
  // Set convenience variables to clearly showcase some of the useful things that are available
  const peerInfo = opts.peerInfo
  const peerBook = opts.peerBook
  const bootstrapList = opts.config.Bootstrap

  // Create our WebSocketStar transport and give it our PeerId, straight from the ipfs node
  const webrtcstar = new WebRTCStar({
    id: peerInfo.id,
  })

  // Build and return our libp2p node
  return new Libp2p({
    // Lets limit the connection managers peers and have it check peer health less frequently
    config: {
      EXPERIMENTAL: {
        dht: true,
        pubsub: true,
      },
      dht: {
        kBucketSize: 20,
      },
      peerDiscovery: {
        bootstrap: {
          enabled: true,
          interval: 10000,
          list: bootstrapList,
        },
        mdns: {
          enabled: true,
          interval: 10000,
        },
      },
      // Turn on relay with hop active so we can connect to more peers
      relay: {
        enabled: true,
        hop: {
          active: true,
          enabled: true,
        },
      },
    },
    connectionManager: {
      maxPeers: 25,
      pollInterval: 5000,
    },
    modules: {
      connEncryption: [SECIO],
      dht: KadDHT,
      peerDiscovery: [Bootstrap, webrtcstar.discovery],
      transport: [webrtcstar],
    },
    peerBook,
    peerInfo,
  })
}

// Now that we have our custom libp2p bundle, let's start up the ipfs node!
const node = new IPFS({
  libp2p: libp2pBundle,
})

// Listen for the node to start, so we can log out some metrics
export const init = () => {
  node.once('start', async (startError: Error) => {
    assert.ifError(startError)

    setInterval(() => {
      node.swarm.peers((err: Error, peers: any[]) => {
        if (err) {
          console.log('An error occurred trying to check our peers:', err)
          process.exit(1)
        }
        console.log(`The node now has ${peers.length} peers.`)
      })

      node.stats.bw((err: Error, stats: any) => {
        if (err) {
          console.log('An error occurred trying to check our stats:', err)
        }
        console.log(`\nBandwidth Stats: ${JSON.stringify(stats, null, 2)}\n`)
      })
    }, 4000)
  })

  //   node.
}
