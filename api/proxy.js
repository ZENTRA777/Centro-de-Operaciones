export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { endpoint } = req.query;
  const token = req.headers.authorization;

  try {
    const mlRes = await fetch(`https://api.mercadolibre.com${endpoint}`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    const data = await mlRes.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
