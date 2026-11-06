import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const customerProxy=Object.fromEntries(['website-updates','website-chat','pin-login','session','services','service-request','resolve-service','ai-consent','applications','logout','chat-catalogue','chat-request'].map(path=>[`/api/customer/${path}`,'http://127.0.0.1:3000']));
export default defineConfig({ server: { proxy: customerProxy }, preview: { proxy: customerProxy }, plugins: [react(), {
  name: 'king-prerendered-preview',
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url || '/', 'http://localhost');
      if (url.pathname.startsWith('/api/')) return next();
      if (url.pathname === '/' || !/^\/[a-z0-9/-]+\/?$/.test(url.pathname)) return next();
      const route = url.pathname.replace(/\/$/, '');
      if (existsSync(resolve('dist', `.${route}/index.html`))) {
        req.url = `${route}/index.html${url.search}`;
        return next();
      }
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(readFileSync(resolve('dist/404.html')));
    });
  }
}], build: { sourcemap: false } });
