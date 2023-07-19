import { OPEN, WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    server.clients.forEach(client => {
      if (client !== ws && client.readyState === OPEN) {
        client.send(data, { binary: isBinary})
      }
    })
  });
});
