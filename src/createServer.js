'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

function createServer() {
  return http.createServer((req, res) => {
    const keyToFiles = '/file/';
    const fileName = req.url.slice(keyToFiles.length);

    res.setHeader('Content-Type', 'text/plain');

    if (req.url.startsWith('/file') && !req.url.includes(keyToFiles)) {
      res.end('URL should start with /file/ to access a file');
    }

    if (req.url.includes(keyToFiles)) {
      fs.readFile(path.resolve('public/', fileName), 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('No such file');
        }

        if (fileName.includes('..')) {
          res.statusCode = 400;
          res.end("Can't access this file");
        }

        res.end(data);
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  });
}

module.exports = {
  createServer,
};
