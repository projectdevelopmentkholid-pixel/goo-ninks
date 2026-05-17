/* ============================================================
   GoO Ninks — replicate.js
   Replicate API helpers + shared PRODUCTS data
   ============================================================ */

/* Token hidup di server — lihat api/tryon.js & Vercel env vars */

const PRODUCTS = [
  { id:1,  name:'Outer Batik Merah Hitam',    price:'Rp 850.000',  img:'assets/images/product-1.webp',  gradient:'linear-gradient(135deg,#1a0a0a,#4a0f0f,#8B1a1a)',  desc:'Perpaduan batik klasik dengan aksen lurik merah-hitam yang bold dan berani', origin:'Jawa',      category:'Outer'  },
  { id:2,  name:'Outer Batik Hijau Tosca',    price:'Rp 820.000',  img:'assets/images/product-2.webp',  gradient:'linear-gradient(135deg,#0a1a15,#0f4a35,#1a8B6a)',  desc:'Motif batik floral tosca segar dengan potongan modern kimono',               origin:'Jawa',      category:'Outer'  },
  { id:3,  name:'Outer Tenun Kombinasi',      price:'Rp 950.000',  img:'assets/images/product-3.webp',  gradient:'linear-gradient(135deg,#1a1500,#4a3a00,#C9A84C)',  desc:'Tenun ikat geometrik mustard-navy dengan sentuhan kontemporer',              origin:'NTT',       category:'Outer'  },
  { id:4,  name:'Set Batik Merah Marun',      price:'Rp 1.250.000',img:'assets/images/product-4.webp',  gradient:'linear-gradient(135deg,#1a0510,#5a1020,#8B1535)',  desc:'Set atasan-bawahan batik patchwork eksklusif warna marun elegan',            origin:'Jawa',      category:'Set'    },
  { id:5,  name:'Dress Kinanti Exclusive',    price:'Rp 365.000',  img:'assets/images/product-5.webp',  gradient:'linear-gradient(135deg,#0a150a,#1a4a2a,#2d8B50)',  desc:'Dress tenun ikat geometrik longgar, nyaman untuk segala acara',              origin:'NTT',       category:'Dress'  },
  { id:6,  name:'Overall Lurik Tenun',        price:'Rp 750.000',  img:'assets/images/product-6.jfif', gradient:'linear-gradient(135deg,#0f0f1a,#2a1a4a,#5a3d8B)',  desc:'Overall lurik kombinasi tenun, tersedia 4 pilihan warna seri',              origin:'Yogyakarta',category:'Overall'},
  { id:7,  name:'Vest Tenun Hoodie',          price:'Rp 680.000',  img:'assets/images/product-7.webp',  gradient:'linear-gradient(135deg,#0a0f15,#1a2d4a,#2d508B)',  desc:'Vest panjang tenun ikat dengan hoodie, tampil beda dan berkarakter',        origin:'NTT',       category:'Outer'  },
  { id:8,  name:'Outer Batik Hoodie Hijau',   price:'Rp 890.000',  img:'assets/images/product-8.webp',  gradient:'linear-gradient(135deg,#051a05,#0f4a15,#1a8B25)',  desc:'Outer batik floral hijau dengan zipper dan hoodie, casual luxury',          origin:'Jawa',      category:'Outer'  },
  { id:9,  name:'Outer Batik Hoodie Coklat',  price:'Rp 870.000',  img:'assets/images/product-9.webp',  gradient:'linear-gradient(135deg,#1a0f0a,#4a2a1a,#8B5535)',  desc:'Outer batik floral coklat rosé, elegan dan hangat',                         origin:'Jawa',      category:'Outer'  },
  { id:10, name:'Outer Tenun Abu-abu',        price:'Rp 1.100.000',img:'assets/images/product-10.webp', gradient:'linear-gradient(135deg,#0f0f0f,#2a2a2a,#555555)',  desc:'Outer panjang tenun ikat abu-abu dengan detail fringe eksklusif',           origin:'NTT',       category:'Outer'  },
  { id:11, name:'Set Tenun Pink Navy',        price:'Rp 1.450.000',img:'assets/images/product-11.webp', gradient:'linear-gradient(135deg,#0a0520,#2a0a4a,#6B1a8B)',  desc:'Set lengkap tenun ikat pink-navy dengan aksesoris bucket hat matching',     origin:'NTT',       category:'Set'    },
  { id:12, name:'Set Tenun Orange Mustard',   price:'Rp 1.350.000',img:'assets/images/product-12.webp', gradient:'linear-gradient(135deg,#1a0f00,#4a2a00,#C9A84C)',  desc:'Set dress panjang tenun orange-mustard dengan hoodie matching',             origin:'NTT',       category:'Set'    },
  { id:13, name:'Outfit Couple Adiprana',     price:'Rp 1.800.000',img:'assets/images/product-13.jfif',gradient:'linear-gradient(135deg,#0f0f0f,#2a2a35,#4a4a6B)',  desc:'Outfit couple tenun ikat putih-abu eksklusif, cocok untuk acara formal',   origin:'NTT',       category:'Couple' },
];

async function imageFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function imageUrlToBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function pollPrediction(predictionId) {
  const MAX_POLLS = 40; // ~100 detik (40 × 2.5s)
  let attempt = 0;

  for (;;) {
    await new Promise(r => setTimeout(r, 2500));
    attempt++;

    const res = await fetch('/api/tryon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'poll', predictionId })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Poll HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log(`[GoO Ninks] poll #${attempt} — status: ${data.status} — output:`, data.output);

    if (data.status === 'succeeded') {
      const url = Array.isArray(data.output) ? data.output[0] : data.output;
      if (!url) throw new Error('Model selesai tapi tidak menghasilkan gambar (output kosong)');
      return data;
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      console.error('[GoO Ninks] prediction failed:', data.error);
      throw new Error(data.error || 'Prediction gagal');
    }

    if (attempt >= MAX_POLLS) {
      throw new Error('Timeout: model terlalu lama memproses (>100 detik)');
    }
  }
}

async function runTryOn(humanImgBase64, garmImgBase64, garmentDesc) {
  console.log('[GoO Ninks] runTryOn start — via /api/tryon proxy');

  const res = await fetch('/api/tryon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'create',
      input: {
        human_img: humanImgBase64,
        garm_img: garmImgBase64,
        garment_des: garmentDesc
      }
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[GoO Ninks] proxy error:', res.status, err);
    throw new Error(err.error || err.detail || `HTTP ${res.status}`);
  }

  const prediction = await res.json();
  console.log('[GoO Ninks] prediction created — id:', prediction.id, '— status:', prediction.status, '— output:', prediction.output);

  // Kalau langsung succeeded (rare, tapi bisa terjadi)
  if (prediction.status === 'succeeded') {
    const url = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
    if (!url) throw new Error('Model selesai tapi output kosong');
    return prediction;
  }

  if (prediction.error) {
    console.error('[GoO Ninks] prediction error on create:', prediction.error);
    throw new Error(prediction.error);
  }

  // prediction.id harus ada sebelum polling
  if (!prediction.id) {
    console.error('[GoO Ninks] prediction.id tidak ada — full response:', JSON.stringify(prediction));
    throw new Error('Gagal membuat prediction: ID tidak ditemukan dalam response Replicate');
  }

  return await pollPrediction(prediction.id);
}
