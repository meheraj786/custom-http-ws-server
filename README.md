# Custom HTTP and WebSocket Server from Scratch

A low-level implementation of a web server built directly on top of TCP sockets using Node.js. This project focuses on understanding the internal mechanics of the web, inspired by the technical concepts outlined by James Smith.

Instead of relying on high-level frameworks like Express.js, this server handles raw byte streams, parses HTTP protocols manually, and implements the WebSocket handshake and framing logic from scratch.

---

## Technical Concepts Implemented

- **TCP Networking:** Understanding how a server listens for connections and manages raw data chunks.
- **HTTP Anatomy:** Manually parsing Request Methods, URLs, and Headers from a byte stream.
- **Buffer Management:** Using Node.js Buffer to accumulate data until a full HTTP request is detected via double CRLF.
- **Static File Serving:** Reading and serving files from disk with manual MIME type mapping.
- **Chunked Transfer Encoding:** Implementing data streaming for large files to maintain low memory overhead.
- **POST Body Parsing:** Utilizing Content-Length headers to accurately extract incoming request bodies.
- **WebSocket Upgrade:** Implementing the HTTP-to-WebSocket handshake using Sec-WebSocket-Key and SHA-1 hashing.
- **Data Framing:** Encoding text data into binary WebSocket frames according to RFC 6455.

---

## Features

- **Zero Dependencies:** Built using only native Node.js modules (`net`, `fs`, `crypto`, `path`)
- **Dynamic Routing:** Path-based routing for different endpoints and static assets
- **Streaming Support:** Efficient large file serving via chunked encoding
- **Real-time Communication:** Functional WebSocket handshake and framing support

---

## Tech Stack

- **Runtime:** Node.js
- **Protocols:** TCP, HTTP/1.1, WebSocket
- **I/O:** Node.js Streams and Buffers

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/meheraj786/custom-http-ws-server.git
cd custom-http-ws-server
```

### 2. Run the Server

```bash
pnpm start

# or

node server.js
```

### 3. Testing

#### HTTP Request

Open in your browser:

```
http://127.0.0.1:1234
```

#### POST Request

Use curl:

```bash
curl -X POST -d "data=test_message" http://127.0.0.1:1234/submit
```

#### WebSocket Connection

Run in browser console:

```javascript
const ws = new WebSocket('ws://127.0.0.1:1234');

ws.onopen = () => console.log('Connected to server');

ws.onmessage = (e) => console.log('Message from server:', e.data);
```

---

## Project Structure

```
custom-http-ws-server/
│
├── public/       # Static assets like index.html and images
├── server.js     # Core server logic
└── package.json  # Project metadata and start scripts
```

---

## License

This project is open-source and available under the MIT License.