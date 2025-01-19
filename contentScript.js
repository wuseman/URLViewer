var links = document.getElementsByTagName('a');
var urls = [];

for (var i = 0; i < links.length; i++) {
  urls.push(links[i].href);
}

var domain = window.location.hostname;
var htmlContent = `
  <html>
    <head>
      <style>
        body {
          background-color: #111217;
          color: white;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        
        .header {
          background-color: #111217;
          color: gray;
          padding: 10px;
          text-align: center;
          border-bottom: 1px solid #554A6F;
        }
        
        table {
          margin: 20px auto;
          border-collapse: collapse;
          width: 80%;
        }
        
        th, td {
          padding: 8px;
          text-align: left;
        }
        
        th {
          border-bottom: 1px solid #554A6F;
        }
        
        tr {
          border-bottom: 1px solid #554A6F;
        }
        
        tr.services {
          border-bottom: none;
          background-color: #111217;
        }
        
        tr.services td {
          color: gray;
        }
        
        tr:hover {
          background-color: #554A6F;
        }
        
        a {
          color: #AF87D7;
          text-decoration: none;
        }
        
        a:hover {
          color: #D5B1FF;
        }
        
        .footer {
          background-color: #111217;
          color: gray;
          padding: 10px;
          text-align: center;
          border-top: 1px solid #554A6F;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${domain}</h1>
      </div>
      
      <table>
        <tr>
          <th>#</th>
          <th>URLs</th>
        </tr>
        ${urls.map(function(url, index) {
          return `<tr><td>${index + 1})</td><td><a href="${url}">${url}</a></td></tr>`;
        }).join('')}
        <tr class="services">
          <td colspan="2">Service Separator</td>
        </tr>
      </table>
      
      <div class="footer">
        <p>&copy; 2023 - All rights reserved, wuseman</p>
      </div>
    </body>
  </html>
`;

var newTab = window.open();
newTab.document.open();
newTab.document.write(htmlContent);
newTab.document.close();
