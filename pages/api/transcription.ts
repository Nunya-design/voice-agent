import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const speechResult = req.body?.SpeechResult || 'No speech received';

  console.log('🗣️ Transcription:', speechResult);

  const twiml = `
    <Response>
      <Say>You said: ${speechResult}. Thanks for your input!</Say>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}
