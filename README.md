# arcjetx (arcjet v4)

The Arcjet design has gone through a number of revisions since its somewhat recent introduction:

- v1 was originally designed with SPHINCS signatures and SHA-3 512-bit hashes, and was expected to be run as a Node/TS program using a traditional client-server model using Express, and the expectation was the proxy all content, including cookies, through a single server, with proxy nodes participating in a P2P network via WebRTC w/PeerJS. A UTF-8 record format was also developed, and records were appended to a logfile, and an index was kept in-memory.
- v2 replaced SPHINCS and SHA-3 with a simplified (but less secure) TweetNaCl signature and used SHA-256 hashes. It still used Node/TS, but didn't use cookies, as that was deemed a security flaw. It also used a new binary data format that stored everything in the filesystem without the memory index, which was still secure since it prepended metadata to all records; files couldn't be executed in isolation.
- v3 simplified that design further by ditching TweetNaCl used equivalent WebCrypto / SubtleCrypto APIs, and investigated using Rust to run the proxy server and store the data, and was going to use Maidsafe's Crust project for P2P.
- v4 design goes back to the original SPHINCS and SHA-3 implementation, as they the most secure technology currently available, and the cost in size is mitigated through the new design. These tools will be avaiable, like Metamask, in a Chrome extension. There are a number of architectural differences between the others and v4 as well...

## v4 design choices

- Chrome extension, to allow the browser to access unlimited storage (localStorage is limited to 5mb, so it is useful for very few things)
- Chrome extensions can be used in the following browsers:
  - chrome / chromium
  - firefox quantum (57)
  - opera 15
  - brave
  - vivaldi
  - likely others, i.e., if they use the Brave Muon browser framework
  - ms edge (if their porting tool is used)
- SPHINCS for signatures; it is quantum-resistant, and available in WASM format
- SHA-3 to check integrity, should be very resistant to known attacks
- PeerJS for WebRTC data channels to other browsers
- Fully Content-Addressable; records have no metadata, but the request provides the context or metadata in the parent record that's making the network call for the hash.
- Any new data must add a new record, updating other records to point to those records as-needed. No record can be updated in-place, but can notify users who have followed your user on the network, if you add a signature record and associate those with a triple (new record, predicate "was updated by", user record).
- Old records can be removed locally automatically, but anyone else sharing copies may keep them.
- Pinning servers may be used in order to keep less popular, or new content persistent without the participation of others. In order to get an account on a pinning server, they may charge customers a fee.
- A Peer Discovery server in Iceland, which will be the one I'm operating, is used as both a STUN server for NAT traversal and for PEX.

## features

- [x] typescript and chrome extension
- [x] SPHINCS signature & quantum resistant public/private keys, store in localStorage and accessible via QR code
- [ ] upload and storage of files in UTF-8 using chrome extension in browser unlimited storage
- [ ] peerjs to servers
- [ ] peerjs to clients
- [ ] image resize
- [ ] lunr search to add index records
- [ ] static hosting to access sites from the arcjet network
  - [ ] loads config from this and lists everything
- [ ] blacklist
- [ ] bookmarks (live updates from users)
- [ ] other features
  - [ ] encryption and key sharing
  - [ ] emojis

## repo

[GitHub - arcjet/arcjetx: extension for chrome-compatible browsers for accessing sites using the .arcjet tld and the arcjet network](https://github.com/arcjet/arcjetx)
