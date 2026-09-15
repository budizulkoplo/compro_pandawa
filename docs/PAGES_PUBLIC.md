# 🌐 Public Pages - PT. Sinergy Garda Pratama

## Overview

Dokumentasi lengkap untuk semua halaman publik yang dapat diakses pengunjung website.

---

## 📄 List of Public Pages

1. [Homepage](#1-homepage)
2. [About Page](#2-about-page)
3. [Services Pages](#3-services-pages)
4. [Gallery Pages](#4-gallery-pages)
5. [Clients Pages](#5-clients-pages)
6. [Contact Page](#6-contact-page)

---

## 1. Homepage

**URL:** `/`  
**File:** `resources/js/pages/home.tsx`  
**Controller:** `app/Http/Controllers/HomeController.php`

### Purpose
Landing page utama yang menampilkan overview perusahaan dan layanan.

### Sections
1. **Hero Section**
   - Company tagline
   - Brief description
   - CTA buttons (Hubungi Kami, Lihat Layanan)
   - Client count display
   - Years of experience

2. **Services Section**
   - 4 featured services
   - Service cards dengan image, title, description
   - Link ke halaman services

3. **Clients Section**
   - Client logos showcase
   - Grid layout
   - Link ke halaman clients

4. **Gallery Section**
   - 6 latest photos
   - Preview grid
   - Link ke halaman gallery

5. **Certificates Carousel**
   - Company certificates
   - Autoplay slider
   - Certificate details

### Data Props
```typescript
interface HomePageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];      // 4 services
    clientCount: number;
    clientLogos: Client[];
    miniGallery: GalleryItem[];       // 6 items
    certificates: Certificate[];
}
```

### SEO
- Title: Company name + tagline
- Description: Company description
- Keywords: Main services keywords
- Open Graph tags
- Twitter Card tags

### Features
- Responsive design
- Lazy loading images
- Smooth scroll animations
- WhatsApp floating button

---

## 2. About Page

**URL:** `/about`  
**File:** `resources/js/pages/about.tsx`  
**Controller:** `app/Http/Controllers/AboutController.php`

### Purpose
Menampilkan informasi lengkap tentang perusahaan.

### Sections
1. **About Hero Section**
   - Company description (HTML content)
   - Rich text with prose styling

2. **Mission & Vision Section**
   - Side-by-side cards (desktop)
   - Stacked cards (mobile)
   - HTML content support
   - Icon indicators

3. **Profile Section**
   - Multiple profile images
   - Video embed (YouTube/Vimeo)
   - Or video file upload
   - Grid layout

4. **Certificates Carousel**
   - Company certificates & awards
   - Autoplay slider

### Data Props
```typescript
interface AboutPageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
    about: AboutUs;
    certificates: Certificate[];
}
```

### Content Structure (AboutUs Model)
```typescript
interface AboutUs {
    id: number;
    description: string;           // HTML
    vision: string;                // HTML
    mission: string;               // HTML
    profile_images: string[];      // Array of image paths
    profile_video_url?: string;    // YouTube URL or file path
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}
```

### SEO
- Title: Custom or "Tentang Kami | Company Name"
- Description: Custom or company description
- Keywords: Custom keywords
- Canonical URL

---

## 3. Services Pages

### 3.1 Services Index

**URL:** `/services`  
**File:** `resources/js/pages/services/index.tsx`  
**Controller:** `app/Http/Controllers/ServiceController.php@index`

#### Purpose
Menampilkan semua layanan yang tersedia.

#### Sections
1. **Services Hero Section**
   - Page title: "Layanan Kami"
   - Description
   
2. **Services List Section**
   - All active services
   - Grid layout (1-2-3 columns responsive)
   - Service cards dengan:
     - Image
     - Title
     - Short description
     - "Selengkapnya" button

#### Data Props
```typescript
interface ServicesPageProps {
    companySettings: CompanySetting;
    services: Service[];           // All active services
    featuredServices: Service[];   // For navigation
}
```

#### Features
- Sorted by `sortOrder`
- Only show active services
- Responsive grid
- Hover effects on cards

---

### 3.2 Service Detail

**URL:** `/services/{slug}`  
**File:** `resources/js/pages/services/show.tsx`  
**Controller:** `app/Http/Controllers/ServiceController.php@show`

#### Purpose
Menampilkan detail lengkap satu layanan.

#### Sections
1. **Service Detail Section**
   - Service image (full width)
   - Service title
   - Full content (HTML with prose styling)
   - Back to list button

#### Data Props
```typescript
interface ServiceShowPageProps {
    companySettings: CompanySetting;
    service: Service;
    featuredServices: Service[];
}
```

#### Service Model
```typescript
interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;              // HTML
    image: string;
    image_url: string;            // Full URL
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}
```

#### SEO
- Title: Custom meta title or "Service Title | Company Name"
- Description: Custom or service description
- Keywords: Custom keywords
- Breadcrumb navigation

---

## 4. Gallery Pages

### 4.1 Gallery Index (Categories)

**URL:** `/gallery`  
**File:** `resources/js/pages/gallery/index.tsx`  
**Controller:** `app/Http/Controllers/GalleryController.php@index`

#### Purpose
Menampilkan semua kategori gallery.

#### Sections
1. **Gallery Hero Section**
   - Page title: "Galeri Kami"
   - Description

2. **Gallery Categories Section**
   - Grid of categories
   - Category cards dengan:
     - Preview image (first item)
     - Category name
     - Photo count badge
     - Description
     - Link to category detail

#### Data Props
```typescript
interface GalleryIndexPageProps {
    companySettings: CompanySetting;
    categories: GalleryCategory[];
    featuredServices: Service[];
}
```

#### Features
- Preview first image from each category
- Photo count badge
- Responsive grid (1-2-3 columns)
- Empty state handling

---

### 4.2 Gallery Category Detail

**URL:** `/gallery/{slug}`  
**File:** `resources/js/pages/gallery/category.tsx`  
**Controller:** `app/Http/Controllers/GalleryController.php@category`

#### Purpose
Menampilkan semua foto dalam satu kategori dengan lightbox.

#### Sections
1. **Gallery Category Detail Section**
   - Category name & description
   - Grid of photos (2-3-4 columns)
   - Lightbox functionality

#### Data Props
```typescript
interface GalleryCategoryPageProps {
    companySettings: CompanySetting;
    category: GalleryCategory;
    featuredServices: Service[];
}

interface GalleryCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    items: GalleryItem[];
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}

interface GalleryItem {
    id: number;
    title: string;
    description?: string;
    image_path: string;
    image_url: string;
}
```

#### Features ⭐
- **Lightbox dengan keyboard navigation:**
  - Click image to open lightbox
  - Press `→` for next image
  - Press `←` for previous image
  - Press `ESC` to close
  - Click outside to close
- Previous/Next buttons
- Image counter (1/10, 2/10, etc.)
- Image title display
- Smooth transitions
- Lazy loading

---

## 5. Clients Pages

### 5.1 Clients Index

**URL:** `/clients`  
**File:** `resources/js/pages/clients/index.tsx`  
**Controller:** `app/Http/Controllers/ClientController.php@index`

#### Purpose
Menampilkan semua klien dengan filter berdasarkan sektor.

#### Sections
1. **Clients Hero Section**
   - Page title: "Klien Kami"
   - Description

2. **Clients List Section**
   - Filter buttons by sector
   - Grid of client cards
   - Client cards dengan:
     - Logo
     - Client name
     - Sector badge
     - Link to detail

#### Data Props
```typescript
interface ClientsIndexPageProps {
    companySettings: CompanySetting;
    clients: Client[];
    featuredServices: Service[];
}

interface Client {
    id: number;
    name: string;
    slug: string;
    sector: string;
    description?: string;
    logo_path: string;
    logo_url: string;
    images: string[];
    website_url?: string;
}
```

#### Features ⭐
- **Client-side filtering** (no page reload)
- Filter by sector
- Sector count badge (e.g., "Perbankan (5)")
- "Semua" button to show all
- Empty state when filter has no results
- Responsive grid (1-2-3-4 columns)

---

### 5.2 Client Detail

**URL:** `/clients/{slug}`  
**File:** `resources/js/pages/clients/show.tsx`  
**Controller:** `app/Http/Controllers/ClientController.php@show`

#### Purpose
Menampilkan detail lengkap satu klien.

#### Sections
1. **Client Detail Section**
   - Client logo
   - Client name
   - Sector badge
   - Website link (external)
   - Project images gallery
   - Full description (HTML)
   - Back to list button

#### Data Props
```typescript
interface ClientShowPageProps {
    companySettings: CompanySetting;
    client: Client;
    featuredServices: Service[];
}
```

#### Features
- Logo display
- Multiple project images
- External website link
- Rich HTML description
- Breadcrumb navigation

---

## 6. Contact Page

**URL:** `/contact`  
**File:** `resources/js/pages/contact/index.tsx`  
**Controller:** `app/Http/Controllers/ContactController.php`

### Purpose
Halaman kontak dengan form dan informasi kontak.

### Sections
1. **Contact Hero/Header**
   - Page title
   - Description

2. **Contact Form**
   - Name field
   - Email field
   - Phone field (optional)
   - Subject field
   - Message textarea
   - Submit button
   - Loading state
   - Success/Error messages

3. **Contact Information Cards**
   - Address card
   - Phone card (click-to-call)
   - Email card (click-to-email)
   - WhatsApp card (click-to-chat)
   - Operating hours card

4. **Social Media Links**
   - Facebook
   - Instagram
   - Twitter
   - LinkedIn
   - YouTube

5. **Google Maps Embed**
   - Interactive map
   - "Lihat di Google Maps" link

6. **WhatsApp Floating Button**
   - Fixed position
   - Pre-filled message
   - Opens WhatsApp

### Data Props
```typescript
interface ContactPageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
}
```

### Form Handling

#### Submit Action
**Route:** `POST /contact`  
**Controller:** `ContactController@store`

#### Request Data
```typescript
interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
```

#### Validation Rules
- `name`: required, string, max:255
- `email`: required, email
- `phone`: nullable, string, max:50
- `subject`: required, string, max:255
- `message`: required, string

#### Success Flow
1. Save to `messages` table
2. Send **Thank You email** to user
3. Send **New Message notification** to admin
4. Show success message
5. Reset form

#### Email Templates
1. **Thank You Email (to user)**
   - File: `resources/views/emails/user/thank-you.blade.php`
   - Subject: "Terima kasih atas pesan Anda"
   - Content: Confirmation + copy of message

2. **Admin Notification (to admin)**
   - File: `resources/views/emails/admin/new-message.blade.php`
   - Subject: "Pesan Baru dari Website"
   - Content: User details + full message

### Features ⭐
- **Dual email system**
- Client & server-side validation
- Click-to-call phone numbers
- Click-to-email addresses
- WhatsApp integration
- Google Maps embed
- Social media links
- Auto form reset after success
- Loading states
- Error handling

---

## 🎨 Common Design Patterns

### Layout
All pages use `MainLayout`:
```tsx
<MainLayout settings={companySettings} services={featuredServices}>
    {/* Page content */}
</MainLayout>
```

### SEO Pattern
```tsx
<Head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={pageKeywords} />
    
    {/* Open Graph */}
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={ogImage} />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    
    {/* Additional */}
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonicalUrl} />
</Head>
```

### Hero Section Pattern
```tsx
<section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
    <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold md:text-5xl">Page Title</h1>
        <p className="text-lg text-muted-foreground">Description</p>
    </div>
</section>
```

### Grid Pattern
```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {items.map(item => <Card key={item.id} />)}
</div>
```

---

## 📚 Related Documentation

- [Components Guide](COMPONENTS.md)
- [Routes Documentation](ROUTES.md)
- [SEO Implementation](SEO_IMPLEMENTATION.md)
- [Design System](DESIGN_SYSTEM.md)

---

**Last Updated:** October 21, 2025
