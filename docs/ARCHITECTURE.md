# 🏗️ Architecture - PT. Sinergy Garda Pratama

## Overview

Aplikasi ini menggunakan arsitektur **Modern Full-Stack** dengan pemisahan yang jelas antara frontend dan backend, namun tetap terintegrasi melalui Inertia.js.

---

## 🎯 Architecture Pattern

### Backend: MVC (Model-View-Controller)
Laravel mengikuti pola MVC dengan modifikasi untuk Inertia.js:

```
Request → Routes → Controller → Model → Database
                       ↓
                   Inertia Response
                       ↓
                   React Component
```

### Frontend: Atomic Design Pattern

```
Atoms (Basic UI)
    ↓
Molecules (Combinations)
    ↓
Organisms (Complex Components)
    ↓
Sections (Page Sections)
    ↓
Layouts (Page Templates)
    ↓
Pages (Full Pages)
```

---

## 🔄 Data Flow

### Public Pages Flow
```
User Request
    ↓
Laravel Route (public.php)
    ↓
Controller (HomeController, ServiceController, etc.)
    ↓
Model Query (Eloquent)
    ↓
Inertia::render() with props
    ↓
React Page Component
    ↓
Render with Sections & Components
    ↓
User sees the page
```

### Admin Pages Flow
```
Admin Request (Authenticated)
    ↓
Laravel Route (web.php) + auth middleware
    ↓
Admin Controller
    ↓
Model Query/Update
    ↓
Inertia::render() or redirect
    ↓
React Admin Page
    ↓
Form submission via Inertia
    ↓
Controller processes
    ↓
Database update
    ↓
Redirect with success message
```

### Contact Form Flow (dengan Email)
```
User submits form
    ↓
ContactController@store
    ↓
Validation (client + server)
    ↓
Save to messages table
    ↓
Send Thank You email to user
    ↓
Send notification email to admin
    ↓
Return success response
    ↓
Show success message + reset form
```

---

## 📁 Directory Structure

### Backend Structure

#### Controllers
```
app/Http/Controllers/
├── HomeController.php              # Homepage
├── AboutController.php             # About page
├── ServiceController.php           # Services (public)
├── GalleryController.php           # Gallery (public)
├── ClientController.php            # Clients (public)
├── ContactController.php           # Contact form
└── Admin/
    ├── DashboardController.php     # Admin dashboard
    └── ManagementContent/
        ├── AboutController.php     # About management
        ├── ServicesController.php  # Services CRUD
        ├── PortfolioController.php # Clients CRUD
        ├── GalleryController.php   # Gallery CRUD
        └── MediaController.php     # Media library
```

#### Models
```
app/Models/
├── AboutUs.php           # About page content
├── Service.php           # Services data
├── Client.php            # Clients/portfolio
├── GalleryCategory.php   # Gallery categories
├── GalleryItem.php       # Gallery items
├── Certificate.php       # Certificates
├── CompanySetting.php    # Company settings
├── Message.php           # Contact messages
└── User.php              # Admin users
```

#### Mail Classes
```
app/Mail/
├── Contact/
│   ├── ThankYouMail.php              # Thank you email
│   └── NewMessageNotification.php    # Admin notification
```

### Frontend Structure

#### Components (Atomic Design)
```
resources/js/components/
├── atoms/
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── section-title-guest.tsx
├── molecules/
│   ├── service-public-card.tsx
│   ├── client-public-card.tsx
│   ├── whatsapp-button.tsx
│   ├── media-picker-modal.tsx
│   └── page-header.tsx
├── organisms/
│   ├── about-form.tsx
│   ├── service-form.tsx
│   ├── portfolio-form.tsx
│   ├── certificates-carousel.tsx
│   └── app-sidebar.tsx
└── sections/
    ├── hero-section.tsx
    ├── services-section.tsx
    ├── clients-section.tsx
    ├── gallery-section.tsx
    └── contact-form.tsx
```

#### Pages
```
resources/js/pages/
├── home.tsx                    # Homepage
├── about.tsx                   # About page
├── services/
│   ├── index.tsx              # Services list
│   └── show.tsx               # Service detail
├── gallery/
│   ├── index.tsx              # Gallery categories
│   └── category.tsx           # Category detail + lightbox
├── clients/
│   ├── index.tsx              # Clients list + filter
│   └── show.tsx               # Client detail
├── contact/
│   └── index.tsx              # Contact page + form
└── admin/
    ├── dashboard.tsx
    ├── about.tsx
    ├── service/
    ├── portofolio/
    └── gallery/
```

#### Layouts
```
resources/js/layouts/
├── main-layout.tsx    # Public pages layout (header + footer)
└── app-layout.tsx     # Admin pages layout (sidebar + breadcrumb)
```

---

## 🔌 Integration Points

### 1. Inertia.js Integration
**Purpose:** Bridge between Laravel and React without building an API.

**Flow:**
```php
// Laravel Controller
return Inertia::render('services/index', [
    'services' => Service::active()->ordered()->get()
]);
```

```tsx
// React Component
export default function ServicesIndex({ services }: Props) {
    return <div>{services.map(...)}</div>
}
```

### 2. Form Handling
**Inertia Form Helper:**
```tsx
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    message: ''
});

const handleSubmit = (e) => {
    e.preventDefault();
    post('/contact', {
        onSuccess: () => {
            // Reset form, show success
        }
    });
};
```

