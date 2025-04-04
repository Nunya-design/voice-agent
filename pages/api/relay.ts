import { Server } from 'ws';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let wss: Server;

export default function handler(req: any, res: any) {
  if (!res.socket.server.wss) {
    console.log('🔌 Initializing WebSocket server...');

    wss = new Server({ noServer: true });

    res.socket.server.on('upgrade', (req: any, socket: any, head: any) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    res.socket.server.wss = wss;

    wss.on('connection', (ws) => {
      console.log('📞 New media stream connection');

      ws.on('message', async (msg: any) => {
        const data = JSON.parse(msg.toString());

        if (data.event === 'media') {
          // placeholder: skip audio processing for now
          console.log('🎙️ Received audio packet (not processing yet)');
        }

        if (data.event === 'start') {
          console.log('🔊 Media stream started');
        }

        if (data.event === 'stop') {
          console.log('🛑 Media stream ended');
        }
      });
    });
  }

  res.end();
}
