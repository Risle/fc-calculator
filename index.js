var http = require('http'),
    fs = require('fs'),
    path = require('path');


http.createServer(function(req, res) {
  console.log(req.method, req.url);

  var filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  var contentType = 'text/html';
  var extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
      case '.jpg':
      contentType = 'image/jpg';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, function (err, content) {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 File Not Found');
      } else {
        throw err;
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      if (filePath === '.jpg') {
        console.log('should serve image')
        res.end(content, 'binary');
      } else {
      res.end(content, 'utf-8');
      }
    }
  });


}).listen(process.env.PORT || 3000);


console.log('server started');
