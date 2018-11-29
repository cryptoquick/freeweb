import * as React from 'react'

import { Splash, Wrap, UserPanel, UploadPanel, SiteList } from '.'

const DetectHash: React.SFC<{}> = ({}) => {
  React.useEffect(() => {
    const hash = location.hash.length > 1 && location.hash.substr(1)
  })
  return null
}

export const Index: React.SFC<{}> = ({}) => (
  <Wrap>
    <Splash>
      <DetectHash />
      <p>arcjet</p>
      <UserPanel />
      <UploadPanel />
      <SiteList />
    </Splash>
  </Wrap>
)
