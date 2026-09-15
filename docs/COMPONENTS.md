# 🎨 Components Guide - PT. Sinergy Garda Pratama

## Overview

Aplikasi menggunakan **Atomic Design Pattern** untuk struktur komponen React yang scalable dan reusable.

---

## 🔬 Atomic Design Hierarchy

```
Atoms (Smallest)
    ↓
Molecules
    ↓
Organisms
    ↓
Sections
    ↓
Layouts
    ↓
Pages (Largest)
```

---

## ⚛️ Atoms (Basic UI Elements)

**Location:** `resources/js/components/atoms/`

### Shadcn UI Components

#### button.tsx
```tsx
import { Button } from '@/components/atoms/button';

<Button variant="default|secondary|outline|ghost">
    Click Me
</Button>
```

**Variants:**
- `default` - Primary blue button
- `secondary` - Light cyan button
- `outline` - Border only
- `ghost` - Transparent
- `destructive` - Red (delete actions)

---

#### input.tsx
```tsx
import { Input } from '@/components/atoms/input';

<Input 
    type="text|email|password|number"
    placeholder="Enter text..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```

---

#### label.tsx
```tsx
import { Label } from '@/components/atoms/label';

<Label htmlFor="field-name">
    Field Name
</Label>
```

---

#### card.tsx
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/atoms/card';

<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>
        Content here
    </CardContent>
    <CardFooter>
        Footer actions
    </CardFooter>
</Card>
```

---

#### badge.tsx
```tsx
import { Badge } from '@/components/atoms/badge';

<Badge variant="default|secondary|outline|destructive">
    Active
</Badge>
```

---

#### alert.tsx
```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/atoms/alert';

<Alert variant="default|destructive">
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>
        Your changes have been saved.
    </AlertDescription>
</Alert>
```

---

#### dialog.tsx (Modal)
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/atoms/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
        <Button>Open Modal</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
            <DialogDescription>Modal description</DialogDescription>
        </DialogHeader>
        <div>Content here</div>
        <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
```

---

### Custom Atoms

#### section-title-guest.tsx
```tsx
import { SectionTitleGuest } from '@/components/atoms/section-title-guest';

<SectionTitleGuest 
    title="Our Services"
    subtitle="What we offer to our clients"
    alignment="center|left"
/>
```

**Props:**
- `title` (string, required) - Main heading
- `subtitle` (string, optional) - Subheading
- `alignment` ('center'|'left', default: 'center')

---

#### file-upload.tsx
```tsx
import { FileUpload } from '@/components/atoms/file-upload';

<FileUpload
    label="Upload Image"
    accept="image/*"
    value={imageUrl}
    onChange={(file) => handleFileChange(file)}
    preview={true}
/>
```

**Props:**
- `label` (string) - Field label
- `accept` (string) - File types (e.g., "image/*", ".pdf")
- `value` (string) - Current file URL/path
- `onChange` (function) - Callback with File object
- `preview` (boolean) - Show image preview

---

## 🧪 Molecules (Combinations of Atoms)

**Location:** `resources/js/components/molecules/`

### Public Components

#### service-public-card.tsx
```tsx
import { ServicePublicCard } from '@/components/molecules/service-public-card';

<ServicePublicCard service={service} />
```

**Props:**
```typescript
service: {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_url: string;
}
```

**Features:**
- Image dengan aspect-ratio
- Title & description
- "Learn More" button
- Hover effects

---

#### client-public-card.tsx
```tsx
import { ClientPublicCard } from '@/components/molecules/client-public-card';

<ClientPublicCard client={client} />
```

**Props:**
```typescript
client: {
    id: number;
    name: string;
    slug: string;
    sector: string;
    logo_url: string;
}
```

**Features:**
- Logo dengan object-contain
- Client name
- Sector badge
- Link to detail page

---

#### gallery-item-public-card.tsx
```tsx
import { GalleryItemPublicCard } from '@/components/molecules/gallery-item-public-card';

<GalleryItemPublicCard 
    item={item}
    onClick={() => handleImageClick(item)}
/>
```

**Props:**
```typescript
item: {
    id: number;
    title: string;
    image_url: string;
}
onClick: () => void;
```

**Features:**
- Image dengan hover overlay
- Title overlay
- Cursor pointer
- Smooth transitions

---

#### whatsapp-button.tsx
```tsx
import { WhatsAppButton } from '@/components/molecules/whatsapp-button';

<WhatsAppButton
    phoneNumber="+6281126821105"
    message="Halo, saya ingin bertanya..."
    position="bottom-right|bottom-left"
/>
```

**Props:**
- `phoneNumber` (string) - WhatsApp number
- `message` (string, optional) - Pre-filled message
- `position` ('bottom-right'|'bottom-left', default: 'bottom-right')

