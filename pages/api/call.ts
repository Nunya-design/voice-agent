import { NextApiRequest, NextApiResponse } from 'next';
import { twilioClient } from '../../utils/twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to } = req.body;

  try {
    const call = await twilioClient.calls.create({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/voice`,
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });
    res.status(200).json({ callSid: call.sid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place call' });
  }
}