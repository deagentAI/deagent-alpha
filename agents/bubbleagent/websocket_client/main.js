const WebSocket = require('ws');

// 替换为你的WebSocket服务器地址
const wsUrl = 'ws://127.0.0.1:8765';

const ws = new WebSocket(wsUrl);

ws.on('open', function open() {
  console.log('Connected to the server');
  ws.send('Hello, server!');
});

ws.on('message', function incoming(data) {
  console.log('Received:', data.toString());
});

ws.on('close', function close() {
  console.log('Disconnected from the server');
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
