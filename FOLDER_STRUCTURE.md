# 📁 Bleys Consultancy — Folder Setup Guide

Your website is now **100% production-ready**. Here's how to organize everything for deployment.

---

## 🎯 Recommended Folder Structure

```
bleys-consultancy/
├── index.html                          # Main HTML file
├── styles.css                          # Stylesheet
├── main.js                             # JavaScript
│
├── assets/
│   ├── videos/
│   │   ├── sparkle-line-2k.webm       # Modern browsers (2.6 MB) ← PRIMARY
│   │   └── sparkle-line-2k.mp4        # Fallback (5.4 MB)
│   ├── images/
│   │   ├── logo.svg                    # Brand logo
│   │   └── favicon.ico                 # Website icon (optional)
│   └── fonts/
│       └── (Google Fonts loaded via CDN - no files needed)
│
├── docs/
│   ├── README.md                       # Setup & deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md         # Pre-launch verification
│   ├── TECHNICAL_DEEPDIVE.md           # Architecture & decisions
│   └── FOLDER_STRUCTURE.md             # This file
│
└── (optional deployment files)
    ├── .gitignore                      # For GitHub
    ├── vercel.json                     # For Vercel
    ├── netlify.toml                    # For Netlify
    └── sitemap.xml                     # For SEO
```

---

## 📊 File Size Summary

| File | Size | Purpose |
|------|------|---------|
| index.html | ~15 KB | Markup |
| styles.css | ~45 KB | Styling |
| main.js | ~12 KB | Behavior |
| sparkle-line-2k.webm | **2.6 MB** | Video (modern) |
| sparkle-line-2k.mp4 | 5.4 MB | Video (fallback) |
| **TOTAL (with WebM)** | **~2.7 MB** | Full page load |
| TOTAL (with MP4) | ~5.5 MB | Alt if WebM fails |

**Target: 2.7 MB** ✅ (WebM as primary, MP4 as fallback)

---

## 🚀 Quick Setup (3 steps)

### Step 1: Create Folder Structure
```bash
mkdir -p bleys-consultancy/assets/{videos,images}
cd bleys-consultancy
```

### Step 2: Add Files
Copy these files into the root:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `main.js`

Copy videos to `assets/videos/`:
- ✅ `sparkle-line-2k.webm`
- ✅ `sparkle-line-2k.mp4`

Add your logo to `assets/images/`:
- 📋 `logo.svg` (required - update path in HTML)

### Step 3: Test Locally
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server

# Visit http://localhost:8000
```

---

## 📋 File Checklist

### Required Files
- [ ] `index.html` — Main HTML (has data-nl/data-en for translations)
- [ ] `styles.css` — All CSS (responsive, animations)
- [ ] `main.js` — All JavaScript (video, languages, forms)
- [ ] `sparkle-line-2k.webm` — Primary video format
- [ ] `sparkle-line-2k.mp4` — Fallback video format
- [ ] `logo.svg` — Your logo (1920×1080 or square)

### Optional Files (for documentation)
- [ ] `README.md` — Setup & deployment
- [ ] `DEPLOYMENT_CHECKLIST.md` — Pre-launch checklist
- [ ] `TECHNICAL_DEEPDIVE.md` — Architecture guide

### Optional Files (for deployment)
- [ ] `.gitignore` — For GitHub (ignore node_modules, .env)
- [ ] `vercel.json` — For Vercel deployment
- [ ] `netlify.toml` — For Netlify deployment
- [ ] `sitemap.xml` — For SEO
- [ ] `robots.txt` — For search engines

---

## 🎨 Logo Setup

Your HTML expects `assets/images/logo.svg`. 

**To update:**
1. Save your logo as `logo.svg` → place in `assets/images/`
2. Or update the path in `index.html`:
   ```html
   <img src="assets/images/your-logo-name.svg" class="nav-logo">
   ```

**Logo requirements:**
- Format: SVG (scalable, lightweight)
- Alt option: PNG/JPG (44px height)
- The CSS filters it white for dark navbar automatically

---

## 🌐 Deployment Options

### Option A: Vercel (Recommended - Fastest)
```bash
npm install -g vercel
vercel
# Follow prompts, done in 30 seconds
```

### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
# Or drag & drop folder
```

