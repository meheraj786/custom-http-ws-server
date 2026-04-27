import * as net from "node:net";

function parseRequest(data) {
  const text = data.toString("latin1");
  const lines = text.split("\r\n");
  const [method, path, version] = lines[0].split(" ");
  return { method, path, version };
}

const server = net.createServer((socket) => {
  let requestBuffer = Buffer.alloc(0);

  socket.on("data", (chunk) => {
    requestBuffer = Buffer.concat([requestBuffer, chunk]);

    if (requestBuffer.indexOf("\r\n\r\n") !== -1) {
      const request = parseRequest(requestBuffer);
      console.log("request is processing: ", request.method, request.path);

      let responseBody = "";
      if (request.path === "/") {
        responseBody = `
          <h1>Home Page</h1>
          <p>your server is Working</p>
      `;
      } else if (request.path === "/about") {
        responseBody = `
          <h1>About Page</h1>
          <p>your server is Working</p>
      `;
      } else {
        responseBody = `
          <h1>404 Page Not Found</h1>
          <p>your server is Working</p>
      `;
      }
      const response =
        `HTTP/1.1 200 OK\r\n` +
        `Content-Type: text/html; charset=utf-8\r\n` +
        `Content-Length: ${Buffer.byteLength(responseBody)}\r\n` +
        `Connection: close\r\n` +
        `\r\n` +
        responseBody;
      socket.write(response);
      socket.end();
    }
  });

  socket.on("error", (error) => {
    console.log("socket error: ", error.message);
  });
});

server.listen(1234, "127.0.0.1", () => {
  console.log("server listening on port 1234");
});
