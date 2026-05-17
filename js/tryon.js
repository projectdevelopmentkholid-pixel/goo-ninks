/* ============================================================
   GoO Ninks — tryon.js
   File upload, thumbnail selection, canvas overlay, Mrs. Nining
   ============================================================ */

/* PRODUCTS is defined in replicate.js, loaded before this file */

let selectedFile = null;
let selectedProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  renderThumbs();
  initUpload();
  initTryOnBtn();
});

function renderThumbs() {
  const grid = document.getElementById('thumbGrid');
  if (!grid) return;

  PRODUCTS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-thumb';
    div.dataset.id = p.id;
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-thumb-img" style="width:100%;object-fit:cover;display:block;" onerror="this.style.background='${p.gradient}';this.style.height='100%';this.removeAttribute('src');">
      <div class="product-thumb-info">
        <div class="product-thumb-name">${p.name}</div>
        <div class="product-thumb-price">${p.price}</div>
      </div>
      <div class="thumb-check">✓</div>
    `;
    div.addEventListener('click', () => selectProduct(div, p));
    grid.appendChild(div);
  });
}

function selectProduct(el, product) {
  document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  selectedProduct = product;

  const card = document.getElementById('selectedCard');
  if (card) {
    card.classList.add('show');
    const lang = localStorage.getItem('goo-ninks-lang') || 'id';
    card.querySelector('.name').textContent = product.name;
    card.querySelector('.price').textContent = product.price;
  }

  updateTryBtn();
}

function initUpload() {
  const uploadBox = document.getElementById('uploadBox');
  const fileInput = document.getElementById('photoInput');
  if (!uploadBox || !fileInput) return;

  uploadBox.addEventListener('click', () => fileInput.click());

  uploadBox.addEventListener('dragover', e => {
    e.preventDefault();
    uploadBox.style.background = 'rgba(201,168,76,0.08)';
  });

  uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.background = '';
  });

  uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.style.background = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  });

  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });
}

function handleFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert('File terlalu besar! Maks 5MB.');
    return;
  }
  selectedFile = file;

  const reader = new FileReader();
  reader.onload = e => {
    const uploadBox = document.getElementById('uploadBox');
    let preview = uploadBox.querySelector('.upload-preview');
    if (!preview) {
      preview = document.createElement('img');
      preview.className = 'upload-preview';
      uploadBox.appendChild(preview);
    }
    preview.src = e.target.result;
    uploadBox.classList.add('has-photo');

    const defaultContent = uploadBox.querySelector('.upload-default');
    if (defaultContent) defaultContent.style.display = 'none';
  };
  reader.readAsDataURL(file);
  updateTryBtn();
}

function updateTryBtn() {
  const btn = document.getElementById('tryBtn');
  if (!btn) return;
  btn.disabled = !(selectedFile && selectedProduct);
}

function initTryOnBtn() {
  const btn = document.getElementById('tryBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (!selectedFile || !selectedProduct) return;

    const lang = localStorage.getItem('goo-ninks-lang') || 'id';
    btn.disabled = true;
    btn.textContent = lang === 'id'
      ? 'Sabar ya... Mrs. Nining lagi milih angle terbaik buat kamu ✨'
      : 'Just a moment... Mrs. Nining is finding your best angle ✨';

    try {
      const [humanB64, garmB64] = await Promise.all([
        imageFileToBase64(selectedFile),
        imageUrlToBase64(selectedProduct.img)
      ]);
      const prediction = await runTryOn(humanB64, garmB64, selectedProduct.name);
      const resultUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      renderResult(resultUrl);
    } catch (err) {
      console.error('[GoO Ninks] tryon error:', err);
      renderResult(null, err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = lang === 'id' ? '✨ Coba Sekarang' : '✨ Try It On';
    }
  });
}

function renderResult(resultUrl, errorMsg) {
  const resultSection = document.getElementById('tryonResult');
  if (!resultSection) return;

  const canvas = document.getElementById('resultCanvas');
  if (canvas) {
    const lang = localStorage.getItem('goo-ninks-lang') || 'id';
    canvas.style.cssText = 'background:transparent;border:none;position:static;overflow:visible;aspect-ratio:auto;border-radius:0;';

    if (errorMsg) {
      canvas.innerHTML = `
        <div style="padding:24px;background:rgba(180,50,50,0.08);border:1px solid rgba(180,50,50,0.25);border-radius:10px;text-align:center;color:#c04040;font-size:0.88rem;line-height:1.6;">
          ${lang === 'id' ? 'Ups, coba lagi ya! Mrs. Nining lagi sibuk sebentar 😊' : 'Oops, please try again! Mrs. Nining is a little busy right now 😊'}<br>
          <span style="font-size:0.78rem;opacity:0.75;">${errorMsg}</span>
        </div>`;
    } else {
      canvas.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:10px;">
              ${lang === 'id' ? 'Foto Anda' : 'Your Photo'}
            </div>
            <div style="border-radius:10px;overflow:hidden;aspect-ratio:3/4;border:1px solid var(--border);">
              <img id="resultUserImg" alt="Foto Anda" style="width:100%;height:100%;object-fit:cover;display:block;">
            </div>
          </div>
          <div>
            <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">
              ${lang === 'id' ? 'Hasil Try-On' : 'Try-On Result'}
            </div>
            <div style="border-radius:10px;overflow:hidden;aspect-ratio:3/4;border:2px solid var(--gold);">
              <img src="${resultUrl}" alt="Hasil try-on" style="width:100%;height:100%;object-fit:cover;display:block;">
            </div>
          </div>
        </div>`;

      const userImgEl = canvas.querySelector('#resultUserImg');
      if (userImgEl) userImgEl.src = URL.createObjectURL(selectedFile);
    }
  }

  if (!errorMsg) showNiningDashboard();
  resultSection.classList.add('show');
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showNiningDashboard() {
  const placeholder = document.getElementById('niningPlaceholder');
  const text = document.getElementById('niningDashText');
  const textBtn = document.getElementById('niningDashBtn');

  if (placeholder) placeholder.style.display = 'none';
  if (text) text.style.display = 'block';
  if (textBtn) textBtn.style.display = 'inline-flex';
}

function downloadResult() {
  const canvas = document.getElementById('resultCanvas');
  if (!canvas) return;
  const lang = localStorage.getItem('goo-ninks-lang') || 'id';
  alert(lang === 'id'
    ? 'Fitur download akan segera hadir! 📸'
    : 'Download feature coming soon! 📸');
}

function goCheckout() {
  if (selectedProduct) {
    sessionStorage.setItem('goo-selected-product', JSON.stringify(selectedProduct));
  }
  window.location.href = 'checkout.html';
}
