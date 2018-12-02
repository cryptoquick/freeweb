const { webRequest } = chrome
import { sha3_512 } from 'js-sha3'

const webRequestHandler = (details: any) => {
  const { url } = details

  console.log(url)

  return {
    redirectUrl:
      'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html',
  }
}

webRequest.onBeforeRequest.addListener(
  webRequestHandler,
  {
    urls: ['http://*.arcjet/*'],
  },
  ['blocking', 'requestBody'],
)

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.update(tab.id, {
    url: 'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html',
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
  )
  if (request.type == 'addValue') {
    const hash = sha3_512(request.payload)
    chrome.storage.local.set({ [hash]: request.payload }, () => {
      console.log(hash)
      sendResponse({ response: 200, responseText: 'value added' })
    })
  }
  return true
})
