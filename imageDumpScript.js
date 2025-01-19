// imageDumpScript.js
function scrollToBottom(callback) {
  var maxScrolls = 10; // Maximum number of scrolls, adjust as needed
  var scrollCount = 0;
  var distance = window.innerHeight; // Scroll a full window height each time
  var interval = 100; // Faster interval

  var intervalId = setInterval(() => {
    window.scrollBy(0, distance);
    scrollCount++;

    if (scrollCount >= maxScrolls) {
      clearInterval(intervalId);
      callback(); // Call the callback function after the final scroll
    }
  }, interval);
}

function collectAndDisplayImages() {
  var images = document.querySelectorAll('img');
  var imageUrls = Array.from(images).map(img => img.src);

  var newTab = window.open();
  var htmlContent = '<html><head><title>Image Gallery</title></head><body>';
  htmlContent += '<h1>Image Gallery</h1>';
  htmlContent += imageUrls.map(url => `<img src="${url}" style="margin: 10px; width: 300px; height: auto;">`).join('');
  htmlContent += '</body></html>';

  newTab.document.write(htmlContent);
}

scrollToBottom(collectAndDisplayImages);
