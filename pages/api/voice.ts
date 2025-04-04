import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

 const twiml = `
  <Response>
    <Connect>
      <Conversation>
        <ConversationRelay url="wss://relay-server-j0er.onrender.com" />
      </Conversation>
    </Connect>
  </Response>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
