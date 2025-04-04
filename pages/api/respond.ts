import { NextApiRequest, NextApiResponse } from 'next';

let lastResponse = 'Sorry, no response yet.';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      if (message) {
        lastResponse = message;
        console.log('✅ Stored response:', lastResponse);
      }
      return res.status(200).end(); // No content needed for POST
    } catch (err) {
      console.error('❌ Error storing message:', err.message);
      return res.status(500).send('Failed to store message.');
    }
  }

  if (req.method === 'GET') {
    const twiml = `
      <Response>
        <Say voice="Polly.Joanna">${lastResponse}</Say>
        <Hangup/>
      </Response>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twiml.trim());
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
