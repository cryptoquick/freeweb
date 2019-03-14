import { deserialize, serialize } from './encoding'
import { IKeyValue } from './types'

// Bytes
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
  if (!assertion) {
    throw new Error(`Assertion Error: ${message}`)
  }
}

export const guard = (value: boolean, message: string) => {
  if (!value) {
    throw new Error(`Assertion Error: ${message}`)
  } else {
    return value
  }
}

// Storage
export const setStorageValues = async (obj: IKeyValue): Promise<{}> =>
  new Promise(resolve => {
    chrome.storage.local.set(obj, () => {
      resolve()
    })
  })

export const getStorageValues = async (keys: string[]): Promise<{}> =>
  new Promise(resolve => {
    chrome.storage.local.get(keys, values => {
      resolve(values)
    })
  })

export const setStorageValue = async (
  key: string,
  value: any,
): Promise<void> => {
  await setStorageValues({ [key]: serialize(value) })
}

export const getStorageValue = async <T>(key: string): Promise<T> => {
  const result: IKeyValue = await getStorageValues([key])
  return deserialize(result[key])
}
