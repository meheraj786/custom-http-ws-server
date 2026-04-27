<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Custom HTTP and WebSocket Server from Scratch</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.7;
      max-width: 1000px;
      margin: auto;
      padding: 40px 20px;
      background: #f8fafc;
      color: #1e293b;
    }

    h1, h2, h3, h4 {
      color: #0f172a;
    }

    h1 {
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }

    section {
      margin-bottom: 40px;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
    }

    code {
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
    }

    a {
      color: #2563eb;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .container {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }

    hr {
      margin: 30px 0;
      border: none;
      border-top: 1px solid #cbd5e1;
    }

  </style>
</head>
<body>
  <div class="container">
    <h1>Custom HTTP and WebSocket Server from Scratch</h1>

    <p>
      A low-level implementation of a web server built directly on top of TCP sockets using Node.js.
      This project focuses on understanding the internal mechanics of the web, inspired by the technical concepts outlined by James Smith.
    </p>

    <p>
      Instead of relying on high-level frameworks like Express.js, this server handles raw byte streams,
      parses HTTP protocols manually, and implements the WebSocket handshake and framing logic from scratch.
    </p>

    <hr />

    <section>
      <h2>Technical Concepts Implemented</h2>
      <ul>
        <li><strong>TCP Networking:</strong> Understanding how a server listens for connections and manages raw data chunks.</li>
        <li><strong>HTTP Anatomy:</strong> Manually parsing Request Methods, URLs, and Headers from a byte stream.</li>
        <li><strong>Buffer Management:</strong> Using Node.js Buffer to accumulate data until a full HTTP request is detected via double CRLF.</li>
        <li><strong>Static File Serving:</strong> Reading and serving files from disk with manual MIME type mapping.</li>
        <li><strong>Chunked Transfer Encoding:</strong> Implementing data streaming for large files to maintain low memory overhead.</li>
        <li><strong>POST Body Parsing:</strong> Utilizing Content-Length headers to accurately extract incoming request bodies.</li>
        <li><strong>WebSocket Upgrade:</strong> Implementing the HTTP-to-WebSocket handshake using Sec-WebSocket-Key and SHA-1 hashing.</li>
        <li><strong>Data Framing:</strong> Encoding text data into binary WebSocket frames according to RFC 6455.</li>
      </ul>
    </section>

    <hr />

    <section>
      <h2>Features</h2>
      <ul>
        <li><strong>Zero Dependencies:</strong> Built using only native Node.js modules (<code>net</code>, <code>fs</code>, <code>crypto</code>, <code>path</code>)</li>
        <li><strong>Dynamic Routing:</strong> Path-based routing for different endpoints and static assets</li>
        <li><strong>Streaming Support:</strong> Efficient large file serving via chunked encoding</li>
        <li><strong>Real-time Communication:</strong> Functional WebSocket handshake and framing support</li>
      </ul>
    </section>

    <hr />

    <section>
      <h2>Tech Stack</h2>
      <ul>
        <li><strong>Runtime:</strong> Node.js</li>
        <li><strong>Protocols:</strong> TCP, HTTP/1.1, WebSocket</li>
        <li><strong>I/O:</strong> Node.js Streams and Buffers</li>
      </ul>
    </section>

    <hr />

    <section>
      <h2>Getting Started</h2>

      <h3>1. Clone the Repository</h3>
      <pre><code>git clone https://github.com/your-username/custom-http-ws-server.git

cd custom-http-ws-server</code></pre>

      <h3>2. Run the Server</h3>
      <pre><code>pnpm start

# or

node server.js</code></pre>

      <h3>3. Testing</h3>

      <h4>HTTP Request</h4>
      <p>Open in your browser:</p>
      <pre><code>http://127.0.0.1:1234</code></pre>

      <h4>POST Request</h4>
      <p>Use curl:</p>
      <pre><code>curl -X POST -d "data=test_message" http://127.0.0.1:1234/submit</code></pre>

      <h4>WebSocket Connection</h4>
      <p>Run in browser console:</p>
      <pre><code>const ws = new WebSocket('ws://127.0.0.1:1234');

ws.onopen = () => console.log('Connected to server');

ws.onmessage = (e) => console.log('Message from server:', e.data);</code></pre>
</section>

    <hr />

    <section>
      <h2>Project Structure</h2>
      <pre><code>custom-http-ws-server/

│
├── public/ # Static assets like index.html and images
├── server.js # Core server logic
└── package.json # Project metadata and start scripts</code></pre>
</section>

    <hr />

    <section>
      <h2>License</h2>
      <p>
        This project is open-source and available under the MIT License.
      </p>
    </section>

  </div>
</body>
</html>
