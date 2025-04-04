import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const twiml = `
    <Response>
      <Connect>
        <ConversationRelay 
          url="wss://relay-server-j0er.onrender.com"
          ttsProvider="ElevenLabs"
          voice="Rachel"
          welcomeGreeting="Hi there! I'm Twilio's AI agent. How can I help today?" />
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}

