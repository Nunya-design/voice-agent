// pages/api/voice.ts

import { twiml } from 'twilio';

export default async function handler(req, res) {
  const VoiceResponse = twiml.VoiceResponse;
  const response = new VoiceResponse();

  const recordId = req.query.recordId;
  let name = 'there';

  try {
    if (recordId) {
      const airtableRes = await fetch(`https://api.airtable.com/v0/appDoCXmeY1CHBQak/Leads/${recordId}`, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      });

      const data = await airtableRes.json();
      name = data?.fields?.Name || 'there';
    }
  } catch (err) {
    console.error('⚠️ Failed to fetch name from Airtable:', err.message);
  }

  const connect = response.connect();
  connect.conversationRelay({
    url: `wss://relay-server-j0er.onrender.com?recordId=${recordId}`,
    welcomeGreeting: `Hi ${name}, this is Twilio’s AI calling. Mind if I ask a quick question?`,
    ttsProvider: 'ElevenLabs',
    voice: '21m00Tcm4TlvDq8ikWAM',
  });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
