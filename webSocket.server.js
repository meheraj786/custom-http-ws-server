import * as net from "node:net";
import { createHash } from "node:crypto";

function encodedFrame(message) {
  const payload = Buffer.from(message);
  const length = payload.length;

  const header = Buffer.alloc(2);
  header[0] = 0x81;
  header[1] = length;
  return Buffer.concat([header, payload]);
}

const server = net.createServer((socket) => {
  let requestBuffer = Buffer.alloc(0);
  let isWebSocket = false;
  socket.on("data", (chunk) => {
    requestBuffer = Buffer.concat([requestBuffer, chunk]);

    if (requestBuffer.indexOf("\r\n\r\n") !== -1) {
      const text = requestBuffer.toString("latin1");

      if (text.includes("Upgrade: websocket")) {
        console.log("WebSocket upgrade request received");

        const lines = text.split("\r\n");
        const key = lines
          .find((line) => line.startsWith("Sec-WebSocket-Key:"))
          .split(": ")[1];

        const MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
        const acceptKey = createHash("sha1")
          .update(key + MAGIC_STRING)
          .digest("base64");

        const response =
          "HTTP/1.1 101 Switching Protocols\r\n" +
          "Upgrade: websocket\r\n" +
          "Connection: Upgrade\r\n" +
          "Sec-WebSocket-Accept: " +
          acceptKey +
          "\r\n\r\n";
        socket.write(response);
        isWebSocket = true;
        requestBuffer = Buffer.alloc(0);
        console.log("Web Socket is open");
        const frame = encodedFrame("Hello from server");
        socket.write(frame);
        setTimeout(() => {
          const frame = encodedFrame("Hello from JS Server!");
          socket.write(frame);
        }, 1000);
      }
    } else {
      console.log("Server Error");
    }
  });
});

server.listen(1234, "127.0.0.1", () => {
  console.log("WebSocket server is listening on port 1234");
});
