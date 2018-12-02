import * as React from 'react'

export const UploadPanel: React.SFC<{}> = ({}) => {
  const [formState, setFormState] = React.useState('default')
  const [textState, setTextState] = React.useState('')

  return (
    <div>
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
            <button
              onClick={evt => {
                evt.preventDefault()
                console.log(textState)
                chrome.runtime.sendMessage(
                  { type: 'addValue', payload: textState },
                  response => {
                    console.log(response)
                  },
                )
              }}
            >
              submit
            </button>
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
    </div>
  )
}
