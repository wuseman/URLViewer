(function() {
  const links = document.querySelectorAll('a');
  console.log("Found links:", links.length); // Log the number of links found
  const rawUrls = Array.from(links).map(a => a.href).filter(href => href && href.startsWith('http'));
  console.log("Raw URLs (http only):", rawUrls.length, rawUrls); // Log raw URLs
  const urls = [...new Set(rawUrls)]; 
  console.log("Unique URLs:", urls.length, urls); // Log unique URLs
  const domain = window.location.hostname;

  // Förbered listan för wget
  const wgetListString = urls.map(url => 'wget "' + url + '"').join('\\n');
  console.log("wgetListString (first 200 chars):", wgetListString.substring(0, 200)); // Log part of the wget string

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>URL Dump - ${domain}</title>
        <style>
          body { background-color: #111217; color: white; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; }
          .header { background-color: #111217; color: #554A6F; padding: 10px; text-align: center; border-bottom: 1px solid #554A6F; margin-bottom: 20px; }
          .action-bar { text-align: center; margin-bottom: 25px; }
          .wget-btn { 
            background-color: #554A6F; color: white; border: none; padding: 12px 24px; 
            cursor: pointer; border-radius: 4px; font-weight: bold; transition: 0.2s; 
          }
          .wget-btn:hover { background-color: #AF87D7; }
          table { margin: 0 auto; border-collapse: collapse; width: 90%; max-width: 1200px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #2A2C33; }
          th { color: #AF87D7; text-transform: uppercase; font-size: 0.8em; border-bottom: 2px solid #554A6F; }
          tr:hover { background-color: #1A1B23; }
          a { color: #AF87D7; text-decoration: none; word-break: break-all; }
          .footer { margin-top: 40px; color: gray; padding: 20px; text-align: center; border-top: 1px solid #554A6F; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${domain}</h1>
          <p>Found ${urls.length} unique URLs</p>
        </div>

        <table>
          <thead>
            <tr><th style="width: 50px;">#</th><th>URL</th></tr>
          </thead>
          <tbody>
            ${urls.map((url, index) => `
              <tr>
                <td>${index + 1}</td>
                <td><a href="${url}" target="_blank" rel="noopener">${url}</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer"><p>&copy; 2026 - wuseman</p></div>

        <script>
          (function() {
            const btn = document.getElementById('copyWget');
            if (btn) {
              btn.onclick = function() {
                const text = \`${wgetListString}\`;
                console.log("Text to copy (first 200 chars):", text.substring(0, 200)); // Log the text being copied
                if (!text) {
                  alert("No URLs to copy!");
                  return;
                }
                navigator.clipboard.writeText(text).then(() => {
                  const originalText = btn.innerText;
                  btn.innerText = "COPIED TO CLIPBOARD!";
                  btn.style.background = "#87D7AF";
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "#554A6F";
                  }, 2000);
                }).catch(err => {
                  console.error("Clipboard error:", err);
                  alert("Error: " + err);
                });
              };
            } else {
              console.error("Kunde inte hitta knappen copyWget i DOM.");
            }
          })();
        </script>
      </body>
    </html>
  `;

  const newTab = window.open();
  if (newTab) {
    newTab.document.open();
    newTab.document.write(htmlContent);
    newTab.document.close();
  } else {
    alert("Popup blockerades! Tillåt popups.");
  }
})();
