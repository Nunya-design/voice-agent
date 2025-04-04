import { NextApiRequest, NextApiResponse } from 'next';
import { twilioClient } from '../../utils/twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Missing "to" phone number' });
  }

  try {
    const call = await twilioClient.calls.create({
     url: `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/api/voice`,
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    console.log('Twilio call created:', call.sid);

    res.status(200).json({ callSid: call.sid });
  } catch (err: any) {
    console.error('Failed to place call:', err.message);
    res.status(500).json({ error: err.message });
  }
}
