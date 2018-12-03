import * as filesize from 'filesize'
import * as React from 'react'

import { useFiles } from '../reducers'
import { Button, Textarea } from './Components'

const size = filesize.partial({ fullform: true })

const getValue = (hash: string, setValue: any) => (evt: any) => {
  evt.preventDefault()
  chrome.runtime.sendMessage(
    { type: 'getValue', payload: { hash } },
    response => {
      setValue(JSON.parse(response.body).value)
    },
  )
}

const addValue = (value: string, dispatch: any) => (evt: any) => {
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
