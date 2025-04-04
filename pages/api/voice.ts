import { NextApiRequest, NextApiResponse } from 'next';
import { twiml } from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const response = new twiml.VoiceResponse();

  const connect = response.connect({
    action: 'https://voice-agent-inky.vercel.app/api/connect_action', // Optional callback
  });

  connect.conversationRelay({
    url: 'wss://relay-server-j0er.onrender.com',
    welcomeGreeting: 'Hi! Ask me anything about Twilio.',
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
