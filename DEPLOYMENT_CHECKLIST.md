# 🚀 DEPLOYMENT CHECKLIST — Bleys Consultancy Website

Use this checklist before launching to production.

---

## 📋 Pre-Launch Checklist

### Content & Messaging
- [ ] All text is accurate and proofread (Dutch + English)
- [ ] Logo is correct and displays properly (check navbar)
- [ ] Contact email/form destination is configured
- [ ] LinkedIn URL is updated (check footer link)
- [ ] Brand colors match your guidelines
- [ ] Video is looping smoothly with no audio issues

### Functionality
- [ ] All navigation links work (smooth scroll to sections)
- [ ] Language toggle switches between NL/EN correctly
- [ ] Contact form displays success toast on submit
- [ ] Mobile menu/layout works on phone/tablet
- [ ] Video plays/pauses correctly on hero
- [ ] No console errors in DevTools

### Performance
- [ ] Lighthouse Performance score: 85+
- [ ] Page load time: < 3 seconds
- [ ] Video file size: < 8 MB combined
- [ ] CSS file size: < 50 KB
- [ ] JS file size: < 30 KB

### Responsive Design
- [ ] Desktop (1280px+): All grid layouts visible, no overflow
- [ ] Tablet (768px): Content reflows correctly, readable
- [ ] Mobile (375px): Touch-friendly buttons, proper spacing
- [ ] iPhone/Android: Tested on real device if possible

### SEO & Metadata
- [ ] Title tag updated: "Bleys Consultancy — Innovatiemanagement"
- [ ] Meta description added (50-160 chars)
- [ ] Mobile viewport meta tag present
- [ ] All links have meaningful anchor text (avoid "click here")
- [ ] Images have alt text (if any)

### Security & Privacy
- [ ] No API keys or secrets in code (check main.js)
- [ ] External URLs use HTTPS
- [ ] Form data privacy policy linked (if required)
- [ ] No personal info exposed in code comments

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, desktop + mobile)
- [ ] Mobile browsers (Chrome Mobile, Safari iOS)

---

## 🔧 FINAL SETUP STEPS

### Step 1: Replace Placeholder Video

Your video is currently referenced as:
```html
<source src="assets/videos/sparkle-line-2k.webm" type="video/webm">
<source src="assets/videos/sparkle-line-2k.mp4" type="video/mp4">
```

**What you need to do:**
1. Export/convert your video to 2K resolution (1920x1080)
2. Create two formats:
   - **WebM format** (better compression, modern browsers)
   - **MP4 format** (fallback for older browsers)
3. Place both files in `assets/videos/`
4. Ensure combined file size is < 8 MB

**Recommended tools:**
- FFmpeg: `ffmpeg -i input.mp4 -vf scale=1920:1080 output.webm`
- HandBrake: GUI tool for video compression

### Step 2: Add Contact Form Backend

Currently, the form shows a success message but doesn't send data.

**Option A: Use Formspree (Fastest)**
1. Go to https://formspree.io
2. Sign up and create a form
3. Replace the form action in `main.js`:

```javascript
// In handleSubmit() function, add this:
const form = e.target;
const formData = new FormData(form);

try {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  
  if (response.ok) {
    console.log('Form submitted successfully');
    // Show toast (already done)
  }
} catch (error) {
  console.error('Form submission error:', error);
}
```

**Option B: Use Firebase**
- Set up Firebase project
- Create Firestore database
- Add document on form submit
- (More setup required, but more control)

### Step 3: Set Up Email Notifications (Optional)

If using Formspree, emails go to your registered email automatically.

If using Firebase or custom backend, set up email via:
- SendGrid (free tier: 40K emails/month)
- Mailgun (free tier: 5K emails/month)
- AWS SES (very cheap)

### Step 4: Add Analytics (Optional)

Add Google Analytics or Plausible to track visitors:

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Step 5: Choose Hosting & Deploy

**Recommended: Vercel (Fastest setup)**
```bash
npm install -g vercel
vercel
# Follow prompts, connect GitHub repo (optional)
# Site goes live immediately
```

