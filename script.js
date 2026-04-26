/* =============================================
   SHILPA – Inclusive Mobile Learning Platform
   JavaScript
   ============================================= */

/* ── Theme toggle ──────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Set light mode as default (if no preference is stored, it defaults to light, so removing .dark-mode)
if (localStorage.getItem('theme') === 'dark') {
  htmlEl.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  htmlEl.classList.toggle('dark-mode');
  if (htmlEl.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

/* ── Navbar scroll effect ──────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNavLink();
});

/* ── Mobile menu ───────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── Active nav link on scroll ─────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

function highlightNavLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + section.id) a.classList.add('active');
      });
    }
  });
}
highlightNavLink();

/* ── Intersection Observer – fade-up ───────── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── Milestone observer ─────────────────────── */
const milestoneObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      milestoneObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.milestone-item').forEach(el => milestoneObserver.observe(el));

/* ── Staggered card animations ─────────────── */
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(
        '.provide-card, .doc-card, .tool-card, .member-card, .domain-card, .stat-card, .achieve-card'
      );
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 60 + i * 80);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.provide-grid, .docs-grid, .tools-grid, .team-grid, .domain-grid, .intro-stats, .achieve-list'
).forEach(el => staggerObserver.observe(el));

/* ── Contact form ───────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, 1200);
  });
}

/* ── Smooth scroll offset for fixed nav ─────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Custom Select ───────────────────────────── */
document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
  const select = wrapper.querySelector('.custom-select');
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const options = wrapper.querySelectorAll('.custom-option');
  const hiddenSelect = wrapper.querySelector('.hidden-select');

  trigger.addEventListener('click', function() {
    select.classList.toggle('open');
  });

  options.forEach(option => {
    option.addEventListener('click', function() {
      if (!this.classList.contains('selected')) {
        const spanText = this.textContent;
        trigger.querySelector('span').textContent = spanText;
        trigger.querySelector('span').style.color = 'var(--text-main)';
        hiddenSelect.value = this.dataset.value;
        
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      }
      select.classList.remove('open');
    });
  });

  window.addEventListener('click', function(e) {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });
});

lucide.createIcons();
