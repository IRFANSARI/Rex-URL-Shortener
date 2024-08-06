const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const hostname = 'http://127.0.0.1/';

const homepage = fs.readFileSync('./template/index.html');
const styles = fs.readFileSync('./template/styles.css');

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const pathname = urlObj.pathname;

  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(homepage);
  } else if (pathname === '/' && req.method === 'POST') {
    let body = '';

    // Collect data chunks
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    const longURL = querystring.parse(body).url;
    const shortURL =
      hostname +
      Math.random().toString(36).substring(6, 8) +
      Date.now().toString(36).substring(2) +
      Math.random().toString(36).substring(6, 8);

    // check if data is already stored
    // if not store it in database

    res.end(shortURL);
  } else if (pathname === '/styles.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(styles);
  } else {
    // Here redirect them  to corresponding site
    res.end('YES');
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
