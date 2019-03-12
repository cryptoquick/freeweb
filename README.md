# FreeWeb (aka Arcjet v5)

## Description

FreeWeb is a protocol for a new kind of web, one shared by people and not by corporations. FreeWeb uses a browser extension to store data for web apps on users' computers, and shares it using Social Peer-to-Peer (sp2p), in order to make running web apps free for app developers, and eliminate the costs of running web infrastructure.

Technically, it uses cryptography, like hashes, signatures, and encryption, as well as browser realtime communication to build a peer-to-peer network of websites.

## Chrome Extension

- Chrome extension, to allow the browser to access unlimited storage (localStorage is limited to 5mb, so it is useful for very few things)
- Chrome extensions can be used in the following browsers:
  - Chrome / Chromium
  - Firefox Quantum (57)
  - Opera 15
  - Brave
  - Vivaldi
  - MS Edge (if their porting tool is used)

## FreeWeb Near-term Proof of Concept Feature Development Roadmap

- [x] TypeScript and Chrome extension build system
- [ ] Key generation, kept in browser storage
  - [ ] Keys for users
  - [ ] Keys for sites
- [ ] Named keys
- [ ] Web scraper
- [ ] WebRTC Signalling Star Server
- [ ] WebRTC libp2p Client
  - [ ] findData - DHT-like network hash search
  - [ ] publishData - Publish latest hash to subscribers to a signature

## FreeWeb App API

Still under development.

## History

The FreeWeb/Arcjet design has gone through a number of revisions since serious development and experimentation began in late 2017:

- v1 was originally designed with SPHINCS signatures and SHA-3 512-bit hashes, and was expected to be run as a Node/TS program using a traditional client-server model using Express, and the expectation was the proxy all content, including cookies, through a single server, with proxy nodes participating in a P2P network via WebRTC w/PeerJS. A UTF-8 record format was also developed, and records were appended to a logfile, and an index was kept in-memory.
- v2 replaced SPHINCS and SHA-3 with a simplified (but potentially less secure) TweetNaCl signature and used SHA-256 hashes. It still used Node/TS, but didn't use cookies, as that was deemed a security flaw. It also used a new binary data format that stored everything in the filesystem without the memory index, which was still secure since it prepended metadata to all records; files couldn't be executed in isolation.
- v3 simplified that design further by ditching TweetNaCl used equivalent WebCrypto / SubtleCrypto APIs, and investigated using Rust to run the proxy server and store the data, and was going to use Maidsafe's Crust project for P2P.
- v4 goes back to the original SPHINCS and SHA-3 implementation, as they might be the most secure technology currently available, and the cost in size is mitigated through the new design. These tools will be avaiable, like Metamask, in a Chrome extension. There are a number of architectural differences that come out of the design as a Chrome extension.
- v5 uses a more conservative approach cryptographic primitives, using a full TypeScript implementation of TweetNaCl. It builds upon the v4 design of a Chrome extension, and seeks to fully implement the peer-to-peer infrastructure as the project's goals develop towards supporting FreeWeb.
