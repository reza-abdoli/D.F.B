const http = require('node:http');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const crypto = require("crypto");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}



const hostname = 'redis';
const port = 3060;

var server = express();
const base_dir = '../frontend/'
server.use('/', express.static(base_dir + 'dist/'));
//server.use('/img', express.static(base_dir + 'img/'));

const client = redis.createClient({
  url: 'redis://redis:6379'
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

server.use(cors(corsOptions)) 

server.post('/node/sha256', (req, res) => {
  var d = req.body.data;
  var res_json;
  if (d.length < 8) {
    res_json = { message: "Error", data: "Less than 8 chars" }
    res.send(res_json)
  } else {
    const hash = crypto.createHash("sha256").update(d).digest("hex");
    res_json = { message: "Your sha256:", data: hash }
    client.set(hash, d);
    res.send(res_json)
  }
  console.log(res_json)
})

server.get('/node/sha256', (req, res) => {
  const sha = (req.query.sha);
  client.get(sha) 
    .then(function (reply, err) { 
      console.log(reply);
      console.log(err);
      res_json = { message: "Error", data: "The sha does not exist" };
      if (err || reply == null) {
        res.send(res_json);
      } else {
        res_json = { message: "Your data:", data: reply };
        res.send(res_json);
      }
      console.log(res_json);
    })
})


server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});