const { webRequest } = chrome
import { sha3_512 } from 'js-sha3'

import * as Peers from './peers'
import { getStorageValue, setStorageValue } from './storage'
import { EventTypes } from './types'

Peers.init()

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
      Peers.newPeer()
      break
    }
  }
  return true
})

// const peers = new Peers()
// peers.init()
