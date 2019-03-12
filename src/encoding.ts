import { encodeHex, decodeHex } from 'tweetnacl-ts'

const HEX_PREFIX = '0x'
const DATE_PREFIX = '__TIME:'

const binaryEncoder = (value: {}) => {
  if (value instanceof Uint8Array) {
    return HEX_PREFIX + encodeHex(value)
  }
  return value
}

const binaryDecoder = (value: {} | null) => {
  if (!value) {
    return null
  }
  if (typeof value === 'string' && value.startsWith(HEX_PREFIX)) {
    return decodeHex(value)
  }
  return value
}

const dateEncoder = (value: {}) => {
  if (value instanceof Date) {
    return DATE_PREFIX + value.getTime().toString()
  }
  return value
}

const dateDecoder = (value: {} | null) => {
  if (!value) {
    return null
  }
  if (typeof value === 'string' && value.startsWith(DATE_PREFIX)) {
    return new Date(parseInt(value, 10))
  }
  return value
}

const replacer = (_key: string, value: {}) => binaryEncoder(dateEncoder(value))

const reviver = (_key: string, value: {}) => binaryDecoder(dateDecoder(value))

export const serialize = (value: any) => JSON.stringify(value, replacer)

export const deserialize = <T>(value: string, defaultValue?: T): T => {
  if (!value && defaultValue) {
    return defaultValue
  }
  return JSON.parse(value, reviver) || defaultValue
}
