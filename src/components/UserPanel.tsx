import * as React from 'react'
import { sphincs } from 'sphincs'

import { useUser } from '../reducers'
import { IUser } from '../types'
import { Button } from './Components'
import { QRCode } from './QRCode'

const createUser = (dispatch: any) => async () => {
  dispatch.setKeys(await sphincs.keyPair())
}

export const UserPanel: React.SFC<{}> = ({}) => {
  const [user, dispatch] = useUser<IUser>()
  return (
    <div>
      <p>user</p>
      {user.keys ? (
        <div>
          <p>your public key:</p>
          <p>
            <QRCode data={user.keys.publicKey} />
          </p>
        </div>
      ) : (
        <Button onClick={createUser(dispatch)}>create new user</Button>
      )}
    </div>
  )
}
