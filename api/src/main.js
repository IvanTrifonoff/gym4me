import http from 'node:http';

const port = Number(process.env.PORT || 3100);

const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(JSON.stringify({ ok: true, service: 'opengym-next', status: 'skeleton' }));
});

server.listen(port, () => console.log(`opengym-next api on :${port}`));
