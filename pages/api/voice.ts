import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const twiml = `
    <Response>
      <Connect>
        <ConversationRelay
          url="wss://relay-server-j0er.onrender.com"
          ttsProvider="ElevenLabs"
          voice="UgBBYS2sOqTuMpoF3BR0"
          welcomeGreeting="Hi! You're now speaking with Walters, are you interested in learning more about Twilio?." />
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}

