/* ══════════════════════════════════════════════════════════════════════════════
   BLEYS CONSULTANCY — MAIN.JS
   Video autoplay, multilingual support, forms, animations
   ═════════════════════════════════════════════════════════════════════════════ */

let currentLang = 'nl';

/* ────────────────────────────────────────────────────────────────────────────
   VIDEO AUTOPLAY HANDLING
   ─────────────────────────────────────────────────────────────────────────── */

window.addEventListener('DOMContentLoaded', () => {
  // Initialize video
  const vid = document.querySelector('.hero-video-bg');
  if (vid) {
    vid.muted = true;
    vid.loop = true;

    // Try autoplay
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay blocked by browser — fallback on first user interaction
        console.warn('Autoplay blocked:', error.message);
        document.addEventListener('click', () => vid.play(), { once: true });
        document.addEventListener('touchstart', () => vid.play(), { once: true });
      });
    }
  }

  // Initialize language buttons
  const btnNL = document.getElementById('btn-nl');
  const btnEN = document.getElementById('btn-en');

  if (btnNL) {
    btnNL.addEventListener('click', () => setLang('nl'));
  }
  if (btnEN) {
    btnEN.addEventListener('click', () => setLang('en'));
  }

  // Set initial language
  setLang('nl');
});

/* ────────────────────────────────────────────────────────────────────────────
   MULTILINGUAL SUPPORT
   MyMemory Translation API (free, no API key required)
   ─────────────────────────────────────────────────────────────────────────── */

const translationCache = { nl: {}, en: {} };

/**
 * Fetch translations from MyMemory API
 * @param {string[]} texts - Array of texts to translate
 * @param {string} targetLang - Target language ('nl' or 'en')
 * @returns {Promise<Object>} Map of original text to translated text
 */
async function translateWithMyMemory(texts, targetLang) {
  const sourceLang = targetLang === 'en' ? 'nl' : 'en';
  const results = {};
  const toFetch = [];

  // Check cache first
  for (const text of texts) {
    const key = text.trim();
    if (!key) continue;

    if (translationCache[targetLang][key]) {
      results[key] = translationCache[targetLang][key];
    } else {
      toFetch.push(key);
    }
  }

  // Fetch missing translations
  await Promise.all(
    toFetch.map(async (text) => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.responseStatus === 200) {
          const translated = data.responseData.translatedText;
          translationCache[targetLang][text] = translated;
          results[text] = translated;
        } else {
          // Fallback to original text
          results[text] = text;
        }
      } catch (error) {
        console.warn('Translation error:', error);
        results[text] = text; // Fallback on network error
      }
    })
  );

  return results;
}

/**
 * Switch language globally
 * @param {string} lang - Language code ('nl' or 'en')
 */
async function setLang(lang) {
  currentLang = lang;

  // Update active language button
  const btnNL = document.getElementById('btn-nl');
  const btnEN = document.getElementById('btn-en');
  if (btnNL) btnNL.classList.toggle('active', lang === 'nl');
  if (btnEN) btnEN.classList.toggle('active', lang === 'en');

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Step 1: Apply pre-baked translations from data-nl / data-en attributes
  const attrName = 'data-' + lang;
  document.querySelectorAll('[' + attrName + ']').forEach((el) => {
    const val = el.getAttribute(attrName);
    if (val !== null) {
      el.innerHTML = val;
    }
  });

  // Step 2: Update placeholder attributes
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach((el) => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang) || '';
  });

  // Step 3: Translate elements without pre-baked data via API
  const needsTranslation = [];
  const elementsToTranslate = [];

  document.querySelectorAll('[data-translate]').forEach((el) => {
    const originalText = el.getAttribute('data-original') || el.innerText.trim();
    if (originalText && !el.getAttribute(attrName)) {
      // Store original text on first use
      if (!el.getAttribute('data-original')) {
        el.setAttribute('data-original', originalText);
      }
      needsTranslation.push(originalText);
      elementsToTranslate.push(el);
    }
  });

  if (needsTranslation.length > 0) {
    const translated = await translateWithMyMemory(needsTranslation, lang);
    elementsToTranslate.forEach((el, index) => {
      const original = needsTranslation[index];
      if (translated[original]) {
        el.innerText = translated[original];
      }
    });
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   REVEAL ANIMATIONS (on scroll)
   ─────────────────────────────────────────────────────────────────────────── */

window.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal');

  // Add animation class to all reveal items
  revealItems.forEach((el) => el.classList.add('anim'));

  // Intersection Observer for scroll-triggered reveals
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.06,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealItems.forEach((el) => observer.observe(el));

  // Fallback: make all visible after delay if JS animation stalls
  setTimeout(() => {
    revealItems.forEach((el) => el.classList.add('visible'));
  }, 400);
});

/* ────────────────────────────────────────────────────────────────────────────
   SMOOTH SCROLL FOR ANCHOR LINKS
   ─────────────────────────────────────────────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

/* ────────────────────────────────────────────────────────────────────────────
   CONTACT FORM SUBMISSION
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Handle contact form submission
 * Sends email via Formspree (configure with your form ID)
 * @param {Event} e - Form submit event
 */
function handleSubmit(e) {
  e.preventDefault();

  const toast = document.getElementById('toast');
  const form = e.target;
  const formData = new FormData(form);

  // Your Formspree form ID (configured)
  const formspreeId = 'mzdwbajg'; // Your actual ID from formspree.io

  // Show loading state
  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === 'nl' ? 'Verzenden...' : 'Sending...';

  // Send via Formspree
  fetch(`https://formspree.io/f/${formspreeId}`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      // Success
      const toastMessage = currentLang === 'nl'
        ? 'Bericht verzonden! We nemen snel contact op.'
        : 'Message sent! We\'ll be in touch shortly.';
      
      toast.textContent = toastMessage;
      toast.classList.add('show');
      form.reset();
      
      // Hide toast after 4.5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    } else {
      // Error
      const errorMsg = currentLang === 'nl'
        ? 'Er ging iets fout. Probeer later opnieuw.'
        : 'Something went wrong. Please try again.';
      
      toast.textContent = errorMsg;
      toast.classList.add('show');
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    const errorMsg = currentLang === 'nl'
      ? 'Verbindingsfout. Probeer later opnieuw.'
      : 'Connection error. Please try again.';
    
    toast.textContent = errorMsg;
    toast.classList.add('show');
  })
  .finally(() => {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });

  // Hide toast after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ────────────────────────────────────────────────────────────────────────────
   PERFORMANCE OPTIMIZATIONS
   ─────────────────────────────────────────────────────────────────────────── */

// Lazy load images if supported
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Disable unused features on low-end devices
if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
  document.body.classList.add('low-memory-mode');
}

/* ────────────────────────────────────────────────────────────────────────────
   UTILITY: CONSOLE LOGGING FOR DEBUGGING
   ─────────────────────────────────────────────────────────────────────────── */

console.log('🎨 Bleys Consultancy — Loaded successfully');
console.log('📍 Current language:', currentLang);
console.log('🌐 Translation cache initialized');
