export default async function handler(req, res) {
  const recordId = req.query.recordId;
  let name = 'there';

  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/YOUR_BASE_ID/Leads/${recordId}`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    const data = await airtableRes.json();
    name = data?.fields?.Name || 'there';
  } catch (err) {
    console.error('⚠️ Failed to fetch name from Airtable:', err.message);
  }

  const twiml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Connect>
        <ConversationRelay
          url="wss://relay-server-j0er.onrender.com?recordId=${recordId}"
          welcomeGreeting="Hi ${name}, this is Twilio’s AI calling. Mind if I ask a quick question?"
          ttsProvider="ElevenLabs"
          voice="21m00Tcm4TlvDq8ikWAM"
        />
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
