import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const twiml = `
    <Response>
      <Connect>
        <ConversationRelay
          url="wss://relay-server-j0er.onrender.com"
          ttsProvider="ElevenLabs"
          voice="21m00Tcm4TlvDq8ikWAM"
          welcomeGreeting="Hi! You're now speaking with Twilio's AI agent." />
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}

