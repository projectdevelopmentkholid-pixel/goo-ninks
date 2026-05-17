/* ============================================================
   GoO Ninks — chat.js
   Mrs. Nining AI chat interface with keyword-based responses
   ============================================================ */

const RESPONSES = {
  id: {
    kondangan: `Wah, acara kondangan itu selalu spesial ya! 🌸

Untuk kondangan, Mrs. Nining sarankan:

✨ **Set Tenun Pink Navy** (Rp 1.450.000) — paling sering jadi pilihan tamu yang selalu diingat. Lengkap dengan bucket hat matching!

✨ **Set Batik Merah Marun** (Rp 1.250.000) — elegan banget, warna marunnya cocok untuk kondangan sore atau malam.

✨ **Dress Kinanti Exclusive** (Rp 365.000) — pilihan hemat tapi tetap anggun untuk kondangan siang.

Tips dari Mrs. Nining: pilih inner polos warna krem atau putih tulang, aksesoris emas sederhana, dan heels medium biar nyaman tapi tetap stylish!

Ada budget atau warna favorit yang mau kamu pertimbangin? 😊`,

    formal: `Untuk acara formal, saya rekomendasikan koleksi premium GoO Ninks! ✨

🏆 **Outfit Couple Adiprana** (Rp 1.800.000) — untuk event formal bersama pasangan, ini paling eksklusif!

🏆 **Outer Tenun Abu-abu** (Rp 1.100.000) — detail fringe-nya premium banget, cocok untuk meeting atau acara resmi.

🏆 **Set Tenun Orange Mustard** (Rp 1.350.000) — bold tapi tetap formal dengan potongan yang sempurna.

Padukan dengan aksesori gold minimalis dan sepatu pointed toe untuk kesan paling profesional! 💼`,

    warna: `Oh, pertanyaan seru tentang warna! 🎨

Untuk kulit **sawo matang atau gelap**: warna gold, orange, merah marun, dan hijau tua sangat flattering! Hindari warna neon yang terlalu terang.

Untuk kulit **kuning langsat**: hampir semua warna cocok! Khususnya tosca, navy, dan pink dusty.

Untuk kulit **putih/cerah**: merah, hitam, dan warna earth tone seperti mustard dan coklat akan memberikan kontras yang cantik.

Di GoO Ninks, saya sarankan:
- Kulit gelap: **Outer Batik Hijau Tosca** atau **Outer Tenun Kombinasi**
- Kulit langsat: **Set Tenun Pink Navy**
- Kulit cerah: **Set Batik Merah Marun**

Mau saya bantu pilih berdasar warna kulit kamu? 😊`,

    tenun: `Tenun Ikat itu kain yang benar-benar istimewa, dan saya bangga GoO Ninks membawa kainnya! ✨

Tenun Ikat berasal dari NTT — Nusa Tenggara Timur. Proses pembuatannya luar biasa: benang diikat satu per satu dengan tangan sebelum dicelup, menciptakan pola yang tak mungkin dibuat mesin.

Motif-motifnya penuh makna: kuda, naga, dan ayam adalah simbol kekuatan, perlindungan, dan keberanian.

Di GoO Ninks kami punya:
🧵 **Outer Tenun Kombinasi** — geometrik mustard-navy
🧵 **Vest Tenun Hoodie** — modern tapi tetap autentik
🧵 **Set Tenun Pink Navy** — bestseller kami!
🧵 **Outer Tenun Abu-abu** — dengan detail fringe eksklusif

Setiap helai adalah karya seni yang membutuhkan berhari-hari untuk diselesaikan. Ketika kamu memakainya, kamu tidak hanya bergaya — kamu menghargai warisan! 🙏`,

    batik: `Batik adalah bahasa, dan GoO Ninks berbicara dengan sangat fasih! ✨

Koleksi batik kami lahir dari pengrajin Jawa terbaik. Setiap motif dipilih dengan makna:

🌿 **Outer Batik Hijau Tosca** — motif floral segar, cocok untuk hari-hari modern
❤️ **Outer Batik Merah Hitam** — bold dan berani, untuk kamu yang ingin tampil berkarakter
🤎 **Outer Batik Hoodie Coklat** — hangat dan elegan, warna rose-brown yang timeless
💚 **Outer Batik Hoodie Hijau** — casual luxury, untuk gaya sehari-hari yang tetap istimewa

Mau tahu filosofi di balik motif tertentu? Saya bisa ceritain panjang lebar! 😊`,

    lurik: `Lurik — kain sederhana dengan keagungan yang tak tertandingi! ✨

Lurik berasal dari Yogyakarta dan merupakan kain para pemimpin Jawa. Garisnya yang lurus melambangkan kejujuran dan keteguhan.

Di GoO Ninks, Lurik hadir dalam bentuk modern:
🎋 **Overall Lurik Tenun** (Rp 750.000) — kombinasi lurik dan tenun dalam 4 seri warna

Kami percaya Lurik cocok untuk perempuan yang tahu siapa dirinya — tidak perlu berteriak untuk diperhatikan. Kehadirannya sudah cukup.

Tertarik mengetahui lebih lanjut? 😊`,

    default: `Halo! 😊 Makasih udah cerita ke Mrs. Nining!

Saya di sini buat bantu kamu nemuin yang terbaik dari koleksi GoO Ninks. Boleh kasih tau saya lebih banyak?

Misalnya:
🎉 **Untuk acara apa?** (kondangan, arisan, kerja, hangout)
💰 **Budget kamu?** (kami punya dari Rp 365.000 sampai Rp 1.800.000)
🎨 **Warna favorit?** atau warna yang mau dihindari?
👗 **Tipe pakaian?** (Outer, Dress, Set, Overall)

Ceritain ke saya, dan saya jamin kamu bakal nemuin pakaian yang bener-bener tepat! ✨`
  },
  en: {
    kondangan: `Oh, a wedding — how wonderful! 🌸

For formal celebrations, Mrs. Nining recommends:

✨ **Set Tenun Pink Navy** (Rp 1,450,000) — our most beloved choice for guests who leave a lasting impression. Complete with matching bucket hat!

✨ **Set Batik Merah Marun** (Rp 1,250,000) — exquisitely elegant, the deep maroon is perfect for evening celebrations.

✨ **Dress Kinanti Exclusive** (Rp 365,000) — an effortlessly graceful choice for daytime events.

Mrs. Nining's tip: pair with an ivory or cream inner layer, delicate gold accessories, and medium heels for the perfect balance of elegance and comfort.

Do you have a color preference or budget in mind? 😊`,

    formal: `For formal occasions, GoO Ninks' premium collection is perfect! ✨

🏆 **Outfit Couple Adiprana** (Rp 1,800,000) — for formal events with your partner, the most exclusive choice.

🏆 **Outer Tenun Abu-abu** (Rp 1,100,000) — the fringe detailing speaks of refined sophistication.

🏆 **Set Tenun Orange Mustard** (Rp 1,350,000) — bold yet perfectly formal.

Complete the look with minimal gold accessories and pointed-toe shoes for the most professional impression! 💼`,

    warna: `What a wonderful question about color! 🎨

For **warm/dark skin tones**: gold, orange, deep maroon, and dark green are incredibly flattering. Avoid overly bright neons.

For **medium/olive skin tones**: almost everything works beautifully! Particularly teal, navy, and dusty pink.

For **fair/light skin tones**: red, black, and earth tones like mustard and brown create stunning contrast.

My GoO Ninks recommendations:
- Warm tones: **Outer Batik Hijau Tosca** or **Outer Tenun Kombinasi**
- Olive tones: **Set Tenun Pink Navy**
- Fair tones: **Set Batik Merah Marun**

Shall I help you choose based on your specific skin tone? 😊`,

    tenun: `Tenun Ikat is truly one of Indonesia's most extraordinary textiles! ✨

Originating from NTT (East Nusa Tenggara), each thread is hand-bound one by one before dyeing, creating patterns impossible for any machine to replicate.

The motifs carry deep meaning: horses symbolize strength, dragons offer protection, roosters herald courage.

At GoO Ninks, we carry:
🧵 **Outer Tenun Kombinasi** — geometric mustard-navy
🧵 **Vest Tenun Hoodie** — modern yet authentically crafted
🧵 **Set Tenun Pink Navy** — our bestseller!
🧵 **Outer Tenun Abu-abu** — with exclusive fringe detailing

Each piece takes days to complete. When you wear it, you carry centuries of artisan wisdom. 🙏`,

    batik: `Batik is a language, and GoO Ninks speaks it fluently! ✨

Our batik collection comes from the finest Javanese artisans. Each motif is chosen with intention:

🌿 **Outer Batik Hijau Tosca** — fresh florals for modern days
❤️ **Outer Batik Merah Hitam** — bold and characterful
🤎 **Outer Batik Hoodie Coklat** — warm, timeless rose-brown elegance
💚 **Outer Batik Hoodie Hijau** — casual luxury for everyday distinction

Would you like to know the philosophy behind a specific motif? 😊`,

    lurik: `Lurik — the quiet fabric with unparalleled magnificence! ✨

From Yogyakarta, Lurik was worn by Javanese leaders. Its straight lines embody honesty and integrity.

At GoO Ninks, Lurik arrives in modern form:
🎋 **Overall Lurik Tenun** (Rp 750,000) — in 4 curated color series

Lurik suits the woman who knows who she is — no need to announce herself. Her presence is enough.

Would you like to know more? 😊`,

    default: `Hello! 😊 Thank you for reaching out to Mrs. Nining!

I'm here to help you discover the perfect piece from GoO Ninks. May I ask you a few questions?

For instance:
🎉 **What occasion?** (wedding, formal, work, casual)
💰 **Your budget?** (we have pieces from Rp 365,000 to Rp 1,800,000)
🎨 **Color preferences?** or colors to avoid?
👗 **Style preference?** (Outer, Dress, Set, Overall)

Tell me more, and I promise you'll find a piece that feels made just for you! ✨`
  }
};

