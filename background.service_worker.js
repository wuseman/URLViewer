chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const runScript = (fileName) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0] && tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: [fileName]
        }).catch(err => {
          console.error(`Misslyckades att köra ${fileName}: `, err);
        });
      }
    });
  };

  // Verifiera att dessa kommandon matchar popup.js exakt
  if (request.command === "dumpUrls") {
    runScript('contentScript.js');
  } 
  else if (request.command === "dumpImages") {
    runScript('imageDumpScript.js');
  } 
  else if (request.command === "dumpSeo") {
    runScript('seoDumpScript.js');
  }

  return true; 
});
