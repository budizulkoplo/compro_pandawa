# 🎨 Design System - PT. Sinergy Garda Pratama

## Overview

Design system yang konsisten untuk memastikan tampilan visual yang profesional di seluruh aplikasi.

---

## 🎨 Color Palette

### Brand Colors (dari Logo Perusahaan)

```css
/* Primary Colors */
--primary: #1E94D2;           /* Medium-dark blue */
--primary-foreground: #FFFFFF; /* White text on primary */

/* Secondary Colors */
--secondary: #C1EBF7;          /* Light cyan */
--secondary-foreground: #00334E; /* Navy text on secondary */

/* Accent Colors */
--accent: #21B6FC;             /* Bright cyan */
--accent-foreground: #FFFFFF;  /* White text on accent */

/* Foreground (Text) */
--foreground: #00334E;         /* Navy blue - main text */
--muted-foreground: #64748B;   /* Slate gray - secondary text */

/* Background */
--background: #F3FCFF;         /* Very light blue */
--card: #FFFFFF;               /* White cards */
```

### Tailwind CSS Classes

```tsx
// Primary
<div className="bg-primary text-primary-foreground">
    Primary Button
</div>

// Secondary
<div className="bg-secondary text-secondary-foreground">
    Secondary Button
</div>

// Accent
<div className="bg-accent text-accent-foreground">
    Accent Badge
</div>

// Foreground/Text
<p className="text-foreground">Main text</p>
<p className="text-muted-foreground">Secondary text</p>

// Background
<div className="bg-background">Page background</div>
<div className="bg-card">Card background</div>
```

---

## 📝 Typography

### Font Family

