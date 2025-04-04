import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const speechResult = req.body?.SpeechResult || 'No speech received';
  console.log('🗣️ Transcription:', speechResult);

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', 
                 content: `You are an expert SDR working for Twilio. Your job is to talk to potential customers, understand their needs, and explain Twilio’s capabilities clearly and simply. You are polite, helpful, and confident. Your main goal is to schedule a meeting with an Account Executive so the caller can learn more. If the caller seems interested, offer to schedule a time to talk further with one of our Twilio product specialists. Keep your answers short, friendly, and natural — like a real human.` }
,
        { role: 'user', content: speechResult },
      ],
    });

    const aiReply = chatResponse.choices[0]?.message?.content || 'Sorry, I didn’t catch that.';

    const twiml = `
      <Response>
        <Say>${aiReply}</Say>
      </Response>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twiml);
  } catch (error: any) {
    console.error('🛑 OpenAI error:', error.message);
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(`
      <Response>
        <Say>Sorry, I had trouble processing that. Please try again later.</Say>
      </Response>
    `);
  }
}
