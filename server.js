// server.js
var os = require('os');
const webSocket = require('ws');
var port = process.env.PORT || 9030;
const wss = new webSocket.Server({ port: port });

wss.on('connection', function(w) {
  
  console.log('new connection');

  w.on('message', function(msg) {

//broadcast
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(os.hostname());
        console.log('message from client');
      }
    });

// only client
//    console.log('message from client');
//    w.send(os.hostname());
  });
  
  w.on('close', function() {
    console.log('close connection');
  });

});