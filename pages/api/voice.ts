export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const voiceResponse = new twilio.twiml.VoiceResponse();

  voiceResponse.connect().conversation({
    serviceSid: process.env.TWILIO_CONVERSATION_SERVICE_SID, // we’ll create this
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(voiceResponse.toString());
}
