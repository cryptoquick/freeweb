# FreeWeb (aka Arcjet v5)

## Description

FreeWeb is a protocol for a new kind of web, one shared by people and not by corporations. FreeWeb uses a browser extension to store data for web apps on users' computers, and shares it using Social Peer-to-Peer (sp2p), in order to make running web apps free for app developers, and eliminate the costs of running web infrastructure.

Under the hood, it uses cryptography, like hashes, signatures, and encryption, as well as browser realtime communication to build a peer-to-peer network of websites. It does this through IPFS, IPNS, and WebRTC. FreeWeb is different from IPFS in that every user becomes a node, and only shares data specific to them. FreeWeb apps should be designed to handle temporarily offline records.

Even the peer discovery server (called the Signalling Star) can go down and not impact performance of the network significantly (however, new peers, and those just coming online will be affected).

FreeWeb is currently in development, and there are no releases just yet. Watch this space!

If you're eager to develop your app right now, develop using IPFS APIs. FreeWeb should be a drop-in replacement for most things.

## Chrome Extension

- Chrome extension, to allow the browser to access unlimited storage (localStorage is limited to 5mb, so it is useful for very few things, and IndexedDB is limited to roughly 10% of your drive)
- Chrome extensions can be used in the following browsers:
  - Chrome / Chromium
  - Firefox Quantum (57)
  - Opera 15
  - Brave
  - Vivaldi
  - MS Edge (if their porting tool is used)

## FreeWeb Near-term Proof of Concept Feature Development Roadmap

- [x] TypeScript and Chrome extension build system
- [x] WebRTC Signalling Star Server
- [ ] WebRTC IPFS Client
  - [x] Can connect to peers locally
  - [ ] Can hole-punch through NAT and discover peers on Signalling Star
  - [ ] Can pin, and provide data to other peers in DHT using IPFS and WebRTC transport
  - [ ] Cache peers and test if Signalling Star goes down, cached peers are used to keep network online
- [ ] Package and release FreeWeb IPFS interface
- [ ] IPNS Key management
- [ ] Web scraper & sanitizer
- [ ] Out of Band STUN & IPFS Handshake strategy
- [ ] FreeWeb Lite (IndexedDB and Web Worker, can be an integrated, drop-in replacement for IPFS)
- [ ] PaidWeb Bridges (With clear explanation of all data shared)
  - [ ] The idea being, PaidWeb Bridges would be run by volunteers
  - [ ] The bridge that needs the least data from a user is going to be the most attractive

## FreeWeb App API

Will match IPFS API (with DHT and pubsub), but more documentation and examples will be provided, as well as TypeScript definitions.

## History

The FreeWeb/Arcjet design has gone through a number of revisions since serious development and experimentation began in late 2017:

- v1 was originally designed with SPHINCS signatures and SHA-3 512-bit hashes, and was expected to be run as a Node/TS program using a traditional client-server model using Express, and the expectation was the proxy all content, including cookies, through a single server, with proxy nodes participating in a P2P network via WebRTC w/PeerJS. A UTF-8 record format was also developed, and records were appended to a logfile, and an index was kept in-memory.
- v2 replaced SPHINCS and SHA-3 with a simplified (but potentially less secure) TweetNaCl signature and used SHA-256 hashes. It still used Node/TS, but didn't use cookies, as that was deemed a security flaw. It also used a new binary data format that stored everything in the filesystem without the memory index, which was still secure since it prepended metadata to all records; files couldn't be executed in isolation.
- v3 simplified that design further by ditching TweetNaCl used equivalent WebCrypto / SubtleCrypto APIs, and investigated using Rust to run the proxy server and store the data, and was going to use Maidsafe's Crust project for P2P.
- v4 goes back to the original SPHINCS and SHA-3 implementation, as they might be the most secure technology currently available, and the cost in size is mitigated through the new design. These tools will be avaiable, like Metamask, in a Chrome extension. There are a number of architectural differences that come out of the design as a Chrome extension.
- v5 uses a more conservative approach cryptographic primitives, using a full TypeScript implementation of TweetNaCl. It builds upon the v4 design of a Chrome extension, and seeks to fully implement the peer-to-peer infrastructure as the project's goals develop towards supporting FreeWeb.
