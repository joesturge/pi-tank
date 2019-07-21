const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const enableWebSockets = app => {
  app._httpServer = http.createServer(app);
  app._webSocketServers = [];
  app.socket = (pathname, wss) => {
    app._webSocketServers[pathname] = wss;
  }
  app.listen = (...args) => {
    app._httpServer.on('upgrade', function upgrade(request, socket, head) {
      const pathname = url.parse(request.url).pathname;

      if(pathname in app._webSocketServers) {
        app._webSocketServers[pathname].handleUpgrade(request, socket, head, function done(ws) {
          app._webSocketServers[pathname].emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    });
    return app._httpServer.listen(...args);
  };
}

const tankControl = new WebSocket.Server({ noServer: true });
tankControl.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    ws.send(data);
  });
});

const app = express();
enableWebSockets(app);

// endpoints

app.use(express.static(path.resolve("./build")));

app.socket("/controlSocket", tankControl);

app.listen(8080, () => console.log("Pi Tank Running"));
