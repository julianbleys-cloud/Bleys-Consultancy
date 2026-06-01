# Bleys Consultancy — Website

Production-ready, fully responsive website for innovation management consulting. Built with vanilla HTML/CSS/JS, optimized for performance and scalability.

---

## 📁 File Structure

```
bleys-consultancy/
├── index.html           # Main HTML (markup only)
├── styles.css           # All styling (production-grade CSS)
├── main.js              # All JavaScript (video, translations, forms)
├── assets/
│   ├── videos/
│   │   ├── sparkle-line-2k.webm    # Modern browsers (primary)
│   │   └── sparkle-line-2k.mp4     # Fallback format
│   ├── images/
│   │   └── logo.svg                # Brand logo
│   └── fonts/           # (Google Fonts loaded via CDN)
└── README.md            # This file
```

## ⚙️ Configuration

### Language Settings

Currently set to Dutch (`nl`) by default. To change:

**In `main.js`, line 11:**
```javascript
let currentLang = 'nl'; // Change to 'en' for English
```

### Translation System

Two-tier translation system:

1. **Pre-baked translations** (instant): Use `data-nl` and `data-en` attributes in HTML
   ```html
   <h1 data-nl="Nederlandse tekst" data-en="English text">Nederlandse tekst</h1>
   ```

2. **API translations** (for dynamic content): Use `data-translate` attribute
   ```html
   <p data-translate>Text to be translated on language switch</p>
   ```

The system caches all translations in browser memory to avoid repeated API calls.

---

## 📊 Performance Metrics

Current Lighthouse scores (target):
- **Performance**: 85+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Video Optimization

- **Format**: WebM (2K, ~3MB) + MP4 fallback (2K, ~5MB)
- **Total hero section load**: ~5-8 MB
- **Lazy loading**: Video only loads when needed
- **Fallback**: Static image if autoplay fails

---

## 🎨 Design System

### Colors (CSS Variables)
```css
--black: #0C0C0C          /* Primary background */
--accent: #C8102E         /* Red accent for CTAs */
--off-white: #F8F7F5      /* Light background */
--gray-500: #8A8880       /* Body text (dark) */
```

### Typography
- **Display**: Libre Baskerville (serif) — headlines, hero
- **Body**: Inter (sans-serif) — all text content

### Spacing
Responsive padding system using CSS `clamp()`:
```css
--pad: clamp(1.5rem, 5vw, 4rem);
```

---

## 🌐 Multilingual Support

The site supports both Dutch and English via:

1. **Language toggle** in navbar
2. **URL parameter** (future): Add `?lang=en` to force English
3. **Browser language detection** (future): Auto-detect user's language

### Adding a New Language

1. Add new `data-xx` attributes to HTML elements
   ```html
   <h1 data-nl="..." data-en="..." data-fr="...">...</h1>
   ```

2. Update `setLang()` function in `main.js` to handle new language code

3. Test language switching in navbar

---

## 📱 Responsive Breakpoints

- **Desktop**: 1280px+ (full grid, all features)
- **Tablet**: 768px-1024px (2-column grid, simplified nav)
- **Mobile**: <768px (1-column grid, hidden nav links)
- **Small Mobile**: <480px (extra spacing adjustments)

---

## 🔧 Customization

### Change Logo

Replace `assets/images/logo.svg` with your logo. The CSS automatically filters it white for the dark navbar.

### Update Colors

Edit CSS variables in `styles.css`:
```css
:root {
  --accent: #C8102E;  /* Change to your brand color */
  /* ... */
}
```

### Add Sections

1. Add HTML in `index.html`
2. Add CSS in `styles.css` (use existing classes or create new ones)
3. Add JS in `main.js` if needed (forms, animations, etc.)

---

## 🐛 Troubleshooting

### Video Not Playing
- Check browser autoplay permissions (some browsers block by default)
- Ensure video files exist at `assets/videos/` path
- Open browser DevTools (F12) and check Console for errors

### Translations Not Showing
- Ensure internet connection (MyMemory API requires fetch)
- Check browser Console for network errors
- Verify `data-translate` attributes are present

### Form Not Submitting
- Check that `handleSubmit()` is called on form submit
- Verify form inputs have correct `name` attributes
- Note: Current form shows toast but doesn't send data (needs backend)

### Mobile Layout Broken
- Check viewport meta tag in `<head>` (should be present)
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

## 📧 Contact Form

Current implementation shows a success toast but **does NOT send data**.

To enable backend processing:

### Option A: Formspree (Recommended, Free)
```javascript
// In handleSubmit(), add:
const formData = new FormData(e.target);
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData
});
```

### Option B: SendGrid / Mailgun
Use their APIs to send email notifications.

### Option C: Backend (Node.js)
Build your own backend to handle form submissions.

---

## 🚦 SEO Optimization

Current optimizations:
- ✅ Semantic HTML (`<section>`, `<header>`, `<nav>`, etc.)
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Meta tags (title, viewport, charset)
- ✅ Fast load time (optimized video, CSS)

### To Improve Further:
1. Add `<meta name="description">` to `<head>`
2. Add Open Graph tags for social sharing
3. Add `robots.txt` and `sitemap.xml`
4. Set up Google Search Console

---

## 📦 Build for Production

### Minify CSS & JS
```bash
# Using terser (JS) and cssnano (CSS)
npm install -g terser cssnano-cli

terser main.js -o main.min.js
cssnano styles.css -o styles.min.css
```

Then update `index.html` to reference `.min` files.

### Compress Images & Video
```bash
# Video: Use HandBrake or FFmpeg for better compression
ffmpeg -i sparkle-line-4k.mp4 -c:v libvpx-vp9 -crf 30 sparkle-line-2k.webm
```

---

## 📄 License

© 2025 Bleys Consultancy. All rights reserved.

---

## 🤝 Support

For questions or issues:
- Email: contact@bleysconsultancy.com
- LinkedIn: [Bleys Consultancy](https://linkedin.com)

---

**Last Updated**: May 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
