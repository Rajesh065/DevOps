import { WebSocketServer, WebSocket } from 'ws';

export class WebSocketBroadcaster {
  private wss: WebSocketServer | null = null;

  public initialize(wss: WebSocketServer) {
    this.wss = wss;
  }

  public broadcast(type: string, payload: any) {
    if (!this.wss) return;
    const msg = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }
}

export const wsBroadcaster = new WebSocketBroadcaster();
