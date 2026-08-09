/* ==========================================================================
   JR LABS — WEBSITE V1
   Progressive enhancement only. The site is fully readable without JS.
   1. Header condense on scroll
   2. Mobile navigation (accessible: aria-expanded, Esc, focus return, scroll lock)
   3. Scroll reveals (disabled under prefers-reduced-motion)
   4. Contact form — front-end validation + honest "not yet connected" notice
   5. Footer year
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Header condense ------------------------------------------------ */
  var header = document.getElementById('siteHeader');
  if (header) {
    var ticking = false;
    var setState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };
    setState();
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(setState); ticking = true; }
    }, { passive: true });
  }

  /* ---- 2. Mobile navigation ---------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('mobileNav');

  if (toggle && panel) {
    var openNav = function () {
      panel.classList.add('is-open');
      panel.removeAttribute('inert');
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      var first = panel.querySelector('a, button');
      if (first) { first.focus(); }
    };
    var closeNav = function (returnFocus) {
      panel.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      if (returnFocus) { toggle.focus(); }
      window.setTimeout(function () {
        if (!panel.classList.contains('is-open')) { panel.setAttribute('inert', ''); }
      }, 400);
    };

    panel.setAttribute('inert', '');

    toggle.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) { closeNav(true); } else { openNav(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) { closeNav(true); }
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(false); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && panel.classList.contains('is-open')) { closeNav(false); }
    });
  }

  /* ---- 3. Scroll reveals -------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal, .principle, .pathway');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ---- 4. Contact form ---------------------------------------------------- */
  /* NOTE: There is no submission backend in Website V1. The form validates in
     the browser and then tells the user plainly that submission is not yet
     connected. See README.md → "Connecting the contact form". */
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.classList.add('is-shown');
        status.textContent =
          'This form is not yet connected to a submission service, so your message has not been sent. ' +
          'Please contact JR Labs directly using the details listed on this page while the enquiry service is being configured.';
        status.focus();
      }
    });
  }

  /* ---- 5. Footer year ----------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
