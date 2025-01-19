chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'dump_urls') {
        // Din kod för att dumpa URL:erna
        var links = document.getElementsByTagName('a');
        var urls = [];

        for (var i = 0; i < links.length; i++) {
            urls.push(links[i].href);
        }

        sendResponse({urls: urls});
    }
});
