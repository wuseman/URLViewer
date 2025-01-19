document.getElementById('dumpButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "dumpUrls"});
});

document.getElementById('dumpImagesButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "dumpImages"});
});
