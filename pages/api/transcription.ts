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
        { role: 'system', content: 'You are a friendly SDR assistant helping a potential customer learn more about a product. Keep your answers short and helpful.' },
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
