/* ============================================================
   GoO Ninks — main.js
   Bilingual toggle, navbar, scroll reveal, marquee, mobile menu
   ============================================================ */

// ── Language System ──────────────────────────────────────────
const LANG_KEY = 'goo-ninks-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'id';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-id]').forEach(el => {
    el.textContent = lang === 'id' ? el.dataset.id : el.dataset.en;
  });

  document.querySelectorAll('[data-placeholder-id]').forEach(el => {
    el.placeholder = lang === 'id' ? el.dataset.placeholderId : el.dataset.placeholderEn;
  });

  document.querySelectorAll('[data-html-id]').forEach(el => {
    el.innerHTML = lang === 'id' ? el.dataset.htmlId : el.dataset.htmlEn;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
  applyLang(currentLang);
}

// ── Navbar / Mobile Menu ─────────────────────────────────────
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }
}

// ── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });
}

// ── Marquee duplicate for seamless loop ──────────────────────
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const items = track.innerHTML;
  track.innerHTML = items + items;
}

// ── Smooth scroll for anchor links ───────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Active nav link highlight ─────────────────────────────────
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.style.color = 'var(--gold)';
    }
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNavbar();
  initReveal();
  initMarquee();
  initSmoothScroll();
  initActiveNav();
});
