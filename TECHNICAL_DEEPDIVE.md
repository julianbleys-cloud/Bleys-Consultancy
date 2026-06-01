# 🏗️ TECHNICAL DEEP-DIVE — Bleys Consultancy Website

This document explains the architecture, design decisions, and how each system works. Use this to understand the code and make future modifications.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────┐
│   Browser (Client Side)              │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │    index.html (Markup)       │  │
│  │  - Semantic structure        │  │
│  │  - data-nl/data-en attrs     │  │
│  │  - Form elements             │  │
│  └──────────────────────────────┘  │
│           ↓ Loads ↓                 │
│  ┌──────────────────────────────┐  │
│  │    styles.css (Styling)      │  │
│  │  - CSS variables for theme   │  │
│  │  - Responsive grid layouts   │  │
│  │  - Animations & transitions  │  │
│  └──────────────────────────────┘  │
│           ↓ Loads ↓                 │
│  ┌──────────────────────────────┐  │
│  │    main.js (Behavior)        │  │
│  │  - Video autoplay handling   │  │
│  │  - Language switching        │  │
│  │  - Form submission           │  │
│  │  - Scroll animations         │  │
│  └──────────────────────────────┘  │
│           ↓ Fetches ↓               │
│  ┌──────────────────────────────┐  │
│  │  External APIs & Resources   │  │
│  │  - Google Fonts (CDN)        │  │
│  │  - MyMemory Translation API  │  │
│  │  - Video files (local/CDN)   │  │
│  │  - Formspree (form backend)  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 🎯 Design Decisions & Why

### 1. **Vanilla HTML/CSS/JS (No Framework)**

**Why?**
- ✅ Fast load time (no framework overhead)
- ✅ Easy to understand and modify
- ✅ No build process required
- ✅ Works on all browsers
- ✅ Suitable for static website (not app)

**Trade-off:**
- ❌ More manual code for complex features
- ❌ Less ecosystem support
- ❌ Harder to scale to 100+ pages

**When to refactor:** If you add 50+ pages or complex dashboard

---

### 2. **Two-Tier Translation System**

**Tier 1: Pre-baked (data-nl/data-en)**
```html
<h1 data-nl="Nederlandse tekst" data-en="English text">...</h1>
```
- **Why:** Instant display, no API call needed
- **Use for:** Critical content (hero, CTAs, navigation)

**Tier 2: API (data-translate)**
```html
<p data-translate>Text to translate via API</p>
```
- **Why:** Dynamic content, no pre-translation needed
- **Use for:** Secondary content, future-added text

**Why MyMemory API?**
- ✅ Free (no API key needed)
- ✅ No rate limits for small sites
- ✅ Decent quality for English ↔ Dutch
- ✅ Caching prevents repeated requests

**Cache Strategy:**
```javascript
const translationCache = { nl: {}, en: {} };
// Results stored in memory during session
// Persists as long as page is open
```

**Problem:** API goes down → fallback to original language

**Solution:** Use HTML lang attribute for fallback styling
```html
<html lang="nl"> <!-- Can be "en" -->
```

---

### 3. **Video Autoplay with Graceful Degradation**

**Problem:** Modern browsers block autoplay (user experience)

**Solution:** Cascading approach:

```javascript
// Step 1: Try immediate autoplay
vid.play().catch(error => {
  // Step 2: If blocked, wait for user interaction
  document.addEventListener('click', () => vid.play(), { once: true });
});
```

**Why both WebM + MP4?**
- **WebM:** Better compression (smaller file, faster load)
- **MP4:** Fallback for older browsers (Safari on iOS)

**Browser Support:**
| Browser | WebM | MP4 |
|---------|------|-----|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ❌ | ✅ |
| Edge | ✅ | ✅ |

---

### 4. **CSS Variables for Theming**

```css
:root {
  --black: #0C0C0C;
  --accent: #C8102E;
  --font-serif: 'Libre Baskerville', Georgia, serif;
}
```

