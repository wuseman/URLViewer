chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "dumpUrls") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['contentScript.js']
      });
    });
  } else if (request.command === "dumpImages") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['imageDumpScript.js']
      });
    });
  }
});
