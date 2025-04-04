import { twiml } from 'twilio';

export default function handler(req, res) {
  const response = new twiml.VoiceResponse();
  const connect = response.connect();
  connect.conversationRelay({
    url: 'wss://relay-server-yourproject.onrender.com',
    welcomeGreeting: 'Hi! You're now speaking with Twilio\'s AI agent.',
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}

