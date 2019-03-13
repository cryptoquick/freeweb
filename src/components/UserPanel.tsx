import * as React from 'react'

import { IFilesDispatch, IUserDispatch, useFiles, useUser } from '../reducers'
import { IFile, IUser } from '../types'
import { Button } from './Components'
import { Peers } from './Peers'
import { QRCode } from './QRCode'

// const createUser = (
//   dispatchUser: IUserDispatch,
//   dispatchFile: IFilesDispatch,
// ) => async () => {
//   const keys = await sphincs.keyPair()
//   dispatchUser.setKeys(keys)
//   dispatchFile.addFile({
//     hash: await setValue(bytesToHex(keys.publicKey)),
//     size: 1,
//   })
// }

export const UserPanel: React.SFC<{}> = ({}) => {
  const [user, dispatchUser] = useUser<IUser>()
  const [file, dispatchFile] = useFiles<IFile>()
  return (
    <div>
      <p>user</p>
      {file ? (
        <div>
          <p>your public key:</p>
          <p>
            <QRCode data={file.hash} />
          </p>
        </div>
      ) : (
        // <Button onClick={createUser(dispatchUser, dispatchFile)}>
        //   create new user
        // </Button>
        <Button>TODO</Button>
      )}
      <p>peers</p>
      <Peers />
    </div>
  )
}
