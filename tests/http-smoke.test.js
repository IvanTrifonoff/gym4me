import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createServer } from '../api/src/main.js';
const server = createServer();
const port = await new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
function request(path, options = {}) { return new Promise((resolve, reject) => { const req = http.request({ method: options.method || 'GET', port, host: '127.0.0.1', path, headers: options.headers || {} }, res => { let body = ''; res.on('data', chunk => body += chunk); res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) })); }); req.on('error', reject); if (options.body) req.write(options.body); req.end(); }); }
test('HTTP health is public and athlete endpoints require auth', async () => { const health = await request('/api/health'); assert.equal(health.status, 200); const state = await request('/api/v1/athlete/state'); assert.equal(state.status, 401); });
test.after(() => server.close());
