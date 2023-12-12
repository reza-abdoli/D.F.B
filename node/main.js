const http = require('node:http');
var express = require('express');

const hostname = 'localhost';
const port = 3069;

const base_dir =  '../frontend/'             

var server = express(); // better instead
//server => (function(){
  server.use('/',express.static( base_dir + 'dist/'));
  server.use('/golang/img',express.static( '../golang/img/'));
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