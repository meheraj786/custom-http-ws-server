import * as net from "node:net";
import * as fs from "node:fs/promises";
import * as path from "node:path";

function parseRequest(data) {
  const text = data.toString("latin1");
  const lines = text.split("\r\n");
  const [method, url, version] = lines[0].split(" ");
  return { method, url, version };
}

const server = net.createServer((socket) => {
  let requestBuffer = Buffer.alloc(0);

  socket.on("data", async (chunk) => {
    requestBuffer = Buffer.concat([requestBuffer, chunk]);

    if (requestBuffer.indexOf("\r\n\r\n") !== -1) {
      const request = parseRequest(requestBuffer);
      let filePath = request.url === "/" ? "index.html" : request.url;

      const fullPath = path.join(process.cwd(), "public", filePath);

      try {
        const content = await fs.readFile(fullPath);
        const contentType = getContentType(fullPath);
        const response =
          `HTTP/1.1 200 OK\r\n` +
          `Content-Length: ${content.length}\r\n` +
          `Content-Type: ${contentType}\r\n` +
          `Connection: close\r\n` +
          `\r\n`;
        socket.write(response);
        socket.write(content);
      } catch (error) {
        const response =
          `HTTP/1.1 404 Not Found\r\n` +
          `Content-Length: 0\r\n` +
          `Content-Type: text/plain\r\n` +
          `\r\n`;
        socket.write(response);
      }
      socket.end();
    }
  });
});

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  return types[ext] || "application/octet-stream";
}

server.listen(1234, "127.0.0.1", () => {
  console.log("server listening on port 1234");
});
