# PT. Sinergy Garda Pratama - Company Profile

<div align="center">

![PT. Sinergy Garda Pratama](public/images/logo.png)

**Professional Security Services & Management Solutions**

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.0-9553E9?style=flat&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🏢 About the Project

Full-stack company profile website untuk **PT. Sinergy Garda Pratama (SIGAP)**, perusahaan yang bergerak di bidang:

- 🛡️ **Jasa Keamanan** (Security Services)
- 🅿️ **Pengelolaan Parkir** (Off-Street Parking Management)  
- 👥 **Penyedia Tenaga Kerja** (Outsourcing)

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
composer install
npm install

# 2. Setup environment
cp .env.example .env
php artisan key:generate

# 3. Database setup
php artisan migrate --seed

# 4. Create storage symlink
php artisan storage:link

# 5. Build assets & start server
npm run dev
php artisan serve
```

🌐 Visit: `http://localhost:8000`

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 11
- **Language:** PHP 8.1+
- **Database:** MySQL 8.0+
- **Authentication:** Laravel Fortify

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Meta Framework:** Inertia.js
- **UI Library:** Shadcn UI
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite

### Design Pattern
- **Frontend:** Atomic Design Pattern
- **Backend:** MVC Architecture

---

## ✨ Key Features

### Public Website
- ✅ Homepage dengan services, clients, gallery showcase
- ✅ About page (company info, vision, mission)
- ✅ Services pages (listing & detail)
- ✅ Gallery dengan **lightbox** & keyboard navigation
- ✅ Clients showcase dengan **client-side filter**
- ✅ Contact form dengan **dual email notifications**
- ✅ **WhatsApp floating button** integration
- ✅ Google Maps embed
- ✅ SEO optimized (per-page meta tags)
- ✅ Fully responsive design

### Admin Panel
- ✅ Dashboard dengan statistics
- ✅ Content management (About, Services, Clients)
- ✅ Gallery management (categories & items)
- ✅ Certificates management
- ✅ **Media library system** (centralized uploads)
- ✅ Messages inbox (contact form)
- ✅ Company settings
- ✅ Rich text editor
- ✅ SEO fields management

### Advanced Features ⭐
- ⭐ **Lightbox Gallery** dengan keyboard navigation (←/→/ESC)
- ⭐ **Client-side Filtering** (no page reload)
- ⭐ **Email System** (Thank You + Admin notification)
- ⭐ **Media Picker** (reusable upload system)
- ⭐ **Multiple Upload** support
- ⭐ **Certificates Carousel**
- ⭐ **Slug Auto-generation**

---

## 📚 Complete Documentation

Dokumentasi lengkap tersedia di folder **`/docs`**:

