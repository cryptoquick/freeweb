interface IKeyValue {
  [key: string]: string
}

export const setStorageValues = async (obj: IKeyValue): Promise<{}> =>
  new Promise(resolve => {
    chrome.storage.local.set(obj, () => {
      resolve()
    })
  })

export const setStorageValue = async (
  key: string,
  value: string,
): Promise<void> => {
  await setStorageValues({ [key]: value })
}

export const getStorageValues = async (keys: string[]): Promise<{}> =>
  new Promise(resolve => {
    chrome.storage.local.get(keys, values => {
      resolve(values)
    })
  })

export const getStorageValue = async (key: string): Promise<string> => {
  const result: IKeyValue = await getStorageValues([key])
  return result[key]
}
