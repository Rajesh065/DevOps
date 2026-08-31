type Listener = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<Listener>> = new Map();
  private reconnectInterval = 3000;
  private isConnecting = false;

  public connect(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // When in dev, connect directly to port 4000
    const wsUrl = `${protocol}//${window.location.hostname}:4000`;

    try {
      this.isConnecting = true;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[DevPulse WS] Connected to live event stream');
        this.isConnecting = false;
      };

      this.ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          const { type, payload } = parsed;
          if (type && this.listeners.has(type)) {
            this.listeners.get(type)?.forEach(cb => cb(payload));
          }
          if (this.listeners.has('*')) {
            this.listeners.get('*')?.forEach(cb => cb(parsed));
          }
        } catch (err) {
          console.error('[DevPulse WS] Parse error', err);
        }
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        setTimeout(() => this.connect(), this.reconnectInterval);
      };

      this.ws.onerror = () => {
        this.ws?.close();
      };
    } catch (e) {
      this.isConnecting = false;
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  public subscribe(eventType: string, callback: Listener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)?.add(callback);

    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }
}

export const wsClient = new WebSocketClient();
