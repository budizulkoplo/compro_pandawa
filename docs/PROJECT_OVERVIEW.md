# 🎯 Project Overview - PT. Sinergy Garda Pratama

## Informasi Proyek

**Nama Proyek:** PT. Sinergy Garda Pratama - Company Profile Website  
**Tipe:** Full-Stack Web Application  
**Status:** ✅ Production Ready  
**Repository:** fadhly-git/compro_sigap  
**Branch:** develop  
**Last Updated:** October 20, 2025

---

## 🏢 Tentang Perusahaan

PT. Sinergy Garda Pratama (SIGAP) adalah perusahaan yang bergerak di bidang:
- **Jasa Keamanan (Security Services)**
- **Pengelolaan Parkir (Off-Street Parking Management)**
- **Penyedia Tenaga Kerja (Outsourcing)**

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 11
- **PHP Version:** 8.1+
- **Database:** MySQL
- **Authentication:** Laravel Fortify
- **Email:** Laravel Mail + SMTP

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Meta Framework:** Inertia.js
- **UI Library:** Shadcn UI (Radix UI primitives)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite

### Design Pattern
- **Frontend:** Atomic Design Pattern
  - Atoms (basic elements)
  - Molecules (combinations)
  - Organisms (complex components)
  - Sections (page sections)
  - Layouts (page templates)

---

## 📱 Fitur Utama

### Public Features
1. ✅ **Homepage**
   - Hero section dengan CTA
   - Services preview (4 layanan)
   - Client logos showcase
   - Gallery mini section
   - Certificates carousel

2. ✅ **About Page**
   - Company description
   - Mission & Vision
   - Profile images & video
   - Certificates

3. ✅ **Services Pages**
   - Services listing (grid layout)
   - Service detail pages
   - SEO optimized per service

4. ✅ **Gallery Pages**
   - Gallery categories
   - Gallery items dengan **lightbox**
   - Keyboard navigation (←/→/ESC)

5. ✅ **Clients Pages**
   - Clients listing
   - **Filter by sector** (client-side)
   - Client detail pages
   - Logo showcase

6. ✅ **Contact Page**
   - Contact form
   - **Dual email notifications:**
     - Thank you email ke user
     - New message notification ke admin
   - Google Maps integration
   - **WhatsApp floating button**
   - Click-to-call & click-to-email

### Admin Features
1. ✅ **Dashboard**
   - Statistics overview
   - Recent messages
   - Quick actions

2. ✅ **Content Management**
   - About Us management
   - Services CRUD
   - Clients/Portfolio CRUD
   - Gallery management
   - Certificates management

3. ✅ **Media Library**
   - Centralized media picker
   - Upload & browse files
   - Reusable across modules
   - Search & filter

4. ✅ **Settings**
   - Company information
   - WhatsApp integration
   - Google Maps
   - SEO defaults

---

## 🌟 Key Highlights

### Advanced Features ⭐
- **Lightbox Gallery** dengan keyboard navigation
- **Client-side Filtering** (no page reload)
- **Dual Email System** (user + admin)
- **WhatsApp Integration** dengan pre-filled message
- **Rich Text Editor** untuk HTML content
- **Media Library System** (centralized & reusable)
- **Multiple Upload Support** (images & video)
- **Certificates Carousel** dengan autoplay
- **SEO Optimized** (per-page meta tags)

### Performance
- Lazy loading images
- Client-side filtering (faster UX)
- Optimized queries dengan eager loading
- Code splitting ready
- Vite build optimization

### Security
- CSRF protection
- XSS protection
- SQL injection protection (Eloquent ORM)
- Mass assignment protection
- Authentication middleware
- Form validation (client & server)

---

## 📂 Project Structure

```
compro_sigap/
├── app/
│   ├── Http/Controllers/      # Controllers (public & admin)
│   ├── Models/                 # Eloquent models
│   ├── Mail/                   # Email templates
│   └── Providers/              # Service providers
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/        # React components (Atomic Design)
│   │   ├── layouts/           # Page layouts
│   │   ├── pages/             # Inertia pages
│   │   └── types/             # TypeScript types
│   └── views/
│       └── emails/            # Blade email templates
├── routes/
│   ├── public.php             # Public routes
│   └── web.php                # Admin routes
├── public/
│   ├── storage/               # Symlinked storage
│   └── build/                 # Vite build output
└── docs/                      # Documentation
```

---

## 🎨 Design System

### Color Palette (From Company Logo)
```css
--primary: #1E94D2        /* Medium-dark blue */
--secondary: #C1EBF7      /* Light cyan */
--accent: #21B6FC         /* Bright cyan */
--foreground: #00334E     /* Navy blue */
--background: #F3FCFF     /* Very light blue */
```

### Typography
- **Font:** Poppins (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, muted foreground

### Responsive Breakpoints
- **sm:** 640px (Small tablets)
- **md:** 768px (Tablets)
- **lg:** 1024px (Desktop)
- **xl:** 1280px (Large desktop)
- **2xl:** 1536px (Extra large)

---

## 📊 Database Models

1. **CompanySetting** - Company information & settings
2. **Service** - Services offered
3. **Client** - Client portfolio
4. **GalleryCategory** - Gallery categories
5. **GalleryItem** - Gallery photos
6. **Certificate** - Company certificates
7. **AboutUs** - About page content
8. **Message** - Contact form messages
9. **User** - Admin users

---

## 🔗 Quick Links

- **Homepage:** `/`
- **About:** `/about`
- **Services:** `/services`
- **Gallery:** `/gallery`
- **Clients:** `/clients`
- **Contact:** `/contact`
- **Admin Dashboard:** `/admin/dashboard`

---

## 📞 Contact Information

**Company:** PT. Sinergy Garda Pratama  
**Website:** demo-sigap.fadh.my.id  
**WhatsApp:** +62 811-2682-105  
**Email:** [company email]

---

## 📝 Next Documentation

- [Architecture Details](ARCHITECTURE.md)
- [Database Schema](DATABASE_SCHEMA.md)
- [Setup Guide](SETUP_GUIDE.md)
- [Components Guide](COMPONENTS.md)

---

**Created with ❤️ using Laravel + Inertia + React + TypeScript + Shadcn UI**
