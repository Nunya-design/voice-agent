import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

const twiml = `
  <Response>
    <Say voice="Polly.Joanna">Hi! You're now speaking with the Twilio AI SDR.</Say>
    <Start>
      <Stream url="wss://relay-server-j0er.onrender.com" />
    </Start>
    <Pause length="5"/>
    <Redirect>https://voice-agent-inky.vercel.app/api/respond</Redirect>
  </Response>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
