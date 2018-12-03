import { bytesToHex, hexToBytes } from '../utils'

const binaryEncoder = (_key: string, value: any) => {
  if (value instanceof Uint8Array) {
    return '0x' + bytesToHex(value)
  }
  return value
}

const binaryDecoder = (_key: string, value: any) => {
  if (!value) {
    return null
  }
  if (typeof value === 'string' && value.startsWith('0x')) {
    return hexToBytes(value)
  }
  return value
}

export const save = <T>(key: string, value: T): T => {
  localStorage.setItem(key, JSON.stringify(value, binaryEncoder))
  return value
}

export const load = <T>(key: string, defaultValue: T): T => {
  const value = localStorage.getItem(key)
  if (!value) {
    return defaultValue
  }
  return JSON.parse(value, binaryDecoder) || defaultValue
}
