import * as React from 'react'

interface IProps {
  value: string
  onChange: React.ChangeEventHandler
  onSubmit: React.FormEventHandler
}

export const CopyableField: React.FC<IProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const [copySuccess, setCopySuccess] = React.useState('')
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  const copyToClipboard = (_evt: React.MouseEvent<HTMLButtonElement>) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.select()
      document.execCommand('copy')
      textAreaRef.current.focus()
      setCopySuccess('Copied!')
    }
  }

  return (
    <div>
      {document.queryCommandSupported('copy') && (
        <div>
          <button onClick={copyToClipboard}>copy</button>
          {copySuccess}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <textarea ref={textAreaRef} value={value} onChange={onChange} />
      </form>
    </div>
  )
}
