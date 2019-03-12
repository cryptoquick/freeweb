chrome.runtime.sendMessage({ text: 'hey' }, function(response) {
  console.log('Response: ', response)
})
