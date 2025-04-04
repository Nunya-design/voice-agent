import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const makeCall = async () => {
    setStatus('Calling...');
    const res = await fetch('/api/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phone }),
    });
    const data = await res.json();
    setStatus(`Call SID: ${data.callSid}`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>SDR Outbound Call</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />
      <button onClick={makeCall} style={{ padding: 8 }}>
        Call
      </button>
      <p>{status}</p>
    </div>
  );
}
