import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  response.connect().conversation({
    serviceSid: process.env.TWILIO_CONVERSATION_SERVICE_SID,
    mediaStreams: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/api/relay`,
        track: 'inbound_audio',
        statusCallback: '', // optional
      },
    ],
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
