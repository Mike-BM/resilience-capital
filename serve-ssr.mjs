import http from 'http';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import {Readable} from 'stream';

const PUBLIC = path.resolve(process.cwd(), '.output', 'public');
const SERVER_MODULE = path.resolve(process.cwd(), '.output', 'server', 'index.mjs');

if (!fs.existsSync(SERVER_MODULE)) {
  console.error('Server module not found at', SERVER_MODULE);
  process.exit(1);
}

import { pathToFileURL } from 'url';
import(pathToFileURL(SERVER_MODULE).href).then((mod) => {
  const serverModule = mod.default;

  function contentType(file) {
    if (file.endsWith('.html')) return 'text/html; charset=utf-8';
    if (file.endsWith('.js')) return 'application/javascript; charset=utf-8';
    if (file.endsWith('.css')) return 'text/css; charset=utf-8';
    if (file.endsWith('.json')) return 'application/json; charset=utf-8';
    if (file.endsWith('.pdf')) return 'application/pdf';
    if (file.endsWith('.svg')) return 'image/svg+xml';
    if (file.endsWith('.png')) return 'image/png';
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg';
    return 'application/octet-stream';
  }

  const server = http.createServer(async (req, res) => {
    try {
      const host = req.headers.host || 'localhost';
      const url = new URL(req.url, `http://${host}`);
      const pathname = decodeURIComponent(url.pathname);

      // serve public assets directly
      let filePath = path.join(PUBLIC, pathname);
      if (pathname === '/') filePath = path.join(PUBLIC, 'index.html');

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': contentType(filePath) });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('error', (err) => {
          console.error(err);
          res.writeHead(500);
          res.end('File read error');
        });
        return;
      }

      // forward to SSR handler
      // convert Node request to Web Request
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) {
        if (v === undefined) continue;
        headers.set(k, Array.isArray(v) ? v.join(',') : String(v));
      }
      const body = (req.method === 'GET' || req.method === 'HEAD') ? undefined : Readable.toWeb(req);
      const webReq = new Request(url.toString(), {
        method: req.method,
        headers,
        body
      });

      const env = { };
      const ctx = { context: { waitUntil: (_p) => {}, bind: (_p) => {} } };
      // ensure headers map has get method for compatibility
      if (!webReq.headers.get) {
        webReq.headers.get = (k) => webReq.headers[k.toLowerCase()];
      }
      const resp = await serverModule.fetch(webReq, env, ctx);

      // write status and headers
      const outHeaders = {};
      for (const [k, v] of resp.headers) outHeaders[k] = v;
      res.writeHead(resp.status || 200, outHeaders);

      if (!resp.body) {
        res.end();
        return;
      }

      // resp.body is a ReadableStream
      try {
        const nodeStream = Readable.fromWeb ? Readable.fromWeb(resp.body) : null;
        if (nodeStream) {
          nodeStream.pipe(res);
          nodeStream.on('error', (err) => {
            console.error('stream error', err);
            if (!res.writableEnded) res.end();
          });
        } else {
          const text = await resp.text();
          res.end(text);
        }
      } catch (err) {
        // fallback
        const txt = await resp.text();
        res.end(txt);
      }
    } catch (err) {
      console.error(err);
      try { res.writeHead(500); res.end('Server error'); } catch {};
    }
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 4173;
  server.listen(port, () => {
    console.log(`SSR server listening at http://localhost:${port}/`);
  });

}).catch((err) => {
  console.error('Failed to import server module', err);
  process.exit(1);
});
