import * as filesize from 'filesize'
import * as React from 'react'

import { IFilesDispatch, useFiles } from '../reducers'
import { ReactSetter } from '../types'
import { Button, Textarea } from './Components'
import { addValue, getValue } from './helpers'

const size = filesize.partial({ fullform: true })

const getValueHandler = (
  hash: string,
  setValue: ReactSetter<string | null>,
) => async (evt: React.MouseEvent<HTMLParagraphElement>) => {
  evt.preventDefault()
  setValue(await getValue(hash))
}

const addValueHandler = (value: string, dispatch: IFilesDispatch) => async (
  evt: React.MouseEvent<HTMLButtonElement>,
) => {
  evt.preventDefault()
  dispatch.addFile(await addValue(value))
}

export const UploadPanel: React.SFC<{}> = ({}) => {
  const [formState, setFormState] = React.useState('default')
  const [textState, setTextState] = React.useState('')
  const [files, dispatch] = useFiles()
  const [value, setValue] = React.useState<string | null>(null)

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
            <Button onClick={addValueHandler(textState, dispatch)}>
              submit
            </Button>
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
            <p key={hash} onClick={getValueHandler(hash, setValue)}>
              {hash} - {size(files[hash])}
            </p>
          )
        })}
      </div>
    </div>
  )
}