**Why?**
- ✅ Single point of change (e.g., brand color)
- ✅ No search-replace needed
- ✅ Easy to create dark mode
- ✅ Better maintainability

**How to add dark mode:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}
```

---

### 5. **Intersection Observer for Animations**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
```

**Why?**
- ✅ Triggers animations when element enters viewport
- ✅ Improves perceived performance
- ✅ Less CPU-intensive than scroll listeners
- ✅ Better than fade-in-on-load (boring)

**How it works:**
1. Page loads → elements have `opacity: 0`
2. User scrolls → element enters viewport
3. Observer fires → add `visible` class
4. CSS transition → smooth fade-in

---

## 🔧 How Each System Works

### VIDEO SYSTEM

**Flow:**
```
1. Page loads → HTML <video> tag
2. main.js: Set muted=true, loop=true
3. Call vid.play()
4. If promise resolves → autoplay works
5. If promise rejects → wait for click
6. User clicks → play() called again
7. Video loops forever
```

**Key Properties:**
```javascript
muted: true      // Required for autoplay to work
loop: true       // Restart when finished
autoplay: false  // Browser blocks it, so we JS control
```

**File Path Resolution:**
```html
<!-- Browser looks for files relative to HTML location -->
<source src="assets/videos/sparkle-line-2k.webm">
<!-- If HTML is at: /bleys-consultancy/index.html
     Browser searches: /bleys-consultancy/assets/videos/sparkle-line-2k.webm -->
```

---

### LANGUAGE SYSTEM

**Flow:**
```
1. User clicks "EN" button
2. setLang('en') called
3. Scan all [data-en] elements
4. Replace innerHTML with data-en value
5. Scan all [data-translate] elements
6. Send to MyMemory API for translation
7. Cache results
8. Update document
9. Save lang preference (future: localStorage)
```

**Data Attributes:**
```html
<!-- Pre-baked translation -->
<h1 data-nl="Nederlands" data-en="English">Nederlands</h1>

<!-- Placeholder translation -->
<input data-placeholder-nl="Naam" data-placeholder-en="Name" />

<!-- API translation (needs data-original) -->
<p data-translate data-original="Original Dutch">Original Dutch</p>
```

**Cache Example:**
```javascript
// First load (en → nl)
"Strategy, portfolio & execution" → API request → Cached

// Second load (en → nl again)
"Strategy, portfolio & execution" → Cache hit → Instant
```

**Gotchas:**
- Cache is session-only (cleared on page refresh)
- Whitespace differences can break cache hits
- Very long text gets truncated by API

---

### FORM SYSTEM

**Current Behavior:**
```javascript
function handleSubmit(e) {
  e.preventDefault();
  // Show success message (no data sent)
  toast.textContent = 'Message received...';
  toast.classList.add('show');
  e.target.reset(); // Clear form
  setTimeout(() => toast.classList.remove('show'), 4500);
}
```

**To Send Data (add this):**
```javascript
// Option 1: Formspree
const response = await fetch('https://formspree.io/f/myzaydbd', {
  method: 'POST',
  body: new FormData(e.target),
  headers: { 'Accept': 'application/json' }
});

// Option 2: Custom backend
const response = await fetch('https://your-api.com/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  })
});
```

---

### RESPONSIVE DESIGN SYSTEM

**Mobile-First Breakpoints:**
```css
/* Base: Mobile (all screens) */
.services-grid {
  grid-template-columns: 1fr; /* Single column */
}

/* Medium screens (768px+) */
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr); /* Two columns */
  }
}

/* Large screens (1024px+) */
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr); /* Four columns */
  }
}
```

**Why `clamp()` for Fluid Sizing:**
```css
/* Instead of fixed breakpoints */
padding: clamp(1.5rem, 5vw, 4rem);
/* On 320px: 1.5rem (minimum) */
/* On 800px: 5vw = 40px (scales with viewport) */
/* On 1600px: 4rem = 64px (maximum) */
/* No media queries needed! */
```

---

## 📊 Performance Optimization

