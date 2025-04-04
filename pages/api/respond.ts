export {};

import { NextApiRequest, NextApiResponse } from 'next';

let lastResponse = 'Thanks for calling!';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      if (message) {
        lastResponse = message;
        console.log('✅ Stored GPT response:', lastResponse);
      }
      return res.status(200).end();
    } catch (err) {
      console.error('❌ Error saving message:', err);
      return res.status(500).send('Error saving message');
    }
  }

  if (req.method === 'GET') {
    const twiml = `
      <Response>
        <Say voice="Polly.Joanna">This is a hardcoded test. GPT will speak soon!</Say>
        <Hangup/>
      </Response>
    `;

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml.trim());
  }

  res.status(405).send('Method Not Allowed');
}

