import * as qr from 'qrcode'
import * as React from 'react'

export const QRCode: React.SFC<{ data: string }> = ({ data }) => {
  const [image, setImage] = React.useState(null)

  const makeQRDataUrl = async () => {
    // @ts-ignore
    setImage(await qr.toDataURL([{ data, mode: 'byte' }]))
  }

  React.useEffect(
    () => {
      makeQRDataUrl()
    },
    [data],
  )

  if (image) {
    return <img width="128" height="128" src={image} />
  }
  return null
}
