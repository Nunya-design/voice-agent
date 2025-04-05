// pages/api/log-call.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const {
    recordId,
    callSid,
    from,
    timestamp,
    transcript,
    notes,
    handoffReason,
  } = req.body;

  try {
    // 🔧 Replace this with your Airtable logging logic or database call
    console.log('📞 Logging call data:', {
      recordId,
      callSid,
      from,
      timestamp,
      transcript,
      notes,
      handoffReason,
    });

    // Simulate successful logging
    return res.status(200).json({ message: 'Call logged successfully' });
  } catch (error: any) {
    console.error('❌ Failed to log call:', error);
    return res.status(500).json({ error: 'Failed to log call data' });
  }
}