**Features:**
- Floating button (fixed position)
- WhatsApp icon
- Opens WhatsApp with pre-filled message
- Mobile responsive

---

### Admin Components

#### media-picker-modal.tsx
```tsx
import { MediaPickerModal } from '@/components/molecules/media-picker-modal';

<MediaPickerModal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    onSelect={(file) => handleFileSelect(file)}
    folder="services"
    multiple={false}
/>
```

**Props:**
- `isOpen` (boolean) - Modal visibility
- `onClose` (function) - Close callback
- `onSelect` (function) - File selection callback
- `folder` (string, optional) - Filter by folder
- `multiple` (boolean, default: false) - Allow multiple selection

**Features:**
- Browse uploaded files
- Upload new files
- Search & filter
- Grid/list view
- Delete files
- Preview images

---

#### image-upload-field.tsx
```tsx
import { ImageUploadField } from '@/components/molecules/image-upload-field';

<ImageUploadField
    label="Service Image"
    value={imageUrl}
    onChange={(url) => setImageUrl(url)}
    folder="services"
/>
```

**Props:**
- `label` (string) - Field label
- `value` (string) - Current image URL
- `onChange` (function) - Callback with new URL
- `folder` (string) - Upload folder name

**Features:**
- Direct upload button
- Media picker button
- Image preview
- Remove image button
- Integrates with media library

---

#### page-header.tsx
```tsx
import { PageHeader } from '@/components/molecules/page-header';

<PageHeader
    title="Services Management"
    description="Manage your company services"
    actions={
        <Button onClick={handleCreate}>
            Create New
        </Button>
    }
/>
```

**Props:**
- `title` (string) - Page title
- `description` (string, optional) - Page description
- `actions` (ReactNode, optional) - Action buttons

---

#### seo-fields.tsx
```tsx
import { SeoFields } from '@/components/molecules/seo-fields';

<SeoFields
    metaTitle={metaTitle}
    metaDescription={metaDescription}
    metaKeywords={metaKeywords}
    onChange={(field, value) => handleSeoChange(field, value)}
/>
```

**Props:**
- `metaTitle` (string)
- `metaDescription` (string)
- `metaKeywords` (string)
- `onChange` (function)

---

## 🧬 Organisms (Complex Components)

**Location:** `resources/js/components/organisms/`

### Forms

#### about-form.tsx
```tsx
import { AboutForm } from '@/components/organisms/about-form';

<AboutForm about={about} />
```

**Features:**
- Rich text editor (Description, Vision, Mission)
- Multiple image upload
- Video URL/upload
- SEO fields
- Tabbed interface (Content, Multimedia, SEO)
- Form validation
- Submit handling

---

#### service-form.tsx
```tsx
import { ServiceForm } from '@/components/organisms/service-form';

<ServiceForm service={service} />
```

**Features:**
- Title & slug fields
- Description textarea
- Rich text content editor
- Image upload (media picker)
- Active toggle
- Sort order
- SEO fields
- Form validation

---

#### portfolio-form.tsx
```tsx
import { PortfolioForm } from '@/components/organisms/portfolio-form';

<PortfolioForm client={client} />
```

**Features:**
- Client name & sector
- Logo upload
- Multiple project images
- Rich text description
- Website URL
- Active toggle
- Sort order
- SEO fields

---

### UI Components

#### certificates-carousel.tsx
```tsx
import { CertificatesCarousel } from '@/components/organisms/certificates-carousel';

<CertificatesCarousel certificates={certificates} />
```

**Props:**
```typescript
certificates: Array<{
    id: number;
    title: string;
    issuer: string;
    image_url: string;
    issued_at: string;
}>
```

**Features:**
- Autoplay carousel
- Navigation arrows
- Dots indicator
- Responsive slides (1-3 per view)
- Certificate info overlay

---

#### app-sidebar.tsx
```tsx
import { AppSidebar } from '@/components/organisms/app-sidebar';

<AppSidebar />
```

**Features:**
- Collapsible sidebar
- Navigation menu
- Active route highlighting
- Icon + text labels
- Responsive (mobile drawer)

**Menu Items:**
- Dashboard
- Management Content
  - About Us
  - Services
  - Portfolio/Clients
  - Gallery
  - Certificates
- Messages
- Settings

---

## 📄 Sections (Page Sections)

**Location:** `resources/js/components/sections/`

### Hero Sections

#### hero-section.tsx
```tsx
import { HeroSection } from '@/components/sections/hero-section';

<HeroSection
    title="PT. Sinergy Garda Pratama"
    subtitle="Your Trusted Security Partner"
    description="We provide professional security services..."
    ctaText="Contact Us"
    ctaLink="/contact"
/>
```

---

