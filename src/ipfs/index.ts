// @ts-ignore
import CID from 'cids'
// @ts-ignore
import IPFS from 'ipfs'
// @ts-ignore
import Libp2p from 'libp2p'
// @ts-ignore
import KadDHT from 'libp2p-kad-dht'
// @ts-ignore
import SECIO from 'libp2p-secio'
// @ts-ignore
import WebRTCStar from 'libp2p-webrtc-star'

import assert from 'assert'

const libp2pBundle = ({ peerBook, peerInfo }: any) => {
  const wstar = new WebRTCStar({
    id: peerInfo.id,
  })

  return new Libp2p({
    config: {
      EXPERIMENTAL: {
        pubsub: true,
      },
      dht: {
        enabled: true,
        kBucketSize: 20,
        randomWalk: {
          enabled: false,
          interval: 30000,
          queriesPerPeriod: 1,
          timeout: 10000,
        },
      },
      peerDiscovery: {
        [wstar.discovery.tag]: {
          enabled: true,
        },
      },
    },
    connectionManager: {
      maxPeers: 60,
      pollInterval: 5000,
    },
    modules: {
      connEncryption: [SECIO],
      dht: KadDHT,
      peerDiscovery: [wstar.discovery],
      transport: [wstar],
    },
    peerBook,
    peerInfo,
  })
}

const node = new IPFS({
  EXPERIMENTAL: {
    dht: true,
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: ['/dns4/freeweb.foundation/tcp/443/wss/p2p-webrtc-star'],
    },
    Bootstrap: [],
  },
  libp2p: libp2pBundle,
  preload: {
    addresses: [],
    enabled: false,
  },
})

export const init = () => {
  node.on('error', (error: Error) => {
    console.error(error.message)
  })

  node.once('start', async (startError: Error) => {
    assert.ifError(startError)

    setInterval(async () => {
      node.swarm.peers((err: Error, peers: any[]) => {
        if (err) {
          console.log('An error occurred trying to check our peers:', err)
        }
        console.log(`The node now has ${peers.length} peers.`)
      })

      node.stats.bw((err: Error, stats: any) => {
        if (err) {
          console.log('An error occurred trying to check our stats:', err)
        }
        console.log(`Bandwidth Stats: ${JSON.stringify(stats, null, 2)}`)
      })

      node.stats.repo((err: Error, stats: any) => {
        if (err) {
          console.log('An error occurred trying to check our stats:', err)
        }
        console.log(`Repo Stats: ${JSON.stringify(stats, null, 2)}`)
      })
    }, 4000)
  })

  node.on('ready', async () => {
    const { Buffer } = IPFS
    const { version } = await node.version()

    console.log('Version:', version)

    node.config.get((err: Error, config: any) => {
      console.log('Config:', config)
    })

    setTimeout(() => {
      setInterval(async () => {
        try {
          if (localStorage.hello === 'hello') {
            const filesAdded = await node.add({
              content: Buffer.from('FreeWeb says, Hello World!'),
              path: 'hello.txt',
            })

            const { path, hash } = filesAdded[0]

            console.log('Added file:', path, hash)

            try {
              console.info('pinning', hash)
              await node.pin.add(hash)
              await node.dht.provide(new CID(hash))
              console.info('pinned')
            } catch (err) {
              console.error(err)
            }
          }

          console.log('searching')
          const fileBuffer = await node.cat(
            'QmWKZ2mMh1e5CdZ72p7MAz72vxacnPNZRR8zVzxnksHqe8',
          )
          console.log('found')
          console.log('file contents:', fileBuffer.toString())
        } catch (err) {
          console.error(err)
        }
      }, 10000)
    }, 20000)
  })
}