**Primary Font:** Poppins (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
font-family: 'Poppins', sans-serif;
```

### Font Weights

- **Light (300):** Decorative text
- **Regular (400):** Body text, paragraphs
- **Medium (500):** Subtle emphasis
- **SemiBold (600):** Subheadings
- **Bold (700):** Headings, CTAs

### Heading Scale

```tsx
// H1 - Page title
<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
    Main Page Title
</h1>

// H2 - Section heading
<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
    Section Heading
</h2>

// H3 - Subsection
<h3 className="text-2xl md:text-3xl font-semibold">
    Subsection Title
</h3>

// H4 - Card title
<h4 className="text-xl md:text-2xl font-semibold">
    Card Title
</h4>

// H5 - Small heading
<h5 className="text-lg font-medium">
    Small Heading
</h5>

// H6 - Label
<h6 className="text-base font-medium">
    Label Text
</h6>
```

### Body Text

```tsx
// Large body text
<p className="text-lg text-muted-foreground">
    Large paragraph text
</p>

// Regular body text
<p className="text-base text-foreground">
    Regular paragraph text
</p>

// Small text
<p className="text-sm text-muted-foreground">
    Small helper text
</p>

// Extra small (caption)
<p className="text-xs text-muted-foreground">
    Caption or metadata
</p>
```

### Text Utilities

```tsx
// Bold
<span className="font-bold">Bold text</span>

// Italic
<span className="italic">Italic text</span>

// Uppercase
<span className="uppercase">Uppercase</span>

// Capitalize
<span className="capitalize">capitalize each word</span>

// Truncate
<p className="truncate">Very long text that will be truncated...</p>

// Line clamp
<p className="line-clamp-2">
    Text that will show max 2 lines with ellipsis...
</p>
```

---

## 📏 Spacing System

### Scale (Tailwind Default)

```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
32:  128px
```

### Common Patterns

```tsx
// Section padding
<section className="py-16 md:py-24">

// Container padding
<div className="px-4 md:px-6 lg:px-8">

// Card padding
<div className="p-6">

// Stack spacing (vertical)
<div className="space-y-4">

// Grid gap
<div className="grid gap-6">

// Button padding
<button className="px-6 py-3">
```

---

## 📐 Layout & Grid

### Container

```tsx
// Max-width container
<div className="container mx-auto px-4">
    Content
</div>

// Custom max-width
<div className="max-w-7xl mx-auto px-4">
    Content
</div>

// Section container
<section className="container mx-auto px-4 py-16">
    Section content
</section>
```

### Grid System

```tsx
// Responsive grid (1-2-3 columns)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>

// Services grid (1-2-3-4)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {services.map(...)}
</div>

// Gallery grid (2-3-4)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map(...)}
</div>
```

### Flexbox

```tsx
// Center content
<div className="flex items-center justify-center">
    Centered
</div>

// Space between
<div className="flex items-center justify-between">
    <div>Left</div>
    <div>Right</div>
</div>

// Column layout
<div className="flex flex-col space-y-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

// Responsive flex
<div className="flex flex-col md:flex-row gap-6">
    <div>Column on mobile, row on desktop</div>
</div>
```

---

## 🎭 Components Styling

### Buttons

```tsx
// Primary button
<Button variant="default" size="default">
    Primary Action
</Button>

// Secondary button
<Button variant="secondary">
    Secondary Action
</Button>

// Outline button
<Button variant="outline">
    Outline Button
</Button>

// Ghost button
<Button variant="ghost">
    Ghost Button
</Button>

// Destructive button
<Button variant="destructive">
    Delete
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Cards

```tsx
// Basic card
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>
        Content
    </CardContent>
</Card>

// Hover card
<Card className="hover:shadow-lg transition-shadow duration-300">
    Hover effect
</Card>
```

### Badges

```tsx
// Status badges
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="outline">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>

// With icons
<Badge>
    <CheckIcon className="w-3 h-3 mr-1" />
    Verified
</Badge>
```

### Inputs

```tsx
// Text input
<Input 
    type="text"
    placeholder="Enter text..."
    className="w-full"
/>

// With label
<div>
    <Label htmlFor="name">Name</Label>
    <Input id="name" type="text" />
</div>

// With error
<div>
    <Input className="border-red-500" />
    <p className="text-sm text-red-500 mt-1">Error message</p>
</div>
```

---

## 🖼️ Images & Media

### Image Ratios

```tsx
// Square (1:1)
<div className="aspect-square">
    <img src="..." className="w-full h-full object-cover" />
</div>

// Video (16:9)
<div className="aspect-video">
    <img src="..." className="w-full h-full object-cover" />
</div>

// Portrait (3:4)
<div className="aspect-[3/4]">
    <img src="..." className="w-full h-full object-cover" />
</div>

// Landscape (4:3)
<div className="aspect-[4/3]">
    <img src="..." className="w-full h-full object-cover" />
</div>
```

### Object Fit

```tsx
// Cover (fill container, may crop)
<img src="..." className="object-cover" />

// Contain (fit inside, may have padding)
<img src="..." className="object-contain" />

// Fill (stretch to fill)
<img src="..." className="object-fill" />
```

### Lazy Loading

```tsx
<img 
    src="image.jpg"
    alt="Description"
    loading="lazy"
    className="w-full h-auto"
/>
```

---

## 🎬 Animations & Transitions

### Hover Effects

```tsx
// Scale on hover
<div className="hover:scale-105 transition-transform duration-300">
    Scale up
</div>

// Opacity on hover
<div className="hover:opacity-80 transition-opacity duration-300">
    Fade
</div>

// Shadow on hover
<Card className="hover:shadow-xl transition-shadow duration-300">
    Lift effect
</Card>

// Multiple effects
<Button className="hover:scale-105 hover:shadow-lg transition-all duration-300">
    Combined
</Button>
```

### Fade In Animations

```tsx
// Fade in on mount
<div className="animate-in fade-in duration-500">
    Fade in content
</div>

// Slide in from bottom
<div className="animate-in slide-in-from-bottom duration-500">
    Slide up content
</div>
```

### Loading States

```tsx
// Pulse animation
<div className="animate-pulse bg-gray-200 h-4 rounded">
    Loading skeleton
</div>

// Spin animation
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary">
    Spinner
</div>
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints

```typescript
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

### Responsive Patterns

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
    Desktop only
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
    Mobile only
</div>

// Responsive text size
<h1 className="text-2xl md:text-4xl lg:text-5xl">
    Responsive heading
</h1>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    Responsive grid
</div>

// Responsive padding
<section className="py-8 md:py-12 lg:py-16">
    Responsive section
</section>
```

---

## 🌗 Dark Mode Support

Tailwind CSS v4 sudah include dark mode support:

```tsx
// Dark mode text
<p className="text-foreground dark:text-white">
    Text that adapts to theme
</p>

// Dark mode background
<div className="bg-white dark:bg-gray-900">
    Adaptive background
</div>

// Dark mode border
<div className="border border-gray-200 dark:border-gray-700">
    Adaptive border
</div>
```

---

## ♿ Accessibility

### Focus States

```tsx
// Default focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-primary">
    Accessible button
</button>

// Custom focus
<input className="focus:border-primary focus:ring-1 focus:ring-primary" />
```

### Screen Reader Only

```tsx
<span className="sr-only">
    Text for screen readers only
</span>
```

### ARIA Labels

```tsx
<button aria-label="Close modal">
    <XIcon className="w-4 h-4" />
</button>
```

---

## 📐 Prose Styling (Rich Content)

Untuk HTML content dari rich text editor:

```tsx
import '@tailwindcss/typography';

<div className="prose prose-lg max-w-none">
    <h1>Heading</h1>
    <p>Paragraph with <strong>bold</strong> and <em>italic</em>.</p>
    <ul>
        <li>List item</li>
    </ul>
</div>
```

Custom prose styles:
```tsx
<div className="prose 
    prose-headings:text-foreground 
    prose-p:text-muted-foreground
    prose-a:text-primary
    prose-strong:text-foreground">
    HTML content
</div>
```

---

## 🎯 Icon System

### Lucide React Icons

```tsx
import { Home, User, Settings, Mail, Phone } from 'lucide-react';

// Default size (24px)
<Home />

// Custom size
<Home className="w-5 h-5" />

// With color
<Home className="w-6 h-6 text-primary" />

// In button
<Button>
    <Mail className="w-4 h-4 mr-2" />
    Send Email
</Button>
```

### Common Icons

```tsx
import {
    Home,           // Homepage
    User,           // Profile
    Settings,       // Settings
    Mail,           // Email
    Phone,          // Phone
    MapPin,         // Location
    Calendar,       // Date
    Clock,          // Time
    Check,          // Success
    X,              // Close/Error
    AlertCircle,    // Warning
    Info,           // Information
    ChevronRight,   // Navigation
    Menu,           // Mobile menu
    Search,         // Search
    Upload,         // Upload
    Download,       // Download
    Edit,           // Edit
    Trash,          // Delete
    Plus,           // Add
    Minus,          // Remove
} from 'lucide-react';
```

---

## 📚 Design Tokens (CSS Variables)

File: `resources/css/app.css`

```css
@layer base {
  :root {
    /* Colors */
    --primary: #1E94D2;
    --secondary: #C1EBF7;
    --accent: #21B6FC;
    --foreground: #00334E;
    --background: #F3FCFF;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    /* Border Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
}
```

---

## 📚 Next Documentation

- [Components Guide](COMPONENTS.md)
- [Pages Documentation](PAGES_PUBLIC.md)

---

**Last Updated:** October 20, 2025
