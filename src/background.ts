const { webRequest } = chrome
import { sha3_512 } from 'js-sha3'

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

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.type) {
    case 'addValue': {
      const hash = sha3_512(request.payload.value)
      chrome.storage.local.set({ [hash]: request.payload.value }, () => {
        sendResponse({
          body: JSON.stringify({ hash, size: request.payload.value.length }),
          response: 200,
          responseText: 'value added',
        })
      })
      break
    }
    case 'getValue': {
      chrome.storage.local.get([request.payload.hash], value => {
        sendResponse({
          body: JSON.stringify({ value: value[request.payload.hash] }),
          response: 200,
          responseText: 'value received',
        })
      })
      break
    }
  }
  return true
})
