if (req.method === 'GET') {
  const twiml = `
    <Response>
      <Say voice="Polly.Joanna">This is a hardcoded test. GPT will speak soon!</Say>
      <Hangup/>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(twiml.trim());
}

