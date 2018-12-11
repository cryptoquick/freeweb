const { webRequest } = chrome
import { sha3_512 } from 'js-sha3'

import { Peers } from './peers'
import { EventTypes } from './types'

const peers = new Peers()

const webRequestHandler = () => ({
  redirectUrl: 'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html',
})

webRequest.onBeforeRequest.addListener(
  webRequestHandler,
  {
    urls: ['http://*.arcjet/*'],
  },
  ['blocking', 'requestBody'],
)

chrome.browserAction.onClicked.addListener(tab => {
  if (!tab.id) {
    return
  }
  chrome.tabs.update(tab.id, {
    url: 'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html',
  })
})

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

chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  switch (request.type) {
    case EventTypes.SET: {
      const hash = sha3_512(request.payload.value)
      await setStorageValue(hash, request.payload.value)
      sendResponse({
        body: JSON.stringify({ hash, size: request.payload.value.length }),
        response: 200,
        responseText: 'value added',
      })
      break
    }
    case EventTypes.GET: {
      let result = await getStorageValue(request.payload.hash)
      if (!result) {
        result = ''
        // result = await peers.broker.getData(request.payload.hash)
      }
      sendResponse({
        body: JSON.stringify({ value: result }),
        response: 200,
        responseText: 'value received',
      })
      break
    }
    case EventTypes.CONNECT: {
      peers.connect()
      break
    }
  }
  return true
})

// const peers = new Peers()
// peers.init()
