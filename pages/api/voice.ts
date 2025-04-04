import { twiml } from 'twilio';

export default function handler(req, res) {
  const response = new twiml.VoiceResponse();
  const connect = response.connect();
  connect.conversationRelay({
    url: 'wss://relay-server-yourproject.onrender.com',
    welcomeGreeting: 'Hi! You are now speaking with Walters AI Sales Agent, feel free to ask anything about Twilio.',
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}

