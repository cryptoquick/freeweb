import * as React from 'react'
import { sphincs } from 'sphincs'

import { IFilesDispatch, IUserDispatch, useFiles, useUser } from '../reducers'
import { IUser } from '../types'
import { bytesToHex } from '../utils'
import { Button } from './Components'
import { addValue } from './helpers'
import { QRCode } from './QRCode'

const createUser = (
  dispatchUser: IUserDispatch,
  dispatchFile: IFilesDispatch,
) => async () => {
  const keys = await sphincs.keyPair()
  dispatchUser.setKeys(keys)
  dispatchFile.addFile({
    hash: await addValue(bytesToHex(keys.publicKey)),
    size: 1,
  })
}

export const UserPanel: React.SFC<{}> = ({}) => {
  const [user, dispatchUser] = useUser<IUser>()
  const [file, dispatchFile] = useFiles()
  return (
    <div>
      <p>user</p>
      {user.keys ? (
        <div>
          <p>your public key:</p>
          <p>
            <QRCode data={file} />
          </p>
        </div>
      ) : (
        <Button onClick={createUser(dispatchUser, dispatchFile)}>
          create new user
        </Button>
      )}
    </div>
  )
}
