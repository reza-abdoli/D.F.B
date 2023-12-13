const http = require('node:http');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const crypto = require("crypto");


const hostname = 'localhost';
const port = 3061;

var server = express();
const base_dir = '../frontend/'
server.use('/', express.static(base_dir + 'dist/'));
server.use('/img', express.static(base_dir + 'img/'));

// const client = redis.createClient({
//   url: "redis://username:password@localhost:6379",
//   //Connection string format: redis[s]://[[username][:password]@][host][:port]
// });
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: ''
});
client.on('error', err => console.log('Redis Client Error', err));
(async () => {
  await client.connect();
})();

server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.use(bodyParser.urlencoded({ extended: true }));

server.post('/node/sha256', (req, res) => {
  var d = req.body.data;
  var res_json;
  if (d.length < 8) {
    res_json = { message: "Error", data: "Less than 8 chars"}
    res.json(res_json)
  } else {
  const hash = crypto.createHash("sha256").update(d).digest("hex");
  res_json = { message: "Your sha256:", data: hash}
  client.set(hash, d);
  console.log(client.get(hash))
  res.json(res_json)
  }
  console.log(res_json)
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});