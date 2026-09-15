# 🧪 Testing Guide - PT. Sinergy Garda Pratama

## Overview

Comprehensive testing checklist dan guidelines untuk memastikan website berfungsi dengan baik di semua environment.

---

## 📋 Testing Categories

1. [Installation Testing](#1-installation-testing)
2. [Visual/UI Testing](#2-visualui-testing)
3. [Functionality Testing](#3-functionality-testing)
4. [Admin Panel Testing](#4-admin-panel-testing)
5. [SEO Testing](#5-seo-testing)
6. [Performance Testing](#6-performance-testing)
7. [Security Testing](#7-security-testing)
8. [Cross-Browser Testing](#8-cross-browser-testing)
9. [Mobile Responsiveness](#9-mobile-responsiveness)

---

## 1. Installation Testing

### ✅ Fresh Installation
- [ ] Clone repository successfully
- [ ] `composer install` completes without errors
- [ ] `npm install` completes without errors
- [ ] `.env` configured properly
- [ ] Database created
- [ ] `php artisan key:generate` runs
- [ ] `php artisan migrate` successful
- [ ] `php artisan db:seed` successful
- [ ] `php artisan storage:link` creates symlink
- [ ] `npm run dev` starts successfully
- [ ] `php artisan serve` starts successfully

### ✅ Environment Configuration
- [ ] Database connection works
- [ ] Mail configuration correct
- [ ] APP_URL set properly
- [ ] File upload works
- [ ] Storage accessible

---

## 2. Visual/UI Testing

### ✅ Homepage
- [ ] Hero section displays correctly
- [ ] All images load properly
- [ ] Text is readable
- [ ] CTA buttons visible
- [ ] Sections properly spaced
- [ ] Footer displays correctly

### ✅ About Page
- [ ] Profile images display in grid
- [ ] Video player works (if present)
- [ ] Mission/Vision sections readable
- [ ] Certificates carousel functional
- [ ] Text formatting correct

### ✅ Services
- [ ] Services cards display properly
- [ ] Service detail page loads
- [ ] Images display correctly
- [ ] Content formatting correct

### ✅ Gallery
- [ ] Category cards display
- [ ] Gallery grid layout works
- [ ] Lightbox opens correctly
- [ ] Navigation arrows work
- [ ] Keyboard shortcuts work (←/→/Esc)
- [ ] Thumbnails load

### ✅ Clients
- [ ] Client cards display
- [ ] Filter buttons work
- [ ] Client detail page loads
- [ ] Project images display

### ✅ Contact
- [ ] Contact form displays
- [ ] Map displays correctly
- [ ] Company info cards visible
- [ ] WhatsApp button works

---

## 3. Functionality Testing

### ✅ Contact Form
**Test Case 1: Valid Submission**
- [ ] Fill all required fields
- [ ] Submit form
- [ ] Success message appears
- [ ] Form clears after submission
- [ ] Receives thank you email (check inbox)
- [ ] Admin receives notification email

**Test Case 2: Validation**
- [ ] Submit empty form → shows required errors
- [ ] Invalid email → shows email error
- [ ] Invalid phone → shows phone error

**Test Case 3: Email Delivery**
- [ ] User receives thank you email
- [ ] Admin receives notification email
- [ ] Emails have proper formatting
- [ ] Reply-to address is user email (for admin notification)

### ✅ WhatsApp Integration
- [ ] WhatsApp button visible on contact page
- [ ] Clicking opens WhatsApp (web/app)
- [ ] Pre-filled message correct
- [ ] Phone number correct (from .env)

### ✅ Gallery Lightbox
**Keyboard Shortcuts:**
- [ ] Left Arrow → Previous image
- [ ] Right Arrow → Next image
- [ ] Escape → Close lightbox
- [ ] First image → left arrow wraps to last
- [ ] Last image → right arrow wraps to first

**Mouse Controls:**
- [ ] Click image → opens lightbox
- [ ] Click outside → closes lightbox
- [ ] Navigation arrows visible
- [ ] Close button works

### ✅ Client Filtering
- [ ] "All" button shows all clients
- [ ] Each sector button filters correctly
- [ ] Active button has highlight style
- [ ] Filtered results are correct
- [ ] No results state (if applicable)

### ✅ Navigation
- [ ] All menu links work
- [ ] Active page highlighted
- [ ] Logo links to homepage
- [ ] Mobile menu toggle works
- [ ] Smooth scroll to sections (if applicable)

---

## 4. Admin Panel Testing

### ✅ Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials → error
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] Session persists correctly

### ✅ Dashboard
- [ ] Statistics cards show correct counts
- [ ] Recent messages display
- [ ] Quick action buttons work

### ✅ About Management
**CRUD Operations:**
- [ ] View current about content
- [ ] Update description
- [ ] Update vision
- [ ] Update mission
- [ ] Upload profile images (multiple)
- [ ] Delete profile images
- [ ] Upload profile video
- [ ] Delete profile video
- [ ] Update SEO fields
- [ ] Save successfully
- [ ] Changes reflect on public page

### ✅ Services Management
**Create:**
- [ ] Create new service form loads
- [ ] Fill all fields
- [ ] Upload image
- [ ] Rich text editor works
- [ ] Save successfully
- [ ] Appears in services list

**Read:**
- [ ] Services list displays all
- [ ] Search works
- [ ] Filter by status works
- [ ] Pagination works
- [ ] View single service

**Update:**
- [ ] Edit form pre-fills data
- [ ] Update fields
- [ ] Change image
- [ ] Save successfully
- [ ] Changes reflect on public page

**Delete:**
- [ ] Delete confirmation appears
- [ ] Delete successfully
- [ ] Removed from list
- [ ] Removed from public page

### ✅ Clients/Portfolio Management
**Same CRUD tests as Services:**
- [ ] Create new client
- [ ] Upload logo
- [ ] Upload multiple project images
- [ ] Edit client
- [ ] Delete client
- [ ] Changes reflect on public page

### ✅ Gallery Management
**Categories:**
- [ ] Create new category
- [ ] Edit category
- [ ] Delete category (with items check)
- [ ] Sort order works

**Items:**
- [ ] Upload multiple images
- [ ] Assign to category
- [ ] Edit item details
- [ ] Delete items
- [ ] Changes reflect on public page
- [ ] Lightbox shows new images

### ✅ Certificates Management
- [ ] Create certificate
- [ ] Upload certificate image
- [ ] Set issue date
- [ ] Set expiry date (optional)
- [ ] Edit certificate
- [ ] Delete certificate
- [ ] Appears in homepage carousel
- [ ] Appears in about page

### ✅ Messages
- [ ] New messages appear in list
- [ ] Unread badge displays
- [ ] Mark as read works
- [ ] View message detail
- [ ] Delete message
- [ ] Reply opens email client

### ✅ Company Settings
- [ ] Update company info
- [ ] Update contact details
- [ ] Update WhatsApp config
- [ ] Update social media links
- [ ] Update Google Maps
- [ ] Save successfully
- [ ] Changes reflect site-wide

### ✅ Media Library
- [ ] Browse uploaded files
- [ ] Upload new files
- [ ] Upload multiple files
- [ ] Search files
- [ ] Filter by folder
- [ ] Select file (returns path)
- [ ] Delete files

---

## 5. SEO Testing

### ✅ Meta Tags
**Check each page:**
- [ ] Homepage
- [ ] About
- [ ] Services Index
- [ ] Service Detail
- [ ] Gallery Index
- [ ] Gallery Category
- [ ] Clients Index
- [ ] Client Detail
- [ ] Contact

**For each page verify:**
- [ ] `<title>` tag present
- [ ] `<meta name="description">` present
- [ ] `<meta name="keywords">` present
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- [ ] Canonical URL set
- [ ] Robots meta tag appropriate

### ✅ Social Media Preview
**Test with:**
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

**Check:**
- [ ] Title displays correctly
- [ ] Description displays
- [ ] Image displays (1200x630px recommended)

### ✅ robots.txt
- [ ] `/robots.txt` exists
- [ ] Allows crawling of public pages
- [ ] Disallows crawling of admin pages
- [ ] Sitemap reference present (if implemented)

### ✅ Structured Data
If implemented:
- [ ] Organization schema
- [ ] Service schema
- [ ] Breadcrumbs schema
- [ ] Validate with Google's Rich Results Test

### ✅ Google Search Console
- [ ] Property verified
- [ ] Sitemap submitted (if present)
- [ ] No crawl errors
- [ ] Mobile usability OK

---

## 6. Performance Testing

### ✅ Google PageSpeed Insights
**Test URL:** https://pagespeed.web.dev/

**Homepage:**
- [ ] Performance score > 90 (Mobile)
- [ ] Performance score > 90 (Desktop)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

**Other pages:** Test 2-3 additional pages

### ✅ Core Web Vitals
- [ ] LCP (Largest Contentful Paint) - Good < 2.5s
- [ ] FID (First Input Delay) - Good < 100ms
- [ ] CLS (Cumulative Layout Shift) - Good < 0.1

### ✅ Image Optimization
- [ ] Images are WebP or optimized JPEG
- [ ] Images have proper dimensions
- [ ] Lazy loading implemented
- [ ] No oversized images

### ✅ Asset Optimization
- [ ] CSS minified in production
- [ ] JavaScript minified in production
- [ ] Vite build successful
- [ ] No console errors

### ✅ Caching
- [ ] Browser caching configured
- [ ] Static assets cached
- [ ] Appropriate cache headers

---

## 7. Security Testing

### ✅ Authentication
- [ ] Cannot access admin pages without login
- [ ] Logout works properly
- [ ] Session timeout appropriate
- [ ] Password requirements enforced

### ✅ CSRF Protection
- [ ] All forms have CSRF token
- [ ] Form submission without token fails
- [ ] Token validated on server

### ✅ Input Validation
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] SQL injection prevented (Eloquent)
- [ ] XSS prevented (Laravel escaping)

### ✅ File Upload Security
- [ ] Only allowed file types accepted
- [ ] File size limits enforced
- [ ] Uploaded files not executable
- [ ] Files stored securely

### ✅ HTTPS
- [ ] Site forces HTTPS in production
- [ ] Mixed content warnings absent
- [ ] SSL certificate valid

---

## 8. Cross-Browser Testing

### ✅ Desktop Browsers
**Chrome:**
- [ ] Layout correct
- [ ] Functionality works
- [ ] No console errors

**Firefox:**
- [ ] Layout correct
- [ ] Functionality works
- [ ] No console errors

**Safari:**
- [ ] Layout correct
- [ ] Functionality works
- [ ] No console errors

**Edge:**
- [ ] Layout correct
- [ ] Functionality works
- [ ] No console errors

### ✅ Common Issues to Check
- [ ] Flexbox/Grid layout compatibility
- [ ] CSS custom properties support
- [ ] JavaScript ES6+ features
- [ ] Fetch API
- [ ] LocalStorage

---

## 9. Mobile Responsiveness

### ✅ Breakpoints
Test at standard breakpoints:
- [ ] Mobile: 375px, 414px (iPhone)
- [ ] Tablet: 768px, 1024px (iPad)
- [ ] Desktop: 1280px, 1440px, 1920px

### ✅ Mobile Devices
**iOS:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 12/13/14 Pro Max (428px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

**Android:**
- [ ] Samsung Galaxy S20 (360px)
- [ ] Samsung Galaxy S20+ (384px)
- [ ] Pixel 5 (393px)

### ✅ Mobile-Specific Features
- [ ] Touch targets ≥ 44x44px
- [ ] Hamburger menu works
- [ ] No horizontal scroll
- [ ] Font sizes readable
- [ ] Forms easy to fill
- [ ] Buttons easy to tap
- [ ] Images scale properly
- [ ] Modal/lightbox works on mobile

### ✅ Orientation
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Layout adapts correctly

---

## 🛠️ Testing Tools

### Browser DevTools
```
Chrome DevTools → F12
- Elements: Inspect layout
- Console: Check for errors
- Network: Monitor requests
- Lighthouse: Performance audit
- Device Toolbar: Responsive testing
```

### Recommended Extensions
- **React Developer Tools**: Debug React components
- **Wappalyzer**: Identify technologies
- **Lighthouse**: SEO & Performance
- **ColorZilla**: Color picker
- **WhatFont**: Font identifier

### Online Tools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **BrowserStack**: https://www.browserstack.com/ (cross-browser)
- **Can I Use**: https://caniuse.com/ (feature support)
- **Responsive Checker**: https://responsivedesignchecker.com/

---

## 📝 Testing Checklist Template

```markdown
## Pre-Release Testing Checklist

**Date:** ___________
**Tester:** ___________
**Environment:** Development / Staging / Production

### Installation ✅
- [ ] Fresh install successful
- [ ] Migrations run
- [ ] Seeders run
- [ ] Assets compiled

### Public Pages ✅
- [ ] Homepage
- [ ] About
- [ ] Services
- [ ] Gallery
- [ ] Clients
- [ ] Contact

### Contact Form ✅
- [ ] Form submission works
- [ ] Validation works
- [ ] Emails sent (user + admin)

### Admin Panel ✅
- [ ] Login works
- [ ] About management
- [ ] Services CRUD
- [ ] Clients CRUD
- [ ] Gallery management
- [ ] Certificates CRUD
- [ ] Messages inbox
- [ ] Settings update

### SEO ✅
- [ ] Meta tags present
- [ ] Social media previews
- [ ] PageSpeed score > 90

### Mobile ✅
- [ ] Mobile layout correct
- [ ] Touch interactions work
- [ ] Forms usable on mobile

### Browsers ✅
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Security ✅
- [ ] Admin routes protected
- [ ] CSRF protection active
- [ ] Input validation works

### Performance ✅
- [ ] Page load < 3s
- [ ] Images optimized
- [ ] No console errors

**Notes:**
___________________________________________
___________________________________________

**Status:** ✅ Passed / ❌ Failed / ⚠️ Issues Found

```

---

## 🐛 Bug Reporting Template

```markdown
## Bug Report

**Date:** ___________
**Reporter:** ___________
**Environment:** Development / Staging / Production

### Bug Description
Clear description of the issue.

### Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior
What should happen.

### Actual Behavior
What actually happens.

### Screenshots
Attach screenshots if applicable.

### Environment Details
- Browser: Chrome 119
- OS: macOS 14
- Screen Size: 1920x1080
- Device: Desktop

### Additional Context
Any other relevant information.

### Priority
- [ ] Critical (site down)
- [ ] High (major feature broken)
- [ ] Medium (feature partially broken)
- [ ] Low (minor issue)

```

---

## 📚 Related Documentation

- [Setup Guide](SETUP_GUIDE.md) - Installation instructions
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues
- [Pages Public](PAGES_PUBLIC.md) - Public pages documentation
- [Pages Admin](PAGES_ADMIN.md) - Admin pages documentation

---

**Last Updated:** October 21, 2025
