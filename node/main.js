const http = require('node:http');
var express = require('express');

const hostname = 'localhost';
const port = 3061;


var server = express(); // better instead
//server => (function(){
  server.use('/',express.static('../frontend/dist/'));
  server.use('/img',express.static('../frontend/img/'));
//});

//server.listen(3061);
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain'); //! application/json
//   res.end('Hello, World!\n');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});