const http = require('node:http');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const crypto = require("crypto");


const hostname = 'localhost';
const port = 3060;

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
    res_json = { message: "Error", data: "Less than 8 chars" }
    res.json(res_json)
  } else {
    const hash = crypto.createHash("sha256").update(d).digest("hex");
    res_json = { message: "Your sha256:", data: hash }
    client.set(hash, d);
    console.log(client.get(hash))
    res.json(res_json)
  }
  console.log(res_json)
})

server.get('/node/sha256', (req, res) => {
  const sha = (req.query.sha);
  client.get(sha) // get() is a producing code -> it means it takes some time. -> so it returns a promise (every function takes time to prepare sth to return, returns promise) // get() itself has async
    .then(function (reply, err) { // Promise -> first function is executed (resolve). we don't need function error.  // X.then(function(value) {}) is equal to value = await X (putting await makes functions just return the value (err is being ignored))
      console.log(reply);
      console.log(err);
      res_json = { message: "Error", data: "Does not exist" };
      if (err || reply == null) {
        res.json(res_json);
      } else {
        res_json = { message: "Your data:", data: reply };
        res.json(res_json);
      }
      console.log(res_json);
    })

  // const t = await client.get(sha);
  // console.log(t)

})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});