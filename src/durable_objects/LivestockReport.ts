import { Env } from "../types";
import { DurableObjectState } from "@cloudflare/workers-types";

export class LivestockReport {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/websocket") {
      const { 0: client, 1: server } = new WebSocketPair();
      await this.handleSession(server);

      server.addEventListener("message", async (event) => {
        try {
          const data = JSON.parse(event.data as string);
          if (data.type === "user_location") {
            // Here you could aggregate user locations, for now just broadcast active users
            this.broadcast({ type: "active_users", count: this.sessions.size });
          }
        } catch (error) {
          console.error("Invalid WebSocket message:", error);
          // Optionally send an error message back to the client
          // server.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }

    if (url.pathname === "/broadcast") {
      const data = await request.json();
      this.broadcast(data);
      return new Response("OK");
    }

    if (url.pathname === "/stats") {
      return new Response(
        JSON.stringify({
          activeSessions: this.state.getWebSockets().length,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response("Not Found", { status: 404 });
  }

  async handleSession(server: WebSocket) {
    this.state.acceptWebSocket(server);
    this.broadcast({
      type: "active_users",
      count: this.state.getWebSockets().length,
    });
    server.send(
      JSON.stringify({
        type: "welcome",
        activeUsers: this.state.getWebSockets().length,
      })
    );
  }

  broadcast(data: any) {
    const message = JSON.stringify(data);
    for (const ws of this.state.getWebSockets()) {
      ws.send(message);
    }
  }
}
