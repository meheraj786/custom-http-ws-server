import * as net from "node:net";
import * as fs from "node:fs";
import * as path from "node:path";

const server = net.createServer((socket) => {
  let requestBuffer = Buffer.alloc(0);

  socket.on("data", (chunk) => {
    requestBuffer = Buffer.concat([requestBuffer, chunk]);

    if (requestBuffer.indexOf("\r\n\r\n") !== -1) {
      const text = requestBuffer.toString("latin1");
      const url = text.split(" ")[1];

      const filePath = url === "/" ? "index.html" : url;
      const fullPath = path.join(process.cwd(), "public", filePath);

      if (fs.existsSync(fullPath)) {
        const header =
          `HTTP/1.1 200 OK\r\n` +
          `Content-Type: text/html; charset=utf-8\r\n` +
          `Transfer-Encoding: chunked\r\n` +
          `Connection: close\r\n` +
          `\r\n`;
        socket.write(header);

        const fileStream = fs.createReadStream(fullPath, {
          highWaterMark: 1024,
        });

        fileStream.on("data", (fileChunk) => {
          const sizeHex = fileChunk.length.toString(16);
          socket.write(`${sizeHex}\r\n`);
          socket.write(fileChunk);
          socket.write("\r\n");
        });

        fileStream.on("end", () => {
          socket.write("0\r\n\r\n");
          socket.end();
        });
      } else {
        const error =
          `HTTP/1.1 404 Not Found\r\n` +
          `Content-Length: 0\r\n` +
          `Content-Type: text/plain\r\n` +
          `\r\n`;
        socket.write(error);
        socket.end();
      }
    }
  });
});

server.listen(1234, "127.0.0.1", () => {
  console.log("Chunked Stream server listening on port 1234");
});
