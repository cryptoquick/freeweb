export const createClientKey = () =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ text: 'hey' }, response => {})
  })