### 3. File Upload
**Media Library System:**
```tsx
// Component menggunakan MediaPickerModal
<MediaPickerModal
    onSelect={(file) => setFieldValue('image', file.path)}
/>

// Upload ke server
POST /admin/media/upload
{
    file: File,
    folder: 'services'
}

// Response
{
    path: 'services/image-123.jpg',
    url: 'http://domain/storage/services/image-123.jpg'
}
```

### 4. Email System
**Dual Email Flow:**
```php
// ContactController@store
Mail::to($request->email)
    ->send(new ThankYouMail($message));

Mail::to(config('mail.admin_email'))
    ->send(new NewMessageNotification($message));
```

---

## 🎨 Component Architecture

### Atomic Design Implementation

#### Level 1: Atoms (Smallest units)
```tsx
// button.tsx
export function Button({ children, variant, ... }) {
    return <button className={...}>{children}</button>
}
```

#### Level 2: Molecules (Combinations of atoms)
```tsx
// service-public-card.tsx
import { Card } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';

export function ServicePublicCard({ service }) {
    return (
        <Card>
            <img src={service.image_url} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Button>Learn More</Button>
        </Card>
    );
}
```

#### Level 3: Organisms (Complex components)
```tsx
// service-form.tsx
import { Input } from '@/components/atoms/input';
import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { ImageUploadField } from '@/components/molecules/image-upload-field';

export function ServiceForm({ service }) {
    return (
        <form>
            <Input name="title" />
            <RichTextEditor name="content" />
            <ImageUploadField name="image" />
            <Button type="submit">Save</Button>
        </form>
    );
}
```

#### Level 4: Sections (Page sections)
```tsx
// services-section.tsx
import { ServicePublicCard } from '@/components/molecules/service-public-card';

export function ServicesSection({ services }) {
    return (
        <section>
            <h2>Our Services</h2>
            <div className="grid">
                {services.map(service => (
                    <ServicePublicCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
}
```

#### Level 5: Pages (Complete pages)
```tsx
// pages/home.tsx
import MainLayout from '@/layouts/main-layout';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';

export default function Home({ services, clients, ... }) {
    return (
        <MainLayout>
            <HeroSection />
            <ServicesSection services={services} />
            <ClientsSection clients={clients} />
        </MainLayout>
    );
}
```

---

## 🔒 Security Architecture

### Authentication Layer
```
Public Routes (No Auth)
    ↓
Auth Middleware (admin routes)
    ↓
Controller with authorization
    ↓
Protected actions
```

### Data Validation
```
Client-side (React)
    ↓
Inertia request
    ↓
Server-side (Laravel Request)
    ↓
Database (with constraints)
```

### CSRF Protection
```
Laravel generates CSRF token
    ↓
Inertia includes token in requests
    ↓
Laravel validates token
    ↓
Request processed or rejected
```

---

## 📊 Database Architecture

### Schema Design
```
users (admin)
    ↓ (manages)
company_settings
services
clients
gallery_categories
    ↓ (has many)
gallery_items
certificates
about_us
messages (from contact form)
```

### Relationships
```
GalleryCategory → hasMany → GalleryItem
User → hasMany → Messages (optional)
Service → belongsTo → User (optional, created_by)
```

---

## 🚀 Performance Architecture

### Frontend Optimization
- **Code Splitting:** Vite automatic splitting
- **Lazy Loading:** Images dengan `loading="lazy"`
- **Memoization:** `useMemo` untuk computed values
- **Debouncing:** Search inputs
- **Client-side Filtering:** No server requests untuk filter

### Backend Optimization
- **Eager Loading:** `with()` untuk relations
- **Query Optimization:** Select only needed columns
- **Caching:** Query caching untuk static data
- **Indexing:** Database indexes pada foreign keys

### Asset Optimization
- **Vite Build:** Minification + tree-shaking
- **Image Optimization:** Proper sizing + lazy loading
- **CSS Purging:** Tailwind purges unused classes

---

## 🔄 State Management

### Server State (dari Laravel)
```tsx
// Props from Inertia
export default function Page({ services, clients }) {
    // services & clients are server state
}
```

### Client State (React)
```tsx
// Local component state
const [isOpen, setIsOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

// Form state (Inertia)
const { data, setData } = useForm({...});
```

### Shared State (via props drilling or context)
```tsx
// Layout provides shared data
<MainLayout companySettings={...}>
    <Page />
</MainLayout>
```

---

## 📱 Responsive Architecture

### Mobile-First Approach
```css
/* Base (mobile) */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Component Responsiveness
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Responsive grid */}
</div>
```

---

## 🎯 SEO Architecture

### Per-Page SEO
```tsx
// Each page sets its own meta
<Head>
    <title>{service.metaTitle || defaultTitle}</title>
    <meta name="description" content={service.metaDescription} />
</Head>
```

### Semantic HTML
```tsx
<main>
    <section>
        <h1>Main Heading</h1>
        <article>
            <h2>Subheading</h2>
        </article>
    </section>
</main>
```

---

## 📚 Next Documentation

- [Database Schema Details](DATABASE_SCHEMA.md)
- [Components Guide](COMPONENTS.md)
- [Routes Documentation](ROUTES.md)

---

**Last Updated:** October 20, 2025
