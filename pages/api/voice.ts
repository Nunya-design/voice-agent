import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  response.connect().conversation({
    serviceSid: process.env.TWILIO_CONVERSATION_SERVICE_SID!,
    mediaStreams: [
      {
        url: 'wss://relay-server-j0er.onrender.com',
        track: 'inbound_audio',
      },
    ],
  } as any); // 👈 type override to avoid build error

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
