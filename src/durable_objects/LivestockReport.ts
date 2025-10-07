import { Env } from '../types';
import { DurableObjectState } from "@cloudflare/workers-types";

export class LivestockReport implements DurableObject {
  state: DurableObjectState;
  sessions: Set<WebSocket>;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.sessions = new Set();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      this.sessions.add(server);

      server.addEventListener('close', () => {
        this.sessions.delete(server);
        this.broadcast({ type: 'active_users', count: this.sessions.size });
      });
      
      server.addEventListener('error', () => {
        this.sessions.delete(server);
        this.broadcast({ type: 'active_users', count: this.sessions.size });
      });

      server.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data as string);
        if (data.type === 'user_location') {
          // Here you could aggregate user locations, for now just broadcast active users
          this.broadcast({ type: 'active_users', count: this.sessions.size });
        }
      });

      server.send(JSON.stringify({
        type: 'welcome',
        activeUsers: this.sessions.size
      }));

      return new Response(null, {
        status: 101,
        webSocket: client
      });
    }

    if (url.pathname === '/broadcast') {
      const data = await request.json();
      this.broadcast(data);
      return new Response('OK');
    }

    if (url.pathname === '/stats') {
      return new Response(JSON.stringify({
        activeSessions: this.sessions.size
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }

  broadcast(data: any) {
    const message = JSON.stringify(data);
    this.sessions.forEach(session => {
      try {
        session.send(message);
      } catch (error) {
        console.error('WebSocket send error:', error);
        this.sessions.delete(session);
      }
    });
  }
}