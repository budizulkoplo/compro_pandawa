# 🔍 SEO Implementation - PT. Sinergy Garda Pratama

## Overview

Panduan lengkap implementasi SEO untuk memastikan website mudah ditemukan di search engine.

---

## 🎯 SEO Strategy

### Goals
- Ranking tinggi untuk keywords: "jasa keamanan", "security services", "pengelolaan parkir"
- Local SEO untuk area Jakarta & sekitarnya
- Professional company image
- High domain authority

### Target Keywords
- Primary: "jasa keamanan", "security services", "outsourcing tenaga kerja"
- Secondary: "pengelolaan parkir", "security guard", "satpam profesional"
- Long-tail: "jasa keamanan Jakarta", "perusahaan security terpercaya"

---

## 📄 Per-Page SEO Implementation

### Homepage (`/`)

**Title:**
```html
<title>PT. Sinergy Garda Pratama - Jasa Keamanan & Security Services Terpercaya</title>
```

**Meta Description:**
```html
<meta name="description" content="PT. Sinergy Garda Pratama menyediakan jasa keamanan, pengelolaan parkir, dan outsourcing tenaga kerja profesional. Hubungi kami untuk solusi security terbaik." />
```

**Meta Keywords:**
```html
<meta name="keywords" content="jasa keamanan, security services, pengelolaan parkir, outsourcing, satpam, security guard Jakarta" />
```

**Implementation:**
```tsx
// resources/js/pages/home.tsx
import { Head } from '@inertiajs/react';

export default function Home({ companySettings }) {
    return (
        <>
            <Head>
                <title>{companySettings.meta_title}</title>
                <meta name="description" content={companySettings.meta_description} />
                <meta name="keywords" content={companySettings.meta_keywords} />
            </Head>
            {/* Page content */}
        </>
    );
}
```

---

### About Page (`/about`)

**Title:**
```html
<title>Tentang Kami - PT. Sinergy Garda Pratama | Perusahaan Security Terpercaya</title>
```

**Meta Description:**
```html
<meta name="description" content="Kenali lebih dekat PT. Sinergy Garda Pratama, perusahaan jasa keamanan yang telah dipercaya sejak tahun 2010. Visi, misi, dan profil perusahaan kami." />
```

**Implementation:**
```tsx
// resources/js/pages/about.tsx
export default function About({ about, companySettings }) {
    const title = about.meta_title || `Tentang Kami | ${companySettings.company_name}`;
    const description = about.meta_description || companySettings.meta_description;
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={about.meta_keywords} />
            </Head>
            {/* Page content */}
        </>
    );
}
```

---

### Services Pages

#### Services Index (`/services`)

**Title:**
```html
<title>Layanan Kami - PT. Sinergy Garda Pratama | Jasa Keamanan & Security</title>
```

**Meta Description:**
```html
<meta name="description" content="Jelajahi layanan profesional PT. Sinergy Garda Pratama: Jasa Keamanan, Pengelolaan Parkir, dan Outsourcing Tenaga Kerja. Solusi terpercaya untuk kebutuhan bisnis Anda." />
```

#### Service Detail (`/services/{slug}`)

**Title:**
```html
<title>Jasa Keamanan - PT. Sinergy Garda Pratama</title>
```

**Meta Description:**
```html
<meta name="description" content="Layanan jasa keamanan profesional dari PT. Sinergy Garda Pratama. Security guard berpengalaman untuk melindungi aset dan properti Anda." />
```

**Implementation:**
```tsx
// resources/js/pages/services/show.tsx
export default function ServiceShow({ service, companySettings }) {
    const title = service.metaTitle || `${service.title} | ${companySettings.company_name}`;
    const description = service.metaDescription || service.description;
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={service.metaKeywords} />
            </Head>
            {/* Page content */}
        </>
    );
}
```

---

### Gallery Pages

**Gallery Index:**
```html
<title>Galeri - PT. Sinergy Garda Pratama | Dokumentasi Layanan Kami</title>
<meta name="description" content="Lihat dokumentasi visual layanan PT. Sinergy Garda Pratama. Galeri foto kegiatan keamanan, pengelolaan parkir, dan outsourcing." />
```

**Gallery Category:**
```html
<title>Security Services - Galeri PT. Sinergy Garda Pratama</title>
<meta name="description" content="Dokumentasi layanan security services PT. Sinergy Garda Pratama. Lihat foto-foto tim security profesional kami dalam aksi." />
```

