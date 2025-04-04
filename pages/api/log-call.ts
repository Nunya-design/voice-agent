// pages/api/log-call.ts

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const {
    callSid,
    from,
    name,
    timestamp,
    transcript,
    notes,
    handoffReason,
  } = req.body;

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/YOUR_BASE_ID/Leads`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name || '',
                'Phone Number': from || '',
                CallSid: callSid,
                Timestamp: timestamp,
                Transcript: transcript || '',
                'Agent Notes': notes || '',
                Status: 'New',
                'Handoff Reason': handoffReason || '',
              },
            },
          ],
        }),
      }
    );

    const data = await airtableRes.json();

    if (airtableRes.ok) {
      res.status(200).json({ success: true, data });
    } else {
      res.status(500).json({ error: 'Airtable error', data });
    }
  } catch (err) {
    console.error('❌ Airtable log error:', err);
    res.status(500).json({ error: err.message });
  }
}
