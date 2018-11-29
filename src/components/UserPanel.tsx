import * as React from 'react'
import { sphincs } from 'sphincs'

import { useUser, User } from '../reducers'
import { QRCode } from './QRCode'

const createUser = (dispatch: any) => async () => {
  dispatch.setKeys(await sphincs.keyPair())
}

export const UserPanel: React.SFC<{}> = ({}) => {
  const [user, dispatch] = useUser<User>()
  return (
    <div>
      <p>user</p>
      {user ? (
        <div>
          <p>your public key:</p>
          <p>
            <QRCode data={user.keys.publicKey} />
          </p>
        </div>
      ) : (
        <button onClick={createUser(dispatch)}>create new user</button>
      )}
    </div>
  )
}