#### about-hero-section.tsx
```tsx
import { AboutHeroSection } from '@/components/sections/about-hero-section';

<AboutHeroSection
    title="About Us"
    description={about.description}
/>
```

---

### Content Sections

#### services-section.tsx (Homepage - 4 cards)
```tsx
import { ServicesSection } from '@/components/sections/services-section';

<ServicesSection services={services.slice(0, 4)} />
```

**Features:**
- Grid layout (1-2-3-4 columns responsive)
- Service cards dengan image
- "View All Services" link

---

#### services-list-section.tsx (All services)
```tsx
import { ServicesListSection } from '@/components/sections/services-list-section';

<ServicesListSection services={services} />
```

**Features:**
- Full services grid
- All active services
- Sorted by sortOrder

---

#### service-detail-section.tsx
```tsx
import { ServiceDetailSection } from '@/components/sections/service-detail-section';

<ServiceDetailSection service={service} />
```

**Features:**
- Service image (full width)
- Service title
- HTML content rendering (prose styling)
- Back to list button

---

#### clients-section.tsx (Homepage - logos only)
```tsx
import { ClientsSection } from '@/components/sections/clients-section';

<ClientsSection clients={clients} />
```

**Features:**
- Logo grid
- No text, just logos
- Equal sizing (object-contain)

---

#### clients-list-section.tsx (All clients + filter)
```tsx
import { ClientsListSection } from '@/components/sections/clients-list-section';

<ClientsListSection 
    clients={clients}
    sectors={sectors}
/>
```

**Features:**
- ⭐ **Filter by sector** (client-side)
- Sector buttons dengan counter
- Filtered results grid
- Empty state

---

#### gallery-section.tsx (Homepage - 6 latest)
```tsx
import { GallerySection } from '@/components/sections/gallery-section';

<GallerySection items={galleryItems.slice(0, 6)} />
```

**Features:**
- 6 latest photos
- Grid layout (2-3-4 columns)
- "View All Gallery" link

---

#### mission-vision-section.tsx
```tsx
import { MissionVisionSection } from '@/components/sections/mission-vision-section';

<MissionVisionSection
    vision={about.vision}
    mission={about.mission}
/>
```

**Features:**
- Side-by-side cards (desktop)
- Stacked cards (mobile)
- HTML content rendering
- Icon indicators

---

#### profile-section.tsx
```tsx
import { ProfileSection } from '@/components/sections/profile-section';

<ProfileSection
    images={about.profile_image_urls}
    videoUrl={about.profile_video_url}
/>
```

**Features:**
- Multiple images grid
- Video embed (YouTube/Vimeo)
- Or video file player
- Responsive layout

---

## 🏗️ Layouts

**Location:** `resources/js/layouts/`

### main-layout.tsx (Public Pages)
```tsx
import MainLayout from '@/layouts/main-layout';

export default function Page({ ...props }) {
    return (
        <MainLayout>
            <div>Page content</div>
        </MainLayout>
    );
}
```

**Features:**
- Header dengan navigation
- Main content area
- Footer
- WhatsApp floating button
- Responsive mobile menu

---

### app-layout.tsx (Admin Pages)
```tsx
import AppLayout from '@/layouts/app-layout';

export default function AdminPage({ ...props }) {
    return (
        <AppLayout>
            <div>Admin content</div>
        </AppLayout>
    );
}
```

**Features:**
- Sidebar navigation
- Breadcrumb
- Main content area
- User menu
- Mobile drawer

---

## 🎨 Component Best Practices

### 1. Props Typing (TypeScript)
```tsx
interface ServiceCardProps {
    service: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image_url: string;
    };
}

export function ServiceCard({ service }: ServiceCardProps) {
    // ...
}
```

### 2. Default Props
```tsx
interface ButtonProps {
    variant?: 'default' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
    variant = 'default', 
    size = 'md',
    ...props 
}: ButtonProps) {
    // ...
}
```

### 3. Event Handlers
```tsx
export function Form() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submit
    };

    return <form onSubmit={handleSubmit}>...</form>;
}
```

### 4. Conditional Rendering
```tsx
export function Component({ isLoading, data }) {
    if (isLoading) {
        return <Spinner />;
    }

    if (!data) {
        return <EmptyState />;
    }

    return <Content data={data} />;
}
```

### 5. Memoization
```tsx
import { useMemo } from 'react';

export function FilteredList({ items, filter }) {
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter);
    }, [items, filter]);

    return <List items={filteredItems} />;
}
```

---

## 📚 Next Documentation

- [Pages Documentation](PAGES_PUBLIC.md)
- [Design System](DESIGN_SYSTEM.md)
- [Setup Guide](SETUP_GUIDE.md)

---

**Last Updated:** October 20, 2025