let isTyping = false;

document.addEventListener('DOMContentLoaded', () => {
  initChat();
  showWelcome();
});

function initChat() {
  const sendBtn = document.getElementById('sendBtn');
  const input = document.getElementById('chatInput');

  sendBtn?.addEventListener('click', sendMessage);

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = localStorage.getItem('goo-ninks-lang') || 'id';
      const text = btn.dataset[lang] || btn.textContent;
      if (input) input.value = text;
      sendMessage();
    });
  });
}

function showWelcome() {
  const lang = localStorage.getItem('goo-ninks-lang') || 'id';

  const welcomeId = `Halo! 👋 Seneng banget bisa ketemu kamu di sini!\n\nSaya Mrs. Nining — stylist pribadi GoO Ninks.\nSaya di sini buat bantu kamu:\n✨ Nemuin baju yang beneran cocok sama kamu\n🎨 Saran perpaduan warna yang pas\n🎉 Rekomendasi outfit untuk berbagai acara\n💝 Cerita di balik kain-kain istimewa kami\n\nMau mulai dari mana? Ceritain ke saya —\nacara apa yang lagi kamu persiapkan, atau warna apa yang biasanya kamu suka? 😊`;

  const welcomeEn = `Hello there! 👋 I'm so delighted you're here!\n\nI'm Mrs. Nining — GoO Ninks' personal stylist.\nI'm here to help you with:\n✨ Finding pieces that truly suit you\n🎨 Perfect color combination advice\n🎉 Outfit recommendations for every occasion\n💝 The stories behind our special fabrics\n\nWhere shall we begin? Tell me —\nwhat occasion are you preparing for, or which colors make you feel most beautiful? 😊`;

  setTimeout(() => {
    appendBubble('nining', lang === 'id' ? welcomeId : welcomeEn);
  }, 400);
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim() || isTyping) return;

  const text = input.value.trim();
  input.value = '';

  appendBubble('user', text);
  showTyping();

  setTimeout(() => {
    removeTyping();
    const response = getResponse(text);
    appendBubble('nining', response);
  }, 1500);
}

