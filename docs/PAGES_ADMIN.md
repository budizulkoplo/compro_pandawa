# 🔧 Admin Pages - PT. Sinergy Garda Pratama

## Overview

Dokumentasi lengkap untuk halaman-halaman admin panel yang digunakan untuk manajemen konten website.

---

## 🔐 Authentication

**Login URL:** `/login`  
**Logout:** `POST /logout`  
**Middleware:** `auth` (Laravel Fortify)

### Default Credentials
```
Email: admin@sigap.com
Password: password123
```

⚠️ **Ganti password setelah login pertama kali!**

---

## 📋 Admin Pages List

1. [Dashboard](#1-dashboard)
2. [About Management](#2-about-management)
3. [Services Management](#3-services-management)
4. [Clients/Portfolio Management](#4-clientsportfolio-management)
5. [Gallery Management](#5-gallery-management)
6. [Certificates Management](#6-certificates-management)
7. [Messages](#7-messages)
8. [Company Settings](#8-company-settings)
9. [Media Library](#9-media-library)

---

## 1. Dashboard

**URL:** `/admin/dashboard`  
**File:** `resources/js/pages/admin/dashboard.tsx`  
**Controller:** `app/Http/Controllers/Admin/DashboardController.php`

### Purpose
Overview dan statistik website.

### Sections
1. **Statistics Cards**
   - Total Services
   - Total Clients
   - Total Gallery Items
   - Unread Messages

2. **Recent Messages**
   - Latest 5 messages
   - Quick preview
   - Link to messages page

3. **Quick Actions**
   - Add New Service
   - Add New Client
   - Upload to Gallery
   - View All Messages

### Data Props
```typescript
interface DashboardProps {
    stats: {
        servicesCount: number;
        clientsCount: number;
        galleryItemsCount: number;
        unreadMessagesCount: number;
    };
    recentMessages: Message[];
}
```

---

## 2. About Management

**URL:** `/admin/management-content/about`  
**File:** `resources/js/pages/admin/about.tsx`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/AboutController.php`

### Purpose
Mengelola konten halaman About Us.

### Form Sections

#### Content Tab
1. **Description (Rich Text)**
   - HTML editor
   - Company description

2. **Vision (Rich Text)**
   - Company vision statement

3. **Mission (Rich Text)**
   - Company mission statement

#### Multimedia Tab
1. **Profile Images**
   - Multiple image upload
   - Drag & drop support
   - Preview thumbnails
   - Delete individual images

2. **Profile Video**
   - YouTube URL input
   - Or video file upload
   - Video preview

#### SEO Tab
1. **Meta Title**
2. **Meta Description**
3. **Meta Keywords**

### Components Used
- `AboutForm` (organism)
- `RichTextEditor` (TipTap)
- `MultiImageUpload`
- `ImageUploadField`
- `SeoFields`

### Actions
- **Update:** `PUT /admin/management-content/about/{id}`

---

## 3. Services Management

**Base URL:** `/admin/management-content/services`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/ServicesController.php`

### 3.1 Services Index

**URL:** `/admin/management-content/services`  
**File:** `resources/js/pages/admin/service/index.tsx`

#### Purpose
List semua services dengan actions.

#### Features
- Table view dengan columns:
  - Image thumbnail
  - Title
  - Status (Active/Inactive)
  - Sort Order
  - Actions (View, Edit, Delete)
- Search functionality
- Filter by status
- Sort by order
- Pagination

#### Actions
- Create New Service
- Edit Service
- Delete Service
- Toggle Active/Inactive

---

### 3.2 Create Service

**URL:** `/admin/management-content/services/create`  
**File:** `resources/js/pages/admin/service/create.tsx`

#### Form Fields

**Basic Information:**
- Title (required)
- Slug (auto-generated, editable)
- Description (textarea)
- Content (Rich Text Editor)

**Image:**
- Image Upload
- Media Picker integration

**Status:**
- Is Active (toggle)
- Sort Order (number)

**SEO:**
- Meta Title
- Meta Description
- Meta Keywords

#### Actions
- **Save:** `POST /admin/management-content/services`
- **Cancel:** Back to list

---

### 3.3 Edit Service

**URL:** `/admin/management-content/services/{id}/edit`  
**File:** `resources/js/pages/admin/service/edit.tsx`

#### Same as Create Form
Pre-filled with existing data.

#### Actions
- **Update:** `PUT /admin/management-content/services/{id}`
- **Delete:** `DELETE /admin/management-content/services/{id}`

---

### 3.4 View Service

**URL:** `/admin/management-content/services/{id}`  
**File:** `resources/js/pages/admin/service/show.tsx`

#### Purpose
Preview service detail.

#### Sections
- Service image
- Title & description
- Full content (rendered HTML)
- Status & sort order
- SEO information

#### Actions
- Edit
- Delete
- Back to list

---

## 4. Clients/Portfolio Management

**Base URL:** `/admin/portofolio`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/PortfolioController.php`

### 4.1 Clients Index

**URL:** `/admin/portofolio`  
**File:** `resources/js/pages/admin/portofolio/index.tsx`

#### Features
- Grid/Table view
- Client cards dengan:
  - Logo
  - Name
  - Sector
  - Status
  - Actions
- Search by name
- Filter by:
  - Sector
  - Status (Active/Inactive)
- Pagination

---

### 4.2 Create/Edit Client

**URL:** `/admin/portofolio/create` or `/admin/portofolio/{id}/edit`  
**File:** `resources/js/pages/admin/portofolio/create.tsx` / `edit.tsx`

#### Form Sections

**Basic Information:**
- Client Name (required)
- Slug (auto-generated)
- Sector (text/select)
- Description (Rich Text)
- Website URL

**Media:**
- Logo Upload
- Project Images (Multiple)
  - Drag & drop
  - Multiple selection
  - Preview grid

**Status:**
- Is Active (toggle)
- Sort Order

**SEO:**
- Meta Title
- Meta Description
- Meta Keywords

#### Actions
- **Save:** `POST /admin/portofolio`
- **Update:** `PUT /admin/portofolio/{id}`
- **Delete:** `DELETE /admin/portofolio/{id}`

---

### 4.3 View Client

**URL:** `/admin/portofolio/{id}`  
**File:** `resources/js/pages/admin/portofolio/show.tsx`

#### Preview
- Logo display
- Client information
- Project images gallery
- Full description
- Website link

---

## 5. Gallery Management

**Base URL:** `/admin/gallery`

### 5.1 Gallery Categories

**URL:** `/admin/gallery/categories`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/GalleryCategoryController.php`

#### Features
- List all categories
- Category cards dengan:
  - Name
  - Description
  - Item count
  - Status
  - Actions

#### CRUD Operations
- **Create:** Add new category
- **Edit:** Update category
- **Delete:** Remove category (with items)

#### Form Fields
- Category Name
- Slug (auto-generated)
- Description
- Is Active
- Sort Order
- SEO fields

---

### 5.2 Gallery Items

**URL:** `/admin/gallery/items`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/GalleryItemController.php`

#### Features
- Grid view of all items
- Filter by category
- Image thumbnails
- Bulk upload support

#### CRUD Operations
- **Upload:** Multiple images at once
- **Edit:** Update item details
- **Delete:** Remove items

#### Form Fields per Item
- Title
- Description
- Category (select)
- Image Upload
- Is Active
- Sort Order

---

## 6. Certificates Management

**URL:** `/admin/certificates`  
**File:** `resources/js/pages/admin/certificates/index.tsx`  
**Controller:** `app/Http/Controllers/Admin/ManagementContent/CertificateController.php`

### Features
- List all certificates
- Certificate cards dengan:
  - Image preview
  - Title
  - Issuer
  - Issue date
  - Expiry date
  - Status

### CRUD Operations
- **Create/Edit Form Fields:**
  - Title (required)
  - Issuer (organization name)
  - Issued At (date picker)
  - Expired At (date picker, optional)
  - Image Upload
  - Description
  - Is Active
  - Sort Order

### Display
- Used in homepage carousel
- Used in about page
- Auto-sorted by sort order

---

## 7. Messages

**URL:** `/admin/messages`  
**File:** `resources/js/pages/admin/messages/index.tsx`  
**Controller:** `app/Http/Controllers/Admin/MessageController.php`

### Purpose
Inbox pesan dari contact form.

### Features

#### Messages List
- Table view dengan columns:
  - Read status (badge)
  - Name
  - Email
  - Subject
  - Date
  - Actions (View, Mark as Read, Delete)
- Filter by:
  - Read/Unread
  - Date range
- Search by name/email
- Pagination

#### Message Detail
**URL:** `/admin/messages/{id}`

- Full message content
- Sender information
- Timestamp
- Reply action (opens email client)

#### Actions
- **Mark as Read:** `PATCH /admin/messages/{id}/read`
- **Delete:** `DELETE /admin/messages/{id}`
- **Reply:** Opens default email client

---

## 8. Company Settings

**URL:** `/admin/setting`  
**File:** `resources/js/pages/admin/setting.tsx`  
**Controller:** `app/Http/Controllers/Admin/SettingController.php`

### Purpose
Global website settings.

### Form Sections

#### Company Information
- Company Name
- Company Description
- Company Address
- Company Phone
- Company Email
- Founding Year

#### Contact Integration
- WhatsApp Number
- WhatsApp Default Message
- WhatsApp Enabled (toggle)

#### Google Maps
- Maps Embed Code (iframe)

#### Social Media
- Facebook URL
- Instagram URL
- Twitter URL
- LinkedIn URL
- YouTube URL

#### SEO Defaults
- Default Meta Title
- Default Meta Description
- Default Meta Keywords

### Actions
- **Update:** `PUT /admin/setting`

### Note
Settings disimpan dalam single record di `company_settings` table.

---

## 9. Media Library

**URL:** `/admin/media`  
**File:** `resources/js/components/molecules/media-picker-modal.tsx`  
**Controller:** `app/Http/Controllers/Admin/MediaController.php`

### Purpose
Centralized file management system.

### Features

#### Browse Files
- Grid view of uploaded files
- Preview thumbnails
- File information:
  - Filename
  - Size
  - Upload date
  - Folder/path

#### Upload Files
- Drag & drop
- Multiple file selection
- Progress bar
- Folder selection

#### Search & Filter
- Search by filename
- Filter by folder
- Sort by:
  - Name
  - Date (newest/oldest)
  - Size

#### Actions
- **Upload:** `POST /admin/media/upload`
- **Delete:** `DELETE /admin/media/delete`
- **Select:** Return file path to caller

### Integration
Media picker digunakan di:
- About management (profile images)
- Services (service image)
- Clients (logo & project images)
- Gallery (gallery items)
- Certificates (certificate image)

### Usage Example
```tsx
<MediaPickerModal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    onSelect={(file) => {
        setFieldValue('image', file.path);
        setIsOpen(false);
    }}
    folder="services"
    multiple={false}
/>
```

---

## 🎨 Common UI Components

### Page Layout
All admin pages use `AppLayout`:
```tsx
<AppLayout>
    <PageHeader
        title="Page Title"
        description="Page description"
        actions={
            <Button onClick={handleCreate}>
                Create New
            </Button>
        }
    />
    {/* Page content */}
</AppLayout>
```

### Sidebar Navigation
Located in `AppLayout`:
- Dashboard
- Management Content
  - About Us
  - Services
  - Portfolio
  - Gallery
  - Certificates
- Messages
- Settings
- Logout

### Forms Pattern
```tsx
<form onSubmit={handleSubmit}>
    <Tabs defaultValue="content">
        <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
            {/* Content fields */}
        </TabsContent>
        
        <TabsContent value="multimedia">
            {/* Media fields */}
        </TabsContent>
        
        <TabsContent value="seo">
            <SeoFields {...} />
        </TabsContent>
    </Tabs>
    
    <div className="mt-6 flex gap-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline">Cancel</Button>
    </div>
</form>
```

### Table Pattern
```tsx
<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Column 1</TableHead>
            <TableHead>Column 2</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {items.map(item => (
            <TableRow key={item.id}>
                <TableCell>{item.field1}</TableCell>
                <TableCell>{item.field2}</TableCell>
                <TableCell>
                    <Button size="sm">Edit</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
```

---

## 🔒 Security

### Authentication
- Laravel Fortify
- Session-based authentication
- CSRF protection

### Authorization
- All admin routes require `auth` middleware
- Role-based access (dapat ditambahkan)

### Input Validation
- Client-side validation (React)
- Server-side validation (Laravel Request)
- XSS protection
- SQL injection protection (Eloquent ORM)

---

## 📚 Related Documentation

- [Routes Documentation](ROUTES.md)
- [Components Guide](COMPONENTS.md)
- [Database Schema](DATABASE_SCHEMA.md)
- [Media Picker Guide](MEDIA_PICKER_GUIDE.md)

---

**Last Updated:** October 21, 2025
