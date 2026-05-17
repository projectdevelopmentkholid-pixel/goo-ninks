/* ============================================================
   GoO Ninks — tryon.js
   File upload, thumbnail selection, canvas overlay, Mrs. Nining
   ============================================================ */

const PRODUCTS = [
  { id:1,  name:'Outer Batik Merah Hitam',    price:'Rp 850.000',  img:'assets/images/product-1.webp',  gradient:'linear-gradient(135deg,#1a0a0a,#4a0f0f,#8B1a1a)' },
  { id:2,  name:'Outer Batik Hijau Tosca',    price:'Rp 820.000',  img:'assets/images/product-2.webp',  gradient:'linear-gradient(135deg,#0a1a15,#0f4a35,#1a8B6a)' },
  { id:3,  name:'Outer Tenun Kombinasi',      price:'Rp 950.000',  img:'assets/images/product-3.webp',  gradient:'linear-gradient(135deg,#1a1500,#4a3a00,#C9A84C)' },
  { id:4,  name:'Set Batik Merah Marun',      price:'Rp 1.250.000',img:'assets/images/product-4.webp',  gradient:'linear-gradient(135deg,#1a0510,#5a1020,#8B1535)' },
  { id:5,  name:'Dress Kinanti Exclusive',    price:'Rp 365.000',  img:'assets/images/product-5.webp',  gradient:'linear-gradient(135deg,#0a150a,#1a4a2a,#2d8B50)' },
  { id:6,  name:'Overall Lurik Tenun',        price:'Rp 750.000',  img:'assets/images/product-6.jfif',  gradient:'linear-gradient(135deg,#0f0f1a,#2a1a4a,#5a3d8B)' },
  { id:7,  name:'Vest Tenun Hoodie',          price:'Rp 680.000',  img:'assets/images/product-7.webp',  gradient:'linear-gradient(135deg,#0a0f15,#1a2d4a,#2d508B)' },
  { id:8,  name:'Outer Batik Hoodie Hijau',   price:'Rp 890.000',  img:'assets/images/product-8.webp',  gradient:'linear-gradient(135deg,#051a05,#0f4a15,#1a8B25)' },
  { id:9,  name:'Outer Batik Hoodie Coklat',  price:'Rp 870.000',  img:'assets/images/product-9.webp',  gradient:'linear-gradient(135deg,#1a0f0a,#4a2a1a,#8B5535)' },
  { id:10, name:'Outer Tenun Abu-abu',        price:'Rp 1.100.000',img:'assets/images/product-10.webp', gradient:'linear-gradient(135deg,#0f0f0f,#2a2a2a,#555555)' },
  { id:11, name:'Set Tenun Pink Navy',        price:'Rp 1.450.000',img:'assets/images/product-11.webp', gradient:'linear-gradient(135deg,#0a0520,#2a0a4a,#6B1a8B)' },
  { id:12, name:'Set Tenun Orange Mustard',   price:'Rp 1.350.000',img:'assets/images/product-12.webp', gradient:'linear-gradient(135deg,#1a0f00,#4a2a00,#C9A84C)' },
  { id:13, name:'Outfit Couple Adiprana',     price:'Rp 1.800.000',img:'assets/images/product-13.jfif', gradient:'linear-gradient(135deg,#0f0f0f,#2a2a35,#4a4a6B)' },
];

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
    btn.textContent = lang === 'id' ? 'Sedang memproses...' : 'Processing...';

    await simulateDelay(2000);
    renderResult();

    btn.disabled = false;
    btn.textContent = lang === 'id' ? '✨ Coba Sekarang' : '✨ Try It On';
  });
}

function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function renderResult() {
  const resultSection = document.getElementById('tryonResult');
  if (!resultSection) return;

  const canvas = document.getElementById('resultCanvas');
  if (canvas) {
    const lang = localStorage.getItem('goo-ninks-lang') || 'id';

    // Remove canvas-area constraints — layout is now driven by content
    canvas.style.cssText = 'background:transparent;border:none;position:static;overflow:visible;aspect-ratio:auto;border-radius:0;';

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
            ${lang === 'id' ? 'Produk Pilihan Anda' : 'Your Chosen Piece'}
          </div>
          <div style="border-radius:10px;overflow:hidden;aspect-ratio:3/4;border:2px solid var(--gold);position:relative;background:${selectedProduct.gradient};">
            <img src="${selectedProduct.img}" alt="${selectedProduct.name}"
              style="width:100%;height:100%;object-fit:cover;display:block;"
              onerror="this.style.display='none'">
            <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.72));padding:20px 12px 14px;">
              <div style="color:#fff;font-weight:600;font-size:0.82rem;margin-bottom:3px;">${selectedProduct.name}</div>
              <div style="color:#C9A84C;font-size:0.78rem;font-weight:600;">${selectedProduct.price}</div>
            </div>
          </div>
        </div>

      </div>

      <div style="text-align:center;margin-top:18px;padding:14px 20px;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:8px;">
        <span style="font-size:0.9rem;color:var(--text-secondary);font-style:italic;" data-id="✨ Bayangkan tampilan Anda dengan kain istimewa ini" data-en="✨ Imagine yourself in this exquisite piece">
          ${lang === 'id' ? '✨ Bayangkan tampilan Anda dengan kain istimewa ini' : '✨ Imagine yourself in this exquisite piece'}
        </span>
      </div>
    `;

    // Set user photo after DOM is ready (avoids blob URL timing issue)
    const userImgEl = canvas.querySelector('#resultUserImg');
    if (userImgEl) userImgEl.src = URL.createObjectURL(selectedFile);
  }

  showNiningDashboard();

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
