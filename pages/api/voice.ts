const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default function handler(req, res) {
  const twiml = new VoiceResponse();
  const connect = twiml.connect({
    action: 'https://your-vercel-app.vercel.app/api/meeting',
  });

  connect.conversationRelay({
    url: 'wss://relay-server-xyz.onrender.com',
    welcomeGreeting: "Hi! You're now speaking with Twilio's AI assistant.",
    ttsProvider: 'ElevenLabs',
    voice: '21m00Tcm4TlvDq8ikWAM',
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}
