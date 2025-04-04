import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const twiml = `
    <Response>
      <Connect action="https://voice-agent-inky.vercel.app/api/connect_action">
        <ConversationRelay url="wss://relay-server-j0er.onrender.com">
          <WelcomeGreeting>Hi! Ask me anything about Twilio.</WelcomeGreeting>
        </ConversationRelay>
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
