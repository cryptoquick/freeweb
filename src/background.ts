const { webRequest } = chrome

import { hashBlockHex } from './crypto'
import { serialize } from './encoding'
import { getStorageValue, setStorageValue } from './storage'
import { LocalMessageTypes } from './types'

const webRequestHandler = () => ({
  redirectUrl: `chrome-extension://${chrome.runtime.id}/index.html`,
})

webRequest.onBeforeRequest.addListener(
  webRequestHandler,
  {
    urls: ['http://*.free/*'],
  },
  ['blocking', 'requestBody'],
)

chrome.browserAction.onClicked.addListener(tab => {
  if (!tab.id) {
    return
  }
  chrome.tabs.update(tab.id, {
    url: `chrome-extension://${chrome.runtime.id}/index.html`,
  })
})

chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  switch (request.type) {
    case LocalMessageTypes.SET: {
      const hash = hashBlockHex(request.payload.value)
      await setStorageValue(hash, request.payload.value)
      sendResponse({
        body: serialize({ hash, size: request.payload.value.length }),
        response: 200,
        responseText: 'value added',
      })
      break
    }
    case LocalMessageTypes.GET: {
      let result = await getStorageValue(request.payload.hash)
      if (!result) {
        result = ''
        // result = await peers.broker.getData(request.payload.hash)
      }
      sendResponse({
        body: serialize({ value: result }),
        response: 200,
        responseText: 'value received',
      })
      break
    }
    case LocalMessageTypes.CONNECT: {
      break
    }
  }
  return true
})

// const peers = new Peers()
// peers.init()
