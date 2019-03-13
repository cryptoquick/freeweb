import { deserialize, serialize } from './encoding'
import { IKeyValue } from './types'

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
