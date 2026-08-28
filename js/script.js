// ===================== LOADER =====================
window.addEventListener('load', () => {
  setTimeout(() => document.body.classList.add('is-loaded'), 900);
});

// ===================== HEADER SCROLL =====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===================== MOBILE MENU =====================
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('nav-open'));
});

// ===================== MARQUEE (loop infinito) =====================
const track = document.getElementById('marqueeTrack');
if (track) {
  track.innerHTML += track.innerHTML; // duplicamos las marcas para que el loop sea continuo
}

// ===================== SLIDESHOW BENTO =====================
const bentoSlideshow = document.getElementById('bentoSlideshow');
if (bentoSlideshow) {
  const slides = bentoSlideshow.querySelectorAll('img');
  let bentoIndex = 0;
  setInterval(() => {
    slides[bentoIndex].classList.remove('active');
    bentoIndex = (bentoIndex + 1) % slides.length;
    slides[bentoIndex].classList.add('active');
  }, 3000);
}

// ===================== CARRUSEL "NUESTRO TRABAJO" =====================
// Para sumar videos, agregá un objeto { src, label } a esta lista.
const workVideos = [
  { src: 'assets/video/milanesa.mp4', label: 'Club de la Milanesa' },
  { src: 'assets/video/airpark.mp4', label: 'Air Park' },
  { src: 'assets/video/patagonia.mp4', label: 'Patagonia' },
  { src: 'assets/video/temple.mp4', label: 'Temple' },
  { src: 'assets/video/rupi.mp4', label: 'Rupi' },
  { src: 'assets/video/coverline.mp4', label: 'Coverline' },
  { src: 'assets/video/eplus.mp4', label: 'E+' },
  { src: 'assets/video/berilo.mp4', label: 'Complejo Berilo' },
  { src: 'assets/video/bodegan.mp4', label: 'Bodegán' },
  { src: 'assets/video/koa.mp4', label: 'Koa' },
  { src: 'assets/video/lasmoras.mp4', label: 'Las Moras' },
  { src: 'assets/video/aerovalet.mp4', label: 'Aero Valet' },
  { src: 'assets/video/applemart.mp4', label: 'Apple Mart' },
  { src: 'assets/video/tonda.mp4', label: 'Tonda Napolitana' },
  { src: 'assets/video/trekking.mp4', label: 'Trekking Outdoor Training' },
];

const workVideoEl = document.getElementById('workVideo');
const workCaption = document.getElementById('workCaption');
const workDots = document.getElementById('workDots');
let workIndex = 0;

function renderWorkVideo(i) {
  workIndex = (i + workVideos.length) % workVideos.length;
  const item = workVideos[workIndex];
  workVideoEl.src = item.src;
  workVideoEl.play().catch(() => {});
  workCaption.textContent = item.label;

  workDots.querySelectorAll('span').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === workIndex);
  });
}

if (workVideoEl && workVideos.length) {
  workVideos.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => renderWorkVideo(idx));
    workDots.appendChild(dot);
  });

  document.querySelector('.phone-nav-prev').addEventListener('click', () => renderWorkVideo(workIndex - 1));
  document.querySelector('.phone-nav-next').addEventListener('click', () => renderWorkVideo(workIndex + 1));

  const muteToggle = document.getElementById('muteToggle');
  muteToggle.addEventListener('click', () => {
    workVideoEl.muted = !workVideoEl.muted;
    muteToggle.classList.toggle('unmuted', !workVideoEl.muted);
    muteToggle.setAttribute('aria-label', workVideoEl.muted ? 'Activar sonido' : 'Silenciar');
  });

  renderWorkVideo(0);
}

// ===================== ANIMACIÓN AL HACER SCROLL =====================
const revealTargets = document.querySelectorAll(
  '.section-title, .section-sub, .about-quote, .about-video, .services-grid, .team-grid, .bento-grid, .phone-carousel, .contact-actions'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===================== AÑO EN EL FOOTER =====================
document.getElementById('year').textContent = new Date().getFullYear();
