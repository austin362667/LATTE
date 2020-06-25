import { WebSocket, acceptWebSocket, isWebSocketCloseEvent, acceptable } from 'https://deno.land/std/ws/mod.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { send } from 'https://deno.land/x/oak/mod.ts';
  
  const users = new Map<string, WebSocket>()
  
  function broadcast(message: string, senderId?: string): void {
    if (!message) return
    for (const user of users.values()) {
      user.send(senderId ? `[${senderId}]: ${message}` : message)
    }
  }
  
  const socketEventHandlers = async (ws: WebSocket): Promise<void> => {
    // Register user connection
    const userId = v4.generate()
  
    users.set(userId, ws)
    broadcast(`> User with the id ${userId} is connected`)
  
    // Wait for new messages
    for await (const event of ws) {
      const message = typeof event === 'string' ? event : ''
  
      broadcast(message, userId)
  
      // Unregister user conection
      if (!message && isWebSocketCloseEvent(event)) {
        users.delete(userId)
        broadcast(`> User with the id ${userId} is disconnected`)
      }
    }
  }


  export async function handleSocket(ctx:any) {
      // WebSockets Chat
      await ctx.upgrade();
      if (acceptable(ctx.request.serverRequest)) {
        const { conn, r: bufReader, w: bufWriter, headers } = ctx.request.serverRequest;
        const socket = await acceptWebSocket({
          conn,
          bufReader,
          bufWriter,
          headers,
        });
        
        await socketEventHandlers(socket);
    } else {
      throw new Error('Error when connecting websocket');
    }
  }

  export async function chatView(context:any){
        await context.upgrade();
        // context.response.headers.set("content-type", "text/html");
        // context.response.body = await Deno.open("./public/chat.html");
        await send(context, "./public/chat.html") 
  }