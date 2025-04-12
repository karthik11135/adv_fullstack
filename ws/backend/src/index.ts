import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const server = http.createServer(function (req: any, res: any) {
  console.log('Server is successfully created ', req.url);
  return res.end();
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  socket.on('error', (err) => {
    console.log('Error occurred', err);
  });

  socket.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        if (client == socket) {
          client.send(JSON.stringify({ message: data.toString(), mine: true }), {
            binary: isBinary,
          });
        } else
          client.send(JSON.stringify({ message: data.toString(), mine: false }), {
            binary: isBinary,
          });
      }
    });
  });

  socket.send(
    JSON.stringify({ message: 'Hello from the websocket server', mine: false })
  );
});

server.listen(3000, () => {
  console.log('Server is listening');
});
