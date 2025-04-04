import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const twiml = `
    <Response>
      <Connect>
        <Conversation serviceSid="${process.env.TWILIO_CONVERSATION_SERVICE_SID}">
          <MediaStream url="wss://relay-server-j0er.onrender.com" track="inbound_audio" />
        </Conversation>
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
