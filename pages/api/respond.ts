let lastResponse = 'Sorry, something went wrong.';

export default function handler(req, res) {
  if (req.method === 'POST') {
    lastResponse = req.body.message || lastResponse;
    return res.status(200).end();
  }

  const twiml = `
    <Response>
      <Say>${lastResponse}</Say>
      <Hangup/>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.trim());
}
