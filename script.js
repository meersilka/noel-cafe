// АРХЕ — GSAP animations + smooth scroll
gsap.registerPlugin(ScrollTrigger);

// ---------- Smooth scroll via Lenis ----------
const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// якорные ссылки — через lenis
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    lenis.scrollTo(t, { offset: -60, duration: 1.2 });
  });
});

// ---------- Навбар: фон при скролле ----------
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top top',
  end: 99999,
  onUpdate: (self) => nav.classList.toggle('scrolled', self.scroll() > 40),
});

// ---------- Hero: посимвольная анимация заголовка ----------
function splitToChars(el) {
  const text = el.textContent;
  el.textContent = '';
  const frag = document.createDocumentFragment();
  [...text].forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? ' ' : ch;
    frag.appendChild(span);
  });
  el.appendChild(frag);
  return el.querySelectorAll('.char');
}

const heroChars = [];
document.querySelectorAll('.hero__title [data-split]').forEach((line) => {
  heroChars.push(...splitToChars(line));
});

// Тайминги входа героя
const heroTl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero__eyebrow', { opacity: 0, y: 18, duration: 0.7 })
  .from(heroChars, { opacity: 0, y: 60, rotation: 4, stagger: 0.025, duration: 0.9 }, '-=0.3')
  .from('.hero__sub', { opacity: 0, y: 22, duration: 0.7 }, '-=0.4')
  .from('.hero__actions', { opacity: 0, y: 22, duration: 0.7 }, '-=0.5')
  .from('.hero__scroll', { opacity: 0, duration: 0.6 }, '-=0.3');

// Параллакс фона героя
gsap.to('.hero__bg', {
  yPercent: 18,
  scale: 1.15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

// ---------- ScrollTrigger reveals ----------
gsap.utils.toArray('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 36,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
});

gsap.utils.toArray('[data-fade]').forEach((el) => {
  // hero fades managed by heroTl, skip
  if (el.closest('.hero')) return;
  gsap.from(el, {
    opacity: 0,
    y: 26,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
  });
});

// ---------- Параллакс картинок ----------
gsap.utils.toArray('[data-parallax]').forEach((img) => {
  const speed = parseFloat(img.dataset.parallax) || 0.1;
  gsap.fromTo(
    img,
    { yPercent: -speed * 50 },
    {
      yPercent: speed * 50,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});

// ---------- Счётчики ----------
gsap.utils.toArray('[data-count]').forEach((el) => {
  const target = parseInt(el.dataset.count, 10);
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + (obj.val >= 100 ? '+' : '');
        },
      });
    },
  });
});

// ---------- Карточки: лёгкий tilt на ховер ----------
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -y * 6,
      rotateY: x * 6,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
  });
});
