import http from 'http';
import { WebSocketServer } from 'ws';
import { app } from './app';
import { wsBroadcaster } from './services/websocketBroadcaster';

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wsBroadcaster.initialize(wss);

server.listen(PORT, () => {
  console.log(`⚡ [DevPulse Core API] Listening on http://localhost:${PORT}`);
});
