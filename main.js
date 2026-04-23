// ── SNOW ─────────────────────────────────────────────────────────────────────
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
let W, H, flakes = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initFlakes(); });

function initFlakes() {
  flakes = [];
  const count = Math.floor((W * H) / 7000);
  for (let i = 0; i < count; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.0 + 0.3,
      speed: Math.random() * 0.7 + 0.25,
      wind: Math.random() * 0.35 - 0.17,
      opacity: Math.random() * 0.55 + 0.15,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.004,
    });
  }
}
initFlakes();

function drawSnow() {
  ctx.clearRect(0, 0, W, H);
  for (const f of flakes) {
    f.wobble += f.wobbleSpeed;
    f.x += f.wind + Math.sin(f.wobble) * 0.28;
    f.y += f.speed;
    if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
    if (f.x > W + 5) f.x = -5;
    if (f.x < -5)    f.x = W + 5;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
    ctx.fill();
  }
  requestAnimationFrame(drawSnow);
}
drawSnow();

// ── SOCIAL DROPDOWN ──────────────────────────────────────────────────────────
const socialBtn      = document.getElementById('socialBtn');
const socialDropdown = document.getElementById('socialDropdown');

socialBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const open = socialDropdown.classList.toggle('open');
  socialBtn.classList.toggle('open', open);
});
document.addEventListener('click', (e) => {
  if (!socialBtn.contains(e.target) && !socialDropdown.contains(e.target)) {
    socialDropdown.classList.remove('open');
    socialBtn.classList.remove('open');
  }
});

// ── MOBILE MENU ──────────────────────────────────────────────────────────────
const menuToggle  = document.getElementById('menuToggle');
const topbarPanel = document.getElementById('topbarPanel');

menuToggle.addEventListener('click', () => {
  const open = topbarPanel.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', open);
});

// ── SHOWCASE REVEAL (clip-path) ───────────────────────────────────────────────
const revealCards = document.querySelectorAll('.sc-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealCards.forEach(card => revealObserver.observe(card));

// ── DOWNLOAD MODAL ───────────────────────────────────────────────────────────
const dlModal       = document.getElementById('dlModal');
const dlBackdrop    = document.getElementById('dlBackdrop');
const dlClose       = document.getElementById('dlClose');
const downloadNavBtn = document.getElementById('downloadNavBtn');

function openDl(e) {
  e.preventDefault();
  dlModal.classList.add('open');
  // close mobile menu if open
  topbarPanel.classList.remove('is-open');
  menuToggle.classList.remove('is-open');
}
function closeDl() { dlModal.classList.remove('open'); }

downloadNavBtn.addEventListener('click', openDl);
dlBackdrop.addEventListener('click', closeDl);
dlClose.addEventListener('click', closeDl);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDl(); });

// ── LANG ─────────────────────────────────────────────────────────────────────
const langBtns = document.querySelectorAll('[data-lang-btn]');
const langEls  = document.querySelectorAll('[data-lang]');

function setLang(lang) {
  langBtns.forEach(b => b.classList.toggle('active', b.dataset.langBtn === lang));
  langEls.forEach(el => el.classList.toggle('visible', el.dataset.lang === lang));
  localStorage.setItem('noxium-lang', lang);
}

langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
setLang(localStorage.getItem('noxium-lang') || 'tr');