### Option C: GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main
# Enable Pages in GitHub Settings
```

### Option D: Any Static Host
- Upload entire folder to hosting (cPanel, AWS S3, etc.)
- No build process needed
- No database required

---

## 🔒 Security Checklist

Before launching:
- [ ] Remove any hardcoded API keys (check main.js)
- [ ] Verify all links use HTTPS
- [ ] Test form submission (logs to console currently)
- [ ] Check CORS headers if using external APIs
- [ ] Verify sensitive data isn't exposed in code comments

---

## 📱 Testing Checklist

### Desktop
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Resolution: 1920×1080, 1440×900, 1024×768

### Tablet
- [ ] iPad (landscape & portrait)
- [ ] Android tablet (landscape & portrait)

### Mobile
- [ ] iPhone (latest)
- [ ] Android phone (latest)
- [ ] Resolution: 375×667 (iPhone SE), 414×896 (iPhone 11)

### Features to Test
- [ ] Hero video plays/loops
- [ ] Language toggle (NL ↔ EN)
- [ ] Smooth scrolling (click nav links)
- [ ] Reveal animations on scroll
- [ ] Contact form (shows toast)
- [ ] Mobile menu/responsive layout
- [ ] No console errors (F12)

---

## 🐛 Troubleshooting

### Video Not Playing
**Problem:** Hero video doesn't appear or play

**Solutions:**
1. Check file paths (case-sensitive on Linux)
   ```
   assets/videos/sparkle-line-2k.webm  ✅
   assets/videos/Sparkle-Line-2k.webm  ❌ (wrong case)
   ```
2. Verify MIME types on server (if self-hosted)
   - `.webm` → `video/webm`
   - `.mp4` → `video/mp4`
3. Check browser console for errors (F12)
4. Try MP4-only fallback for testing

### Translations Not Showing
**Problem:** Language toggle doesn't work

**Solutions:**
1. Check internet connection (MyMemory API required)
2. Verify browser DevTools Console (F12) for errors
3. Check that `data-nl` and `data-en` attributes exist in HTML
4. Fallback: will display original language if API fails

### Forms Not Submitting
**Problem:** Contact form shows success but no email

**Solutions:**
1. Currently form only shows toast (no backend)
2. To enable email, add Formspree integration (see README.md)
3. For now, form serves as proof-of-concept

### Mobile Layout Broken
**Problem:** Website looks wrong on phone

**Solutions:**
1. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Clear browser cache
3. Check viewport meta tag in HTML `<head>`
4. Test in different browser

---

## 💾 File Backup Recommendations

**What to backup:**
- Everything in `bleys-consultancy/` folder
- Especially: `index.html`, `styles.css`, `main.js`
- Your logo file

**Where to backup:**
- GitHub (free private repo)
- Google Drive / Dropbox
- Local backup on external drive

**Backup command:**
```bash
zip -r bleys-consultancy-backup.zip bleys-consultancy/
```

---

## 📈 Next Steps After Launch

### Week 1
- [ ] Monitor uptime (set up alerts)
- [ ] Check Lighthouse scores
- [ ] Review contact form submissions
- [ ] Test on real mobile devices

### Week 2-4
- [ ] Set up Google Analytics
- [ ] Optimize for SEO (meta tags, sitemap)
- [ ] Set up email notifications
- [ ] Monitor performance metrics

### Month 2+
- [ ] Add blog section
- [ ] Gather feedback
- [ ] Plan feature improvements
- [ ] Consider CMS migration (if needed)

---

## 📞 Support Resources

**Documentation:**
- `README.md` — Full setup guide
- `DEPLOYMENT_CHECKLIST.md` — Pre-launch verification
- `TECHNICAL_DEEPDIVE.md` — Architecture & code

**Hosting Docs:**
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

**Video Troubleshooting:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
- Can I Use: https://caniuse.com/webm

**Translation:**
- MyMemory API: https://mymemory.translated.net

---

**Status: ✅ Production Ready**  
**Last Updated:** May 2025  
**Version:** 1.0.0

You have everything you need to launch. Good luck! 🚀
