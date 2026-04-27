import * as net from "node:net";

const server = net.createServer((socket) => {
  console.log(
    "new connection: ",
    socket.remoteAddress,
    " : ",
    socket.remotePort,
  );

  socket.on("data", (data) => {
    console.log("data: ", data.toString());
    socket.write(data);
  });
  socket.on("error", (error) => {
    console.log("socket error: ", error.message);
  });
});

server.listen(1234, "127.0.0.1", () => {
  console.log("server listening on port 1234");
});