---

### Clients Page

**Title:**
```html
<title>Klien Kami - PT. Sinergy Garda Pratama | Dipercaya Berbagai Perusahaan</title>
```

**Meta Description:**
```html
<meta name="description" content="PT. Sinergy Garda Pratama telah dipercaya oleh berbagai perusahaan ternama di Indonesia. Lihat portfolio klien kami dari berbagai sektor industri." />
```

---

### Contact Page

**Title:**
```html
<title>Hubungi Kami - PT. Sinergy Garda Pratama | Konsultasi Gratis</title>
```

**Meta Description:**
```html
<meta name="description" content="Hubungi PT. Sinergy Garda Pratama untuk konsultasi gratis layanan keamanan. Telepon, email, atau kunjungi kantor kami di Jakarta." />
```

---

## 🏗️ Technical SEO

### 1. Semantic HTML

**Proper Heading Hierarchy:**
```tsx
<main>
    <h1>Main Page Title</h1>  {/* Only ONE H1 per page */}
    <section>
        <h2>Section Heading</h2>
        <article>
            <h3>Article Heading</h3>
            <p>Content...</p>
        </article>
    </section>
</main>
```

**Semantic Elements:**
```tsx
<header>Navigation</header>
<nav>Menu links</nav>
<main>Main content</main>
<article>Blog post or content block</article>
<section>Thematic grouping</section>
<aside>Sidebar</aside>
<footer>Footer content</footer>
```

---

### 2. Image Optimization

**Alt Text:**
```tsx
<img 
    src="security-guard.jpg"
    alt="Security guard profesional PT. Sinergy Garda Pratama sedang berpatroli"
    loading="lazy"
/>
```

**Alt Text Best Practices:**
- Descriptive (what is in the image)
- Include keywords naturally
- Max 125 characters
- Don't start with "Image of" or "Picture of"

**Examples:**
```tsx
// Good
<img alt="Tim security SIGAP mengamankan gedung perkantoran" />

// Bad
<img alt="image.jpg" />
<img alt="" />
```

---

### 3. Internal Linking

**Link to Related Pages:**
```tsx
<p>
    Kami menyediakan 
    <Link href="/services/jasa-keamanan">jasa keamanan profesional</Link> 
    untuk berbagai kebutuhan bisnis Anda.
</p>
```

**Anchor Text Best Practices:**
- Use descriptive text
- Include keywords
- Avoid generic "click here"

```tsx
// Good
<Link href="/contact">Hubungi kami untuk konsultasi gratis</Link>

// Bad
<Link href="/contact">Klik di sini</Link>
```

---

### 4. Structured Data (Schema.org)

**Organization Schema:**
```tsx
// resources/js/layouts/main-layout.tsx
<Head>
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PT. Sinergy Garda Pratama",
            "url": "https://yourdomain.com",
            "logo": "https://yourdomain.com/images/logo.png",
            "description": "Perusahaan jasa keamanan, pengelolaan parkir, dan outsourcing terpercaya",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Example No. 123",
                "addressLocality": "Jakarta",
                "addressRegion": "DKI Jakarta",
                "postalCode": "12345",
                "addressCountry": "ID"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-21-1234567",
                "contactType": "customer service",
                "areaServed": "ID",
                "availableLanguage": "Indonesian"
            },
            "sameAs": [
                "https://facebook.com/sigap",
                "https://instagram.com/sigap",
                "https://linkedin.com/company/sigap"
            ]
        })}
    </script>
</Head>
```

**Service Schema:**
```tsx
// resources/js/pages/services/show.tsx
<Head>
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": service.title,
            "provider": {
                "@type": "Organization",
                "name": "PT. Sinergy Garda Pratama"
            },
            "description": service.description,
            "areaServed": {
                "@type": "Place",
                "name": "Indonesia"
            }
        })}
    </script>
</Head>
```

**Breadcrumb Schema:**
```tsx
<script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://yourdomain.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://yourdomain.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": service.title,
                "item": `https://yourdomain.com/services/${service.slug}`
            }
        ]
    })}
</script>
```

---

### 5. Open Graph Tags (Social Media)

```tsx
// For each page
<Head>
    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://yourdomain.com/images/og-image.jpg" />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:site_name" content="PT. Sinergy Garda Pratama" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://yourdomain.com/images/twitter-card.jpg" />