### CSS Optimization
```css
/* ✅ DO: Use shorthand */
margin: 0; padding: 0;
border: 1px solid #000;

/* ❌ DON'T: Verbose */
margin-top: 0; margin-right: 0; /* etc */
border-top: 1px; border-right: 1px; /* etc */
```

### Animation Optimization
```css
/* ✅ Transform (GPU accelerated) */
animation: slideIn { transform: translateY(0); }

/* ❌ Top (causes reflow) */
animation: slideIn { top: 0; }
```

### Loading Optimization
```javascript
// ✅ Defer non-critical scripts
<script src="analytics.js" defer></script>

// ✅ Preload critical resources
<link rel="preload" href="fonts.css">

// ❌ Block rendering
<script src="blocking.js"></script>
```

---

## 🔐 Security Considerations

### Current Vulnerabilities
- ❌ XSS Risk: User input from form isn't sanitized
- ❌ CSRF: No token validation on form submission
- ❌ API Exposure: MyMemory API key visible (but it's free/public)

### Fixes for Production
```javascript
// Sanitize user input
function sanitizeInput(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Validate form before submit
if (!form.name.value.trim()) {
  console.warn('Name is required');
  return;
}
```

### HTTPS Requirement
- ✅ Always use HTTPS (browser blocks mixed content)
- ✅ Use HTTPS for all external APIs
- ✅ Set `upgrade-insecure-requests` header

---

## 🚀 Scaling Path

**Current (v1.0):**
- Static HTML/CSS/JS
- ~1000 visitors/month target
- Simple contact form

**Next (v2.0 - Mid-scale):**
- Add blog (Hugo/11ty)
- More dynamic content
- Analytics dashboard
- Email automation

**Future (v3.0 - Large-scale):**
- Headless CMS (Contentful/Strapi)
- Complex data management
- Team collaboration
- API integrations

---

## 🛠️ Common Modifications

### Change Hero Video Duration
```html
<!-- Video will loop to beginning when complete -->
<!-- To slow down: add playback rate in CSS -->
<video class="hero-video-bg" style="animation: play 30s linear infinite;">
```

### Add New Section
```html
<section id="new-section">
  <h2 data-nl="Titel" data-en="Title">Titel</h2>
  <p class="reveal" data-nl="Content" data-en="Content">Content</p>
</section>
```

### Add New Color Theme
```css
:root {
  --accent: #007BFF; /* New blue instead of red */
}
/* All accent colors update automatically */
```

### Disable Animations (for accessibility)
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📚 Browser APIs Used

| API | Purpose | Fallback |
|-----|---------|----------|
| Fetch | Load translations | Cache + fallback to original |
| IntersectionObserver | Scroll animations | None (degrades gracefully) |
| LocalStorage | Store preferences | None (resets on reload) |
| Fetch | Form submission | None (must use Formspree) |

**Browser Support:**
- Chrome 51+ ✅
- Firefox 55+ ✅
- Safari 12.1+ ✅
- Edge 16+ ✅
- IE 11 ❌ (no IntersectionObserver)

---

## 🔍 Debugging Guide

### Check Console for Errors
```javascript
// Open DevTools (F12) → Console
// Look for red errors (❌)
// Yellow warnings ⚠️ are OK

// Add manual logging for debugging
console.log('Language:', currentLang);
console.log('Cache:', translationCache);
console.log('Video element:', document.querySelector('video'));
```

### Network Tab (Check File Sizes)
```
DevTools → Network → Reload page
- index.html: Should be < 20 KB
- styles.css: Should be < 50 KB  
- main.js: Should be < 30 KB
- Video: Should be < 8 MB combined (WebM + MP4)
```

### Performance Metrics
```javascript
// In Console:
performance.timing.loadEventEnd - performance.timing.navigationStart
// Should be < 3 seconds for full page load
```

---

## 📖 Further Reading

- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web.dev: Performance](https://web.dev/performance/)
- [A11y: Accessibility](https://www.a11yproject.com/)

---

**Questions?** Check the code comments or create an issue on GitHub.
