/**
 * Box It Up — script.js
 * Handles: navbar scroll, mobile menu, scroll animations,
 *          smooth anchor scrolling, and scroll indicator.
 */

(function () {
  'use strict';

  /* ── DOM REFERENCES ─────────────────────────────────────── */
  const navbar          = document.getElementById('navbar');
  const hamburger       = document.getElementById('hamburger');
  const navMenu         = document.getElementById('navMenu');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const navLinks        = document.querySelectorAll('.navbar__link, .navbar__btn');
  const langDropdown = document.getElementById('langDropdown');
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  const langText = document.querySelector('.navbar__lang-text');
  const langOptions = document.querySelectorAll('.navbar__lang-option');

  /* ── NAVBAR: SCROLL SHADOW ──────────────────────────────── */
  const logo = document.getElementById('navbarLogo');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
      if (logo) logo.src = "logo_or.png";
    } else {
      navbar.classList.remove('scrolled');
      if (logo) logo.src = "logo_or.png"; // always dark logo on light hero
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load

  /* ── MOBILE MENU TOGGLE ─────────────────────────────────── */
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

    /* ── LANGUAGE DROPDOWN ─────────────────────────────────── */
  function closeLangMenu() {
    if (!langDropdown || !langToggle) return;
    langDropdown.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lang-menu-open');
  }

  function openLangMenu() {
    if (!langDropdown || !langToggle) return;
    langDropdown.classList.add('open');
    langToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('lang-menu-open');
  }

  function toggleLangMenu(e) {
    if (!langDropdown || !langToggle) return;
    e.stopPropagation();

    const isOpen = langDropdown.classList.contains('open');
    if (isOpen) {
      closeLangMenu();
    } else {
      openLangMenu();
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', toggleLangMenu);
  }

  if (langOptions.length) {
    langOptions.forEach(option => {
      option.addEventListener('click', function () {
        const selectedText = this.textContent.trim();
        const targetUrl = this.dataset.url;

        langOptions.forEach(item => item.classList.remove('is-active'));
        this.classList.add('is-active');

        if (langText) {
          langText.textContent = this.dataset.label || this.dataset.lang?.toUpperCase() || 'EN';
        }

        closeLangMenu();

        if (targetUrl) {
          window.location.href = targetUrl;
        }
      });
    });
  }
  
  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navbar.contains(e.target)
    ) {
      closeMenu();
    }

    if (
      langDropdown &&
      langDropdown.classList.contains('open') &&
      !langDropdown.contains(e.target)
    ) {
      closeLangMenu();
    }
  });

  // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (navMenu.classList.contains('open')) {
        closeMenu();
      }
      closeLangMenu();
    }
  });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // skip bare "#" links

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetTop    = target.getBoundingClientRect().top + window.scrollY;
      const offset       = targetTop - navbarHeight - 16;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });

  /* ── SCROLL INDICATOR HIDE ──────────────────────────────── */
  if (scrollIndicator) {
    function handleScrollIndicator() {
      if (window.scrollY > 80) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }

    window.addEventListener('scroll', handleScrollIndicator, { passive: true });

    scrollIndicator.addEventListener('click', function () {
      const howItWorks = document.getElementById('about');
      if (howItWorks) {
        howItWorks.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ── INTERSECTION OBSERVER: SCROLL ANIMATIONS ───────────── */
  const animateTargets = document.querySelectorAll(
    '.step-card, .value-card, .feat-card, .metric-card, ' +
    '.testimonial-card, .about__text, .about__metrics, ' +
    '.section-title, .section-subtitle, .section-label, ' +
    '.featured__header, .hero__stats'
  );

  // Add data-animate attribute to all targets
  animateTargets.forEach((el, i) => {
    el.setAttribute('data-animate', '');
    // Stagger siblings within the same parent
    const siblings = el.parentElement
      ? Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-animate'))
      : [];
    const siblingIndex = siblings.indexOf(el);
    if (siblingIndex > 0) {
      el.style.transitionDelay = `${siblingIndex * 0.08}s`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animateTargets.forEach(el => observer.observe(el));

  /* ── HERO CARDS: PARALLAX ON MOUSE MOVE ─────────────────── */
  const heroVisual = document.querySelector('.hero__visual');
  const heroCards  = document.querySelectorAll('.hero__box-card');

  if (heroVisual && heroCards.length && window.matchMedia('(min-width: 1024px)').matches) {
    heroVisual.addEventListener('mousemove', function (e) {
      const rect   = heroVisual.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / rect.width;
      const dy     = (e.clientY - cy) / rect.height;

      heroCards.forEach((card, i) => {
        const depth  = (i + 1) * 6;
        const tx     = dx * depth;
        const ty     = dy * depth;
        card.style.transform = `translate(${tx}px, ${ty}px)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
    });

    heroVisual.addEventListener('mouseleave', function () {
      heroCards.forEach(card => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  /* ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navbarLinks = document.querySelectorAll('.navbar__link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 32;

    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navbarLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── ACTIVE NAV LINK STYLE ──────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .navbar__link.active {
      color: var(--clr-heading);
      background: rgba(170,174,127,0.15);
    }
  `;
  document.head.appendChild(style);

  /* ── FEAT CARDS: RESERVE BUTTON INTERACTION ─────────────── */
  document.querySelectorAll('.feat-card').forEach(card => {
    card.addEventListener('click', function () {
      // Pulse effect on click
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  /* ── COUNTER ANIMATION FOR HERO STATS ───────────────────── */
  function animateCounter(el, target, suffix, duration) {
    const start     = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(start + (target - start) * eased);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe hero stats section and trigger counters
  const heroStatsEl = document.querySelector('.hero__stats');
  if (heroStatsEl) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const statNumbers = heroStatsEl.querySelectorAll('.hero__stat-number');
            const data = [
              { target: 10, suffix: 'k +' },
              { target: 100,  suffix: ' +' },
              { target: 150,   suffix: ' NTD' }
            ];
            statNumbers.forEach((el, i) => {
              if (data[i]) {
                animateCounter(el, data[i].target, data[i].suffix, 1600);
              }
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(heroStatsEl);
  }

  /* ── INIT ───────────────────────────────────────────────── */
  // Trigger hero content entrance animation
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.animation = 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both';
  }

  const heroVisualEl = document.querySelector('.hero__visual');
  if (heroVisualEl) {
    heroVisualEl.style.animation = 'fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both';
  }

  const careersHeroContent = document.querySelector('.careers-hero__content');
  if (careersHeroContent) {
    careersHeroContent.style.animation =
      'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both';
  }

  console.log('%c Box It Up 🍱 ', 'background:#1a1a1a;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');
  console.log('Website loaded successfully.');

})();