### 📖 Main Documentation
- **[docs/README.md](docs/README.md)** - Index dokumentasi lengkap
- **[docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md)** - Ringkasan proyek & tech stack
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arsitektur aplikasi & design pattern
- **[docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Schema database & relasi
- **[docs/ROUTES.md](docs/ROUTES.md)** - Daftar routes (public & admin)

### 🎨 Frontend Documentation
- **[docs/COMPONENTS.md](docs/COMPONENTS.md)** - Struktur komponen (Atomic Design)
- **[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Color palette, typography, styling
- **[docs/SEO_IMPLEMENTATION.md](docs/SEO_IMPLEMENTATION.md)** - SEO best practices

### 📄 Feature-Specific Documentation
- **[docs/SERVICES_PAGES.md](docs/SERVICES_PAGES.md)** - Halaman services
- **[docs/GALLERY_PAGES.md](docs/GALLERY_PAGES.md)** - Gallery dengan lightbox
- **[docs/CLIENTS_PAGES.md](docs/CLIENTS_PAGES.md)** - Clients dengan filter
- **[docs/CONTACT_PAGE.md](docs/CONTACT_PAGE.md)** - Contact & email system
- **[docs/ABOUT_PAGE.md](docs/ABOUT_PAGE.md)** - About page
- **[docs/MEDIA_PICKER_GUIDE.md](docs/MEDIA_PICKER_GUIDE.md)** - Media library system

### 🚀 Development Documentation
- **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Panduan instalasi & setup
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Panduan deployment production
- **[docs/TESTING.md](docs/TESTING.md)** - Testing guidelines
- **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues & solutions

---

## 📁 Project Structure

```
compro_sigap/
├── app/
│   ├── Http/Controllers/       # Controllers (public & admin)
│   ├── Models/                 # Eloquent models
│   └── Mail/                   # Email templates
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/        # React components (Atomic Design)
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── sections/
│   │   ├── layouts/           # Page layouts
│   │   ├── pages/             # Inertia pages
│   │   └── types/             # TypeScript types
│   └── views/                 # Blade templates (email, etc)
├── routes/
│   ├── public.php             # Public routes
│   └── web.php                # Admin routes
├── docs/                      # 📚 Complete documentation
└── public/
    └── storage/               # Symlinked storage
```

---

## 🔐 Default Admin Credentials

Setelah menjalankan seeder:

```
Email: admin@sigap.com
Password: password123
```

⚠️ **PENTING:** Ganti password ini setelah login pertama kali!

---

## 🌐 Public Routes

```
/                   → Homepage
/about              → About Us
/services           → Services listing
/services/{slug}    → Service detail
/gallery            → Gallery categories
/gallery/{slug}     → Gallery category detail
/clients            → Clients listing
/clients/{slug}     → Client detail
/contact            → Contact page
```

---

## 🔒 Admin Routes

```
/admin/dashboard                        → Dashboard
/admin/management-content/about         → About management
/admin/management-content/services      → Services CRUD
/admin/portofolio                       → Clients CRUD
/admin/gallery                          → Gallery management
/admin/certificates                     → Certificates management
/admin/media                            → Media library
/admin/messages                         → Contact messages
/admin/setting                          → Company settings
```

---

## 🗄️ Database Schema

**9 Main Tables:**
- `users` - Admin users
- `company_settings` - Company information
- `services` - Services offered
- `clients` - Client portfolio
- `gallery_categories` - Gallery categories
- `gallery_items` - Gallery photos
- `certificates` - Company certificates
- `about_us` - About page content
- `messages` - Contact form submissions

📖 Detail lengkap: [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)

---

## 🎨 Design System

### Color Palette
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

📖 Detail lengkap: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)

---

## 📧 Email Configuration

### Development (Mailtrap)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
```

### Production
```env
MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=ssl
```

📖 Panduan lengkap: [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)

---

## 🚀 Deployment

### Requirements
- PHP >= 8.1
- Composer
- Node.js >= 18.x
- MySQL 8.0+ / PostgreSQL 13+
- Nginx / Apache

### Quick Deploy
```bash
# 1. Clone & setup
git clone <repository>
cd compro_sigap
composer install --optimize-autoloader --no-dev
npm install && npm run build

# 2. Environment
cp .env.example .env
php artisan key:generate

# 3. Database
php artisan migrate --force
php artisan db:seed --force

# 4. Optimize
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

📖 Panduan deployment lengkap: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=ServiceTest

# With coverage
php artisan test --coverage
```

---

## 🛠️ Development Commands

```bash
# Start development server
php artisan serve
npm run dev

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Build for production
npm run build

# Database
php artisan migrate:fresh --seed  # Reset database
php artisan db:seed --class=ServiceSeeder  # Specific seeder
```

---

## 📊 Performance

### Optimization Checklist
- ✅ Laravel config/route/view caching
- ✅ Vite build optimization
- ✅ Image lazy loading
- ✅ Client-side filtering (no server requests)
- ✅ Database query optimization (eager loading)
- ✅ Tailwind CSS purging

### Target Metrics
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

---

## 🔍 SEO Features

- ✅ Per-page meta tags (title, description, keywords)
- ✅ Semantic HTML5
- ✅ Proper heading hierarchy
- ✅ Image alt text
- ✅ Internal linking
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Open Graph tags
- ✅ Structured data (Schema.org)
- ✅ Mobile responsive
- ✅ Fast loading speed

📖 SEO guide: [docs/SEO_IMPLEMENTATION.md](docs/SEO_IMPLEMENTATION.md)

---

## 🐛 Troubleshooting

### Common Issues

**Storage symlink broken:**
```bash
rm public/storage
php artisan storage:link
```

**CSRF token mismatch:**
```bash
php artisan config:clear
php artisan cache:clear
```

**Assets not loading:**
```bash
npm run build
```

**Permission denied:**
```bash
chmod -R 775 storage bootstrap/cache
```

📖 Troubleshooting lengkap: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

## 📞 Support & Contact

**Company:** PT. Sinergy Garda Pratama  
**Website:** [demo-sigap.fadh.my.id](https://demo-sigap.fadh.my.id)  
**WhatsApp:** +62 811-2682-105  
**Email:** info@sigap.com

**Developer:** Fadhly  
**Repository:** [github.com/fadhly-git/compro_sigap](https://github.com/fadhly-git/compro_sigap)

---

## 📝 License

This project is proprietary software developed for PT. Sinergy Garda Pratama.

---

## 🙏 Acknowledgments

Built with:
- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [TypeScript](https://typescriptlang.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

<div align="center">

**Made with ❤️ by PT. Sinergy Garda Pratama Development Team**

[Documentation](docs/README.md) • [Setup Guide](docs/SETUP_GUIDE.md) • [Deployment](docs/DEPLOYMENT.md)

</div>
