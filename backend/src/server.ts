import http from 'http';
import { createApp } from './app.js';
import { WebSocketBroadcaster } from './services/websocketBroadcaster.js';

const PORT = process.env.PORT || 4000;
const app = createApp();
const server = http.createServer(app);

// Initialize WebSocket Broadcaster on the same HTTP server
WebSocketBroadcaster.getInstance().init(server);

server.listen(PORT, () => {
  console.log(`=====================================================`);
  console.log(`  DevPulse Core Gateway & Microservices Engine`);
  console.log(`  HTTP API:     http://localhost:${PORT}/api`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  WebSocket:    ws://localhost:${PORT}`);
  console.log(`=====================================================`);
});
