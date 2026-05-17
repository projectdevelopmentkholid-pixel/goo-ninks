/* ============================================================
   GoO Ninks — api/tryon.js
   Vercel serverless proxy untuk Replicate API.
   Token disimpan di environment variable REPLICATE_TOKEN.
   ============================================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.REPLICATE_TOKEN;
  if (!token) {
    console.error('[api/tryon] REPLICATE_TOKEN is not set');
    return res.status(500).json({ error: 'Server configuration error: REPLICATE_TOKEN missing' });
  }

  const { action, input, predictionId } = req.body || {};

  try {
    /* ── CREATE prediction ── */
    if (action === 'create') {
      if (!input?.human_img || !input?.garm_img) {
        return res.status(400).json({ error: 'Missing required input fields: human_img, garm_img' });
      }

      console.log('[api/tryon] creating prediction — model: cuuupid/idm-vton');
      const upstream = await fetch(
        'https://api.replicate.com/v1/models/cuuupid/idm-vton/predictions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input }),
        }
      );

      const data = await upstream.json();
      console.log('[api/tryon] prediction created — full response:', JSON.stringify(data));
      return res.status(upstream.status).json(data);
    }

    /* ── POLL prediction ── */
    if (action === 'poll') {
      if (!predictionId) return res.status(400).json({ error: 'Missing predictionId' });

      const upstream = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await upstream.json();
      console.log('[api/tryon] poll', predictionId, '— status:', data.status, '— output:', JSON.stringify(data.output));
      return res.status(upstream.status).json(data);
    }

    return res.status(400).json({ error: 'Invalid action. Use "create" or "poll"' });

  } catch (err) {
    console.error('[api/tryon] unexpected error:', err);
    return res.status(500).json({ error: err.message });
  }
};
