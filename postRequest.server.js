import { request } from "node:http";
import * as net from "node:net";
import { parse } from "node:path";

function parseHTTPRequest(buffer) {
  const headerEnd = buffer.indexOf("\r\n\r\n");
  if (headerEnd === -1) return null;

  const rawHeaders = buffer.slice(0, headerEnd).toString("latin1");
  const lines = rawHeaders.split("\r\n");
  const [method, url, version] = lines[0].split(" ");

  const headers = {};
  for (let i = 1; i < lines.length; i++) {
    const [key, value] = lines[i].split(": ");
    if (key) headers[key.toLowerCase()] = value;
  }
  return { method, url, version, headers, headerLen: headerEnd + 4 };
}

const server = net.createServer((socket) => {
  let requestBuffer = Buffer.alloc(0);
  socket.on("data", (chunk) => {
    requestBuffer = Buffer.concat([requestBuffer, chunk]);
    const req = parseHTTPRequest(requestBuffer);
    if (!req) return;

    const contentLength = parseInt(req.headers["content-length"] || "0");
    const totalExpectedLen = req.headerLen + contentLength;

    if (requestBuffer.length < totalExpectedLen) return;

    const body = requestBuffer
      .slice(req.headerLen, totalExpectedLen)
      .toString();
    console.log("method: ", req.method, "path: ", req.url, body);
    if (contentLength > 0) console.log("Received body: ", body);

    let responseBody = "";
    if (req.method === "POST" && req.url === "/submit") {
      responseBody = `
      <h1>Success</h1>
      <p>your data is ${body}</p>
    `;
    } else {
      responseBody = `
      <h1>Welcome</h1>
      <p>It was a GET request</p>
    `;
    }

    const response =
      `HTTP/1.1 200 OK\r\n` +
      `Content-Length: ${Buffer.byteLength(responseBody)}\r\n` +
      `Content-Type: text/html\r\n` +
      `Connection: close\r\n` +
      `\r\n` +
      responseBody;
    socket.write(response);
    socket.end();
  });
});

server.listen(1234, "127.0.0.1", () => {
  console.log("server POST request handling on port 1234");
});
