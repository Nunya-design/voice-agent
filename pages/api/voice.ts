import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const twiml = `
    <Response>
      <Say>Hi! You're now speaking with the Twilio AI agent.</Say>
      <Start>
        <Stream url="wss://relay-server-j0er.onrender.com" />
      </Start>
      <Pause length="60" />
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
