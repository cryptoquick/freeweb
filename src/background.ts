const { webRequest } = chrome

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
    urls: [
      'http://*.arcjet/*',
      'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html#*',
    ],
  },
  ['blocking', 'requestBody'],
)

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.update(tab.id, {
    url: 'chrome-extension://gicmmlbnpjlcenhoncblehbkojdcnmon/index.html',
  })
})
