import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello! This is your SDR voice application speaking. Have a great day!');

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}