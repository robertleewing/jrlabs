/* ==========================================================================
   JR LABS — GA4 + COOKIE CONSENT
   Measurement ID: G-3C5567SET1

   Privacy-first setup:
   - Google Analytics is OFF by default.
   - No Google Analytics script is loaded until the visitor accepts analytics.
   - Advertising consent remains denied.
   - Visitors can reopen Cookie settings from the footer.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'jrlabs_cookie_consent';
  var MEASUREMENT_ID = 'G-3C5567SET1';
  var banner;
  var googleLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Default all Google consent signals to denied before any Google tag is loaded.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  function getChoice() {
    try { return window.localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }

  function saveChoice(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); }
    catch (e) {}
  }

  function loadGoogleAnalytics() {
    if (googleLoaded || document.querySelector('script[data-jrlabs-ga4]')) {
      googleLoaded = true;
      return;
    }

    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    script.setAttribute('data-jrlabs-ga4', 'true');
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    googleLoaded = true;
  }

  function denyAnalytics() {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    // Delete common first-party GA cookies if present.
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + location.hostname + '; SameSite=Lax';
        if (location.hostname.indexOf('www.') === 0) {
          document.cookie = name + '=; Max-Age=0; path=/; domain=' + location.hostname.replace(/^www\./, '.') + '; SameSite=Lax';
        }
      }
    });
  }

  function closeBanner() {
    if (banner) {
      banner.remove();
      banner = null;
    }
  }

  function acceptAnalytics() {
    saveChoice('accepted');
    closeBanner();
    loadGoogleAnalytics();
  }

  function rejectAnalytics() {
    saveChoice('rejected');
    denyAnalytics();
    closeBanner();
  }

  function showBanner() {
    closeBanner();

    banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'cookieConsentTitle');

    banner.innerHTML =
      '<div class="cookie-consent__backdrop" aria-hidden="true"></div>' +
      '<div class="cookie-consent__card">' +
        '<p class="cookie-consent__eyebrow">Privacy &amp; analytics</p>' +
        '<h2 id="cookieConsentTitle">Help us understand how the JR Labs website is used.</h2>' +
        '<p class="cookie-consent__text">We use optional Google Analytics cookies to understand visits and improve the website. ' +
        'Analytics stays off unless you choose <strong>Accept analytics</strong>. ' +
        'We do not use advertising cookies.</p>' +
        '<div class="cookie-consent__actions">' +
          '<button type="button" class="btn btn--gold cookie-consent__accept">Accept analytics</button>' +
          '<button type="button" class="btn btn--ghost cookie-consent__reject">Reject non-essential</button>' +
        '</div>' +
        '<a class="cookie-consent__policy" href="cookie-policy.html">Read our Cookie Policy</a>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('.cookie-consent__accept').addEventListener('click', acceptAnalytics);
    banner.querySelector('.cookie-consent__reject').addEventListener('click', rejectAnalytics);
    var card = banner.querySelector('.cookie-consent__card');
    card.setAttribute('tabindex', '-1');
    card.focus();
  }

  function addSettingsControl() {
    var legalNav = document.querySelector('.footer-legal');
    if (!legalNav || legalNav.querySelector('[data-cookie-settings]')) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'footer-cookie-settings';
    button.setAttribute('data-cookie-settings', '');
    button.textContent = 'Cookie settings';
    button.addEventListener('click', showBanner);
    legalNav.appendChild(button);
  }

  function init() {
    var choice = getChoice();

    if (choice === 'accepted') {
      loadGoogleAnalytics();
    } else if (choice === 'rejected') {
      denyAnalytics();
    } else {
      showBanner();
    }

    addSettingsControl();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
