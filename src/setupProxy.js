const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const url = require('url');
const proxy = require("http-proxy-middleware");

const tankControl = new WebSocket.Server({ port: 3001 });
tankControl.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log(data);
  });
});

module.exports = app => {
  app.use(proxy('/controlSocket', { target: 'http://localhost:3001', ws: true }));
}
