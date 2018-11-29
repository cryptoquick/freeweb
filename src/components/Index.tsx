import * as React from 'react'

import { Splash, Wrap } from './Components'

const ReplaceState: React.SFC<{}> = ({}) => {
  React.useEffect(() => {
    const hash = location.hash.length > 1 && location.hash.substr(1)
  })
  return null
}

export const Index: React.SFC<{}> = ({}) => (
  <Wrap>
    <Splash>
      <ReplaceState />
      <p>welcome to arcjet</p>
    </Splash>
  </Wrap>
)
