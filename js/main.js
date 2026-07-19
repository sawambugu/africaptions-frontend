
document.addEventListener('DOMContentLoaded', () => {
  wrapSplitLines();
  initScrollReveals();
  initNav();
  initActiveNavLink();
  initNavIndicator();
  initThemeToggle();
  initStatsCounter();
  initContactForm();
  initProgressRing();
  if (window.gsap && window.ScrollTrigger) {
    initGsapReveals();
  }
});

/* ---------- Wrap [data-lines] text into masked line spans ---------- */
function wrapSplitLines() {
  document.querySelectorAll('[data-lines]').forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = `<span class="line-mask"><span class="line-inner">${text}</span></span>`;
  });
}

/* ---------- IntersectionObserver reveal for [data-split] and .line-mask ---------- */
function initScrollReveals() {
  const targets = document.querySelectorAll(
    '[data-split], .line-mask, .reel-media, .service-detail-media, .team-card, .testimonial-card'
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------- GSAP polish: staggered service rows + gentle hero parallax ---------- */
function initGsapReveals() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero background subtle parallax
  gsap.to('.hero-bg img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Stagger the service rows in as a group
  gsap.utils.toArray('.service-row').forEach((row, i) => {
    gsap.fromTo(
      row,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: { trigger: row, start: 'top 88%' },
      }
    );
  });

  // Gallery items fade/scale in
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: (i % 4) * 0.06,
        scrollTrigger: { trigger: item, start: 'top 92%' },
      }
    );
  });
}

/* ---------- Sticky nav background on scroll + mobile menu ---------- */
function initNav() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

/* ---------- Count-up stats when in view ---------- */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const numEl = el.querySelector('.stat-num');
        let current = 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          current = Math.floor(progress * target);
          numEl.textContent = current;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  stats.forEach((s) => io.observe(s));
}

/* ---------- Highlight the current page's nav link ---------- */
function initActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('nav-active');
    }
  });
}

/* ---------- Back-to-top progress ring, synced to scroll position ---------- */
function initProgressRing() {
  const wrap = document.getElementById('progress-wrap');
  if (!wrap) return;
  const circle = wrap.querySelector('.progress');
  const CIRCUMFERENCE = 132;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    circle.style.strokeDashoffset = String(CIRCUMFERENCE - progress * CIRCUMFERENCE);
    wrap.classList.toggle('visible', progress > 0.02);
  });
}

/* ---------- Sliding nav indicator, glides to the active link with a bezier ease ---------- */
function initNavIndicator() {
  const links = document.getElementById('navLinks');
  const indicator = document.getElementById('navIndicator');
  if (!links || !indicator) return;

  const active = links.querySelector('a.nav-active');
  if (!active) {
    indicator.style.opacity = '0';
    return;
  }
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  indicator.style.opacity = '1';
}

/* ---------- Light/dark theme toggle, persisted in localStorage ---------- */
function initThemeToggle() {
  const STORAGE_KEY = 'africaptions-theme';
  const stored = localStorage.getItem(STORAGE_KEY);
  const isDark = stored === 'dark';
  document.documentElement.classList.toggle('dark', isDark);

  const buttons = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile'),
  ].filter(Boolean);

  function syncButtons() {
    const dark = document.documentElement.classList.contains('dark');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    });
    const label = document.getElementById('themeToggleMobileLabel');
    if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
  }
  syncButtons();

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
      syncButtons();
    });
  });
}

/* ---------- Contact form -> backend API ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    status.textContent = 'Sending…';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      status.textContent = "Thanks — we'll be in touch soon.";
      form.reset();
    } catch (err) {
      status.textContent =
        'Something went wrong — email us directly at hello@africaptions.com';
    }
  });
}
