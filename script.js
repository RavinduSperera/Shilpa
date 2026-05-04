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
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
  
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  
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
        '.provide-card, .doc-card, .tool-card, .member-card, .domain-card, .stat-card, .achieve-card, .vision-card-mini'
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
  '.provide-grid, .docs-grid, .tools-grid, .team-grid, .domain-grid, .intro-stats, .achieve-list, .intro-vision-mission'
).forEach(el => staggerObserver.observe(el));

/* ── Contact form ───────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://formsubmit.co/ajax/7f70b8862c9227e3dda51b0433761281", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success === "true" || data.success === true) {
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        const successPopup = document.getElementById('formSuccess');
        successPopup.classList.add('show');
        setTimeout(() => {
          successPopup.classList.remove('show');
        }, 4000);
      } else {
        if (window.location.protocol === 'file:') {
            alert("FormSubmit requires a web server to work. Please open this project using VS Code 'Live Server' or a local web server instead of double-clicking the HTML file.");
        } else {
            alert("Oops! Something went wrong: " + (data.message || "Please try again."));
        }
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    })
    .catch(error => {
      console.error(error);
      if (window.location.protocol === 'file:') {
        alert("FormSubmit requires a web server to work. Please open this project using VS Code 'Live Server' or a local web server instead of double-clicking the HTML file.");
      } else {
        alert("Oops! Something went wrong. Please check your internet connection.");
      }
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
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
        
        // Trigger change event for filtering logic
        hiddenSelect.dispatchEvent(new Event('change'));
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

/* ── Documents Filter ───────────────────────── */
const docFilter = document.getElementById('doc-filter');
const docGridItems = document.querySelectorAll('.doc-card, .docs-category-title');

if (docFilter) {
  docFilter.addEventListener('change', function() {
    const category = this.value;
    
    docGridItems.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.classList.remove('hidden');
        // Trigger small entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          item.style.transition = 'all 0.4s ease';
        }, 10);
      } else {
        item.classList.add('hidden');
      }
    });
  });
}