function getResponse(text) {
  const lang = localStorage.getItem('goo-ninks-lang') || 'id';
  const lower = text.toLowerCase();
  const r = RESPONSES[lang];

  if (/kondangan|wedding|nikah|pernikahan|pesta/.test(lower)) return r.kondangan;
  if (/formal|resmi|kantor|kerja|meeting|event/.test(lower)) return r.formal;
  if (/warna|color|kulit|skin|tone/.test(lower)) return r.warna;
  if (/tenun|ikat|ntt/.test(lower)) return r.tenun;
  if (/batik|jawa|canting|malam/.test(lower)) return r.batik;
  if (/lurik|yogya|jogja/.test(lower)) return r.lurik;

  return r.default;
}

function appendBubble(role, text) {
  const area = document.getElementById('chatArea');
  if (!area) return;

  const wrap = document.createElement('div');
  wrap.className = `chat-bubble-wrap ${role}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = `bubble-avatar${role === 'user' ? ' user-avatar' : ''}`;
  avatarDiv.textContent = role === 'nining' ? '👩' : '🙋';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  if (role === 'nining') {
    wrap.appendChild(avatarDiv);
    wrap.appendChild(bubble);
  } else {
    wrap.appendChild(bubble);
    wrap.appendChild(avatarDiv);
  }

  area.appendChild(wrap);
  area.scrollTop = area.scrollHeight;
}

function showTyping() {
  isTyping = true;
  const area = document.getElementById('chatArea');
  if (!area) return;

  const wrap = document.createElement('div');
  wrap.className = 'typing-wrap';
  wrap.id = 'typingWrap';

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'bubble-avatar';
  avatarDiv.textContent = '👩';

  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

  wrap.appendChild(avatarDiv);
  wrap.appendChild(indicator);
  area.appendChild(wrap);
  area.scrollTop = area.scrollHeight;
}

function removeTyping() {
  isTyping = false;
  const wrap = document.getElementById('typingWrap');
  if (wrap) wrap.remove();
}

document.addEventListener('langchange', () => {
  const area = document.getElementById('chatArea');
  if (area) area.innerHTML = '';
  showWelcome();
});