**Alternative: Netlify**
```bash
netlify deploy --prod
# Or drag & drop folder into Netlify dashboard
```

**Alternative: GitHub Pages (Free)**
- Push to GitHub repo
- Enable Pages in repo settings
- Free HTTPS certificate included

---

## 🌐 DOMAIN & SSL

Once deployed, connect your domain:

### Step 1: Buy Domain
- Namecheap, GoDaddy, Google Domains, Vercel, etc.
- Recommendation: Buy through Vercel for 1-click setup

### Step 2: Point Domain to Hosting
- If Vercel: Add domain in project settings → Domains
- If Netlify: Add domain in Site Settings → Domain Management
- If GitHub Pages: Create CNAME file in repo root

### Step 3: SSL Certificate
- **Vercel**: Automatic (free)
- **Netlify**: Automatic (free)
- **Custom hosting**: Use Let's Encrypt (free)

---

## 📊 PERFORMANCE AUDIT (Post-Launch)

Run weekly audits to maintain quality:

### Lighthouse (Free, Built into Chrome)
1. Open DevTools (F12) → Lighthouse
2. Generate report
3. Target: Performance 85+, Accessibility 95+

### PageSpeed Insights
1. Go to https://pagespeed.web.dev
2. Enter your URL
3. Check for improvements

### WebPageTest (Free)
1. Go to https://webpagetest.org
2. Run test from different locations
3. Compare load times

---

## 🐛 TROUBLESHOOTING POST-LAUNCH

### Video Not Loading
- Check file size (should be < 8 MB combined)
- Verify MIME types on server (`.webm`, `.mp4`)
- Check browser DevTools Network tab for 404/403 errors

### Form Not Submitting
- Check console for JavaScript errors
- Verify Formspree form ID is correct (if using)
- Check network request in DevTools Network tab

### Slow Load Time
- Run Lighthouse audit
- Compress video further
- Enable GZIP compression on server
- Use CDN for video (Cloudflare, Fastly)

### Translations Not Working
- Check internet connection (API fallback needed)
- Verify MyMemory API is accessible: https://api.mymemory.translated.net
- Clear browser cache and reload

---

## 📝 LAUNCH ANNOUNCEMENT

Once deployed, announce via:

1. **LinkedIn**: Post about new website launch
2. **Email**: Send to contacts with link
3. **Social Media**: Share on relevant platforms
4. **Portfolio**: Link from your personal site

**Sample post:**
> 🚀 Excited to launch Bleys Consultancy website!
> 
> Helping Dutch scale-ups with innovation strategy, portfolio management, and process design.
> 
> Check it out: [link]
> 
> #Innovation #Consulting #Strategy

---

## 📅 MAINTENANCE SCHEDULE

### Weekly
- [ ] Check website is accessible
- [ ] Verify form submissions are coming through
- [ ] Monitor server uptime (if self-hosted)

### Monthly
- [ ] Run Lighthouse audit
- [ ] Check analytics (if enabled)
- [ ] Review contact form submissions
- [ ] Update content if needed

### Quarterly
- [ ] Security audit (check for vulnerabilities)
- [ ] Update Google Search Console
- [ ] Analyze user behavior / traffic patterns

---

## 💡 NEXT STEPS (Future Enhancements)

Once launched, consider:

1. **CMS Integration**: Move content to Contentful or Strapi
2. **Blog**: Add a blog section with articles
3. **Case Studies**: Showcase client success stories
4. **Testimonials**: Add customer quotes/videos
5. **Newsletter**: Add email signup form
6. **Team Page**: Add bios of team members
7. **FAQ**: Add frequently asked questions section
8. **Dark Mode**: Add theme toggle (CSS-only)

---

## ✅ FINAL SIGN-OFF

- [ ] All checklist items completed
- [ ] Website tested on desktop + mobile
- [ ] Content proofread (NL + EN)
- [ ] Performance metrics verified
- [ ] Form backend configured
- [ ] Analytics tracking setup
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Ready to launch! 🎉

---

**Launch Date**: _______________

**Launched By**: _______________

**Notes/Issues**: _______________________________________________

---

**Questions?** Refer to README.md or check the website code comments.
