/* ============================================================
   GoO Ninks — catalog.js
   Filter by category, hover effects, navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFilter();
  initCardLinks();
});

function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = cat === 'semua' || card.dataset.category === cat;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      const counter = document.querySelector('.catalog-count');
      if (counter) {
        const lang = localStorage.getItem('goo-ninks-lang') || 'id';
        counter.textContent = lang === 'id'
          ? `Menampilkan ${visible} produk`
          : `Showing ${visible} products`;
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    const target = document.querySelector(`.filter-btn[data-filter="${catParam}"]`);
    if (target) target.click();
  }
}

function initCardLinks() {
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn-view');
    if (btn) {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const pid = card.dataset.productId || '1';
        sessionStorage.setItem('goo-selected-product', JSON.stringify({
          id: parseInt(pid),
          name: card.dataset.name || '',
          price: card.dataset.price || '',
          gradient: card.dataset.gradient || '',
          category: card.dataset.category || ''
        }));
        window.location.href = `product-detail.html?id=${pid}`;
      });
    }

    card.addEventListener('click', e => {
      if (!e.target.closest('button')) {
        if (btn) btn.click();
      }
    });
  });
}
