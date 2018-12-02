// Bytes
export const bytesToStr = (arr: Uint8Array): string => {
  const strArr: string[] = []
  for (let i = 0, ii = arr.length; i < ii; i++) {
    strArr.push(String.fromCharCode(arr[i]))
  }
  return strArr.join('').trim()
}

export const strToBytes = (str: string, len?: number): Uint8Array => {
  const arr = new Uint8Array(len || str.length)
  const pos = len ? len - str.length : 0
  for (let i = 0, ii = len || str.length; i < ii; i++) {
    arr[i] = i >= pos ? str.charCodeAt(i - pos) : 32 // charCode for a space
  }
  return arr
}

export const hexToBytes = (hex: string, len?: number): Uint8Array => {
  const byteArray = new Uint8Array(len || hex.length / 2)
  hex = hex.length % 2 ? '0' + hex : hex
  const offset = len ? len - hex.length / 2 : 0
  for (let c = 0, h = offset; c < hex.length; c += 2, h++) {
    byteArray[h] = parseInt(hex.substr(c, 2), 16)
  }
  return byteArray
}

export const bytesToHex = (arr: Uint8Array): string => {
  const hex: string[] = []
  for (let c = 0; c < arr.length; c++) {
    hex.push(arr[c].toString(16).padStart(2, '0'))
  }
  return hex.join('')
}

export const bytesEquals = (
  bytesA: Uint8Array,
  bytesB: Uint8Array,
): boolean => {
  if (bytesA.length === bytesB.length) {
    for (let i = 0, ii = bytesA.length; i < ii; i++) {
      if (bytesA[i] !== bytesB[i]) {
        return false
      }
    }
    return true
  }
  return false
}

// Assertions
export const assert = (assertion: boolean, message: string) => {
  if (!assertion) throw new Error(`Assertion Error: ${message}`)
}

export const guard = (value: boolean, message: string) => {
  if (!value) throw new Error(`Assertion Error: ${message}`)
  else return value
}
