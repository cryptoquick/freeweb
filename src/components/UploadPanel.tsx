import * as filesize from 'filesize'
import * as React from 'react'

import { IFilesDispatch, useFiles } from '../reducers'
import { ReactSetter } from '../types'
import { Button, Textarea } from './Components'

const size = filesize.partial({ fullform: true })

const getValue = (hash: string, setValue: ReactSetter<null>) => (
  evt: React.MouseEvent<HTMLParagraphElement>,
) => {
  evt.preventDefault()
  chrome.runtime.sendMessage(
    { type: 'getValue', payload: { hash } },
    response => {
      setValue(JSON.parse(response.body).value)
    },
  )
}

const addValue = (value: string, dispatch: IFilesDispatch) => (
  evt: React.MouseEvent<HTMLButtonElement>,
) => {
  evt.preventDefault()
  chrome.runtime.sendMessage(
    { type: 'addValue', payload: { value } },
    response => {
      dispatch.addFile(JSON.parse(response.body))
    },
  )
}

export const UploadPanel: React.SFC<{}> = ({}) => {
  const [formState, setFormState] = React.useState('default')
  const [textState, setTextState] = React.useState('')
  const [files, dispatch] = useFiles()
  const [value, setValue] = React.useState(null)

  const setFormStateHandler = (type: string) => () => setFormState(type)
  const setTextareaHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault()
    const text = evt.currentTarget.value
    setTextState(text)
  }
  const setFileFormHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    // evt.currentTarget.value
  }
  const setFileHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    // evt
  }
  const searchTextHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    // TODO
  }
  const searchHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    // TODO
  }

  return (
    <div>
      {value && (
        <>
          <p>file</p>
          <div>{value}</div>
        </>
      )}
      <p>upload</p>
      <Button onClick={setFormStateHandler('text')}>upload text</Button>
      <Button onClick={setFormStateHandler('file')}>upload file</Button>
      <div>
        {formState === 'text' && (
          <div>
            <Textarea onChange={setTextareaHandler} />
            <br />
            <Button onClick={addValue(textState, dispatch)}>submit</Button>
          </div>
        )}
        {formState === 'file' && (
          <div>
            <input type="file" onChange={setFileFormHandler} />
            <Button onClick={setFileHandler}>submit</Button>
          </div>
        )}
      </div>
      <div>
        <p>files</p>
        <p>
          <input type="text" onChange={searchTextHandler} />
          <button
            onClick={searchHandler}
            title="find file by hash on connected peers"
          >
            find
          </button>
        </p>
        {Object.keys(files).map((hash: string) => {
          return (
            <p key={hash} onClick={getValue(hash, setValue)}>
              {hash} - {size(files[hash])}
            </p>
          )
        })}
      </div>
    </div>
  )
}
