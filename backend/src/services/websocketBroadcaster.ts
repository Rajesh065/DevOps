import { WebSocketServer, WebSocket } from 'ws';
import { generateMockMetrics } from '../mockData/observabilityData.js';

export class WebSocketBroadcaster {
  private static instance: WebSocketBroadcaster;
  private wss: WebSocketServer | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  public static getInstance(): WebSocketBroadcaster {
    if (!WebSocketBroadcaster.instance) {
      WebSocketBroadcaster.instance = new WebSocketBroadcaster();
    }
    return WebSocketBroadcaster.instance;
  }

  public init(server: any): void {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('[WebSocket] Client connected to DevPulse live stream');

      // Send immediate initial batch
      const initialMetrics = generateMockMetrics(1)[0];
      ws.send(JSON.stringify({ type: 'TELEMETRY_METRICS', payload: initialMetrics }));

      ws.on('message', (message: string) => {
        try {
          const parsed = JSON.parse(message.toString());
          if (parsed.type === 'PING') {
            ws.send(JSON.stringify({ type: 'PONG', timestamp: new Date().toISOString() }));
          }
        } catch (e) {
          // ignore malformed
        }
      });

      ws.on('close', () => {
        console.log('[WebSocket] Client disconnected');
      });
    });

    // Broadcast live telemetry every 3 seconds
    this.intervalId = setInterval(() => {
      if (this.wss && this.wss.clients.size > 0) {
        const metric = generateMockMetrics(1)[0];
        this.broadcast('TELEMETRY_METRICS', metric);
      }
    }, 3000);
  }

  public broadcast(type: string, payload: any): void {
    if (!this.wss) return;
    const msg = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.wss) {
      this.wss.close();
    }
  }
}