</Head>
```

---

### 6. Robots.txt

**File:** `public/robots.txt`

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin area
Disallow: /admin/
Disallow: /login
Disallow: /logout

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml
```

---

### 7. Sitemap.xml

Create sitemap generator:

```php
// routes/web.php
Route::get('/sitemap.xml', function () {
    $services = \App\Models\Service::active()->get();
    $clients = \App\Models\Client::where('is_active', true)->get();
    $categories = \App\Models\GalleryCategory::where('is_active', true)->get();
    
    return response()->view('sitemap', compact('services', 'clients', 'categories'))
        ->header('Content-Type', 'text/xml');
});
```

```xml
<!-- resources/views/sitemap.blade.php -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- About -->
    <url>
        <loc>{{ url('/about') }}</loc>
        <lastmod>{{ now()->toIso8601String() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Services -->
    @foreach($services as $service)
    <url>
        <loc>{{ url('/services/' . $service->slug) }}</loc>
        <lastmod>{{ $service->updated_at->toIso8601String() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    @endforeach
    
    <!-- Clients -->
    @foreach($clients as $client)
    <url>
        <loc>{{ url('/clients/' . $client->slug) }}</loc>
        <lastmod>{{ $client->updated_at->toIso8601String() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    @endforeach
    
    <!-- Gallery Categories -->
    @foreach($categories as $category)
    <url>
        <loc>{{ url('/gallery/' . $category->slug) }}</loc>
        <lastmod>{{ $category->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
    @endforeach
    
    <!-- Contact -->
    <url>
        <loc>{{ url('/contact') }}</loc>
        <lastmod>{{ now()->toIso8601String() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

---

## 📊 Local SEO

### Google My Business

**Optimize GMB Profile:**
- Company name: PT. Sinergy Garda Pratama
- Category: Security Guard Service
- Address: Complete address
- Phone: Click-to-call number
- Hours: Business hours
- Photos: Office, team, services
- Posts: Regular updates

### Local Citations

**Directory Listings:**
- Google Maps
- Yellow Pages Indonesia
- Indotrading
- Ralali
- Industry-specific directories

---

## 📈 Performance SEO

### 1. Page Speed Optimization

```bash
# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize Frontend
npm run build
```

### 2. Image Optimization

- Use WebP format
- Compress images (TinyPNG, ImageOptim)
- Serve responsive images
- Lazy loading

### 3. Core Web Vitals

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 🔗 Link Building Strategy

### Internal Links
- Link services from homepage
- Cross-link related services
- Link to contact from all pages
- Breadcrumb navigation

### External Links (Backlinks)
- Industry directories
- Client testimonials (with links)
- Press releases
- Social media profiles
- Partner websites

---

## 📚 Content SEO

### Content Strategy

**Blog Topics (Future):**
- "5 Tips Memilih Jasa Keamanan Terpercaya"
- "Pentingnya Sistem Parkir Profesional"
- "Keunggulan Outsourcing vs Karyawan Tetap"

**Content Guidelines:**
- Min 300 words per page
- Use keywords naturally (2-3% density)
- Include multimedia (images, videos)
- Update content regularly

---

## ✅ SEO Checklist

### On-Page SEO
- [ ] Unique title tag per page
- [ ] Meta description per page
- [ ] H1 tag (one per page)
- [ ] Proper heading hierarchy (H1-H6)
- [ ] Alt text on all images
- [ ] Internal linking
- [ ] URL structure (readable slugs)
- [ ] Mobile responsive
- [ ] Fast loading speed

### Technical SEO
- [ ] SSL certificate (HTTPS)
- [ ] Robots.txt
- [ ] Sitemap.xml
- [ ] Structured data (Schema.org)
- [ ] Canonical URLs
- [ ] 404 page
- [ ] No broken links

### Off-Page SEO
- [ ] Google My Business
- [ ] Social media profiles
- [ ] Directory listings
- [ ] Backlink building

---

## 🛠️ SEO Tools

### Free Tools
- Google Search Console
- Google Analytics
- Google PageSpeed Insights
- Mobile-Friendly Test
- Rich Results Test

### Paid Tools (Optional)
- SEMrush
- Ahrefs
- Moz Pro

---

## 📚 Next Documentation

- [Testing Guide](TESTING.md)
- [Design System](DESIGN_SYSTEM.md)

---

**Last Updated:** October 20, 2025
