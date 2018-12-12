import * as React from 'react'

import { IPeer } from '../types'
import { CopyableField } from './CopyableField'

export const Peers = () => {
  const [peerData, setPeerData] = React.useState<IPeer[]>([])
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {}, [])

  const submitHandler = (evt: React.FormEvent) => {
    evt.preventDefault()
  }

  const changeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault()
  }

  const value =
    peerData[index] && peerData[index].handshake
      ? peerData[index].signals[peerData[index].handshake]
      : ''

  return (
    <div>
      <ul>
        <li>
          <button>start connection</button>
        </li>
        <li>
          add peer data:
          <CopyableField
            value={value}
            onChange={changeHandler}
            onSubmit={submitHandler}
          />
          <p>new peer connection step {0}</p>
        </li>
      </ul>
    </div>
  )
}
