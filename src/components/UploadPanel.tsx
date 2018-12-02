import * as React from 'react'

import { File, useFiles } from '../reducers'

const getValue = (hash: string, setValue: any) => (evt: any) => {
  evt.preventDefault()
  chrome.runtime.sendMessage(
    { type: 'getValue', payload: { hash } },
    response => {
      console.log('response', response)
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

  return (
    <div>
      {value && (
        <>
          <p>file</p>
          <div>{value}</div>
        </>
      )}
      <p>upload</p>
      <button onClick={() => setFormState('text')}>upload text</button>
      <button onClick={() => setFormState('file')}>upload file</button>
      <div>
        {formState === 'text' && (
          <div>
            <textarea
              onChange={evt => {
                evt.preventDefault()
                const text = evt.currentTarget.value
                setTextState(text)
              }}
            />
            <br />
            <button onClick={addValue(textState, dispatch)}>submit</button>
          </div>
        )}
        {formState === 'file' && (
          <div>
            <input
              type="file"
              onChange={evt => {
                evt.preventDefault()
                // setTextState(evt.currentTarget.value)
              }}
            />
            <button
              onClick={evt => {
                evt.preventDefault()
                // console.log(textState)
              }}
            >
              submit
            </button>
          </div>
        )}
      </div>
      <div>
        <p>files</p>
        {Object.keys(files).map((hash: string) => {
          const value: string = files[hash]
          return (
            <p key={hash} onClick={getValue(hash, setValue)}>
              {hash} - {value}
            </p>
          )
        })}
      </div>
    </div>
  )
}
