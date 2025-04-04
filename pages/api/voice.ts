import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const voiceResponse = new twilio.twiml.VoiceResponse();

  const gather = voiceResponse.gather({
    input: ['speech'], // ← fix is right here
    action: '/api/transcription',
    method: 'POST',
    speechTimeout: 'auto',
  });

  gather.say('Hi there! This is your SDR assistant. Tell me what you’re looking for today.');

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(voiceResponse.toString());
}
