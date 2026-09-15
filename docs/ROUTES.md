# 🛣️ Routes Documentation - PT. Sinergy Garda Pratama

## Overview

Aplikasi memiliki dua jenis routes:
1. **Public Routes** - Untuk pengunjung website
2. **Admin Routes** - Untuk manajemen konten (requires authentication)

---

## 🌐 Public Routes

**File:** `routes/public.php`

### Homepage
```php
Route::get('/', [HomeController::class, 'index'])->name('home');
```
- **URL:** `/`
- **Method:** GET
- **Controller:** `HomeController@index`
- **View:** `resources/js/pages/home.tsx`
- **Data:** services (4), clients (all), gallery (6 latest), certificates

---

### About Page
```php
Route::get('/about', [AboutController::class, 'index'])->name('about');
```
- **URL:** `/about`
- **Method:** GET
- **Controller:** `AboutController@index`
- **View:** `resources/js/pages/about.tsx`
- **Data:** about (description, vision, mission, images, video), certificates

---

### Services Routes

#### Services Index
```php
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
```
- **URL:** `/services`
- **Method:** GET
- **Controller:** `ServiceController@index`
- **View:** `resources/js/pages/services/index.tsx`
- **Data:** services (all active, ordered)

#### Service Detail
```php
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
```
- **URL:** `/services/{slug}`
- **Method:** GET
- **Controller:** `ServiceController@show`
- **View:** `resources/js/pages/services/show.tsx`
- **Param:** `slug` (string, unique)
- **Data:** service (single record by slug)
- **Example:** `/services/jasa-keamanan`

---

### Gallery Routes

#### Gallery Index (Categories)
```php
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
```
- **URL:** `/gallery`
- **Method:** GET
- **Controller:** `GalleryController@index`
- **View:** `resources/js/pages/gallery/index.tsx`
- **Data:** categories (all active with item count)

#### Gallery Category Detail
```php
Route::get('/gallery/{slug}', [GalleryController::class, 'category'])->name('gallery.category');
```
- **URL:** `/gallery/{slug}`
- **Method:** GET
- **Controller:** `GalleryController@category`
- **View:** `resources/js/pages/gallery/category.tsx`
- **Param:** `slug` (category slug)
- **Data:** category (with all items)
- **Features:** Lightbox, keyboard navigation
- **Example:** `/gallery/security-services`

---

### Clients Routes

#### Clients Index
```php
Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');
```
- **URL:** `/clients`
- **Method:** GET
- **Controller:** `ClientController@index`
- **View:** `resources/js/pages/clients/index.tsx`
- **Data:** clients (all active), sectors (unique list)
- **Features:** Client-side filter by sector

#### Client Detail
```php
Route::get('/clients/{slug}', [ClientController::class, 'show'])->name('clients.show');
```
- **URL:** `/clients/{slug}`
- **Method:** GET
- **Controller:** `ClientController@show`
- **View:** `resources/js/pages/clients/show.tsx`
- **Param:** `slug` (client slug)
- **Data:** client (single record with images)
- **Example:** `/clients/pt-bank-mandiri`

---

### Contact Routes

#### Contact Page
```php
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
```
- **URL:** `/contact`
- **Method:** GET
- **Controller:** `ContactController@index`
- **View:** `resources/js/pages/contact/index.tsx`
- **Data:** companySettings (address, phone, email, maps)

#### Contact Form Submit
```php
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```
- **URL:** `/contact`
- **Method:** POST
- **Controller:** `ContactController@store`
- **Request Data:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "subject": "Request Information",
    "message": "I would like to know more about..."
  }
  ```
- **Validation:**
  - name: required, string, max:255
  - email: required, email
  - phone: nullable, string, max:50
  - subject: required, string, max:255
  - message: required, string
- **Actions:**
  1. Save to `messages` table
  2. Send thank you email to user
  3. Send notification email to admin
  4. Return success response
- **Response:** Redirect back with success message

---

## 🔐 Admin Routes

**File:** `routes/web.php`  
**Middleware:** `auth` (Laravel Fortify)  
**Prefix:** `/admin`

### Dashboard
```php
Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
```
- **URL:** `/admin/dashboard`
- **View:** `resources/js/pages/admin/dashboard.tsx`
- **Data:** stats (services, clients, gallery, messages counts), recent messages

---

### Management Content Routes

#### About Us Management
```php
Route::prefix('admin/management-content')->name('admin.management-content.')->group(function () {
    Route::resource('about', AboutController::class);
});
```

**Available Routes:**
- **GET** `/admin/management-content/about` - Index/Edit page
- **PUT/PATCH** `/admin/management-content/about/{id}` - Update
- **Data:** description, vision, mission, profile_images, profile_video_url, SEO fields

---

#### Services Management
```php
Route::resource('services', ServicesController::class);
```

**Available Routes:**
- **GET** `/admin/management-content/services` - Index (list all)
- **GET** `/admin/management-content/services/create` - Create form
- **POST** `/admin/management-content/services` - Store new service
- **GET** `/admin/management-content/services/{id}` - Show detail
- **GET** `/admin/management-content/services/{id}/edit` - Edit form
- **PUT/PATCH** `/admin/management-content/services/{id}` - Update
- **DELETE** `/admin/management-content/services/{id}` - Delete

**Request Data (Create/Update):**
```json
{
  "title": "Jasa Keamanan",
  "slug": "jasa-keamanan",
  "description": "Short description...",
  "content": "<p>Full HTML content...</p>",
  "image": "services/image.jpg",
  "isActive": true,
  "sortOrder": 1,
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "metaKeywords": "keyword1, keyword2"
}
```

---

#### Clients/Portfolio Management
```php
Route::resource('portfolio', PortfolioController::class);
```

**Available Routes:**
- **GET** `/admin/portofolio` - Index
- **GET** `/admin/portofolio/create` - Create
- **POST** `/admin/portofolio` - Store
- **GET** `/admin/portofolio/{id}` - Show
- **GET** `/admin/portofolio/{id}/edit` - Edit
- **PUT/PATCH** `/admin/portofolio/{id}` - Update
- **DELETE** `/admin/portofolio/{id}` - Delete

**Request Data:**
```json
{
  "name": "PT Bank Mandiri",
  "slug": "pt-bank-mandiri",
  "sector": "Perbankan",
  "description": "<p>Client description...</p>",
  "logo_path": "clients/bank-mandiri/logo.png",
  "images": [
    "clients/bank-mandiri/project-1.jpg",
    "clients/bank-mandiri/project-2.jpg"
  ],
  "website_url": "https://bankmandiri.co.id",
  "is_active": true,
  "sort_order": 1,
  "meta_title": "PT Bank Mandiri - Client SIGAP",
  "meta_description": "...",
  "meta_keywords": "..."
}
```

---

#### Gallery Management
```php
Route::prefix('gallery')->name('gallery.')->group(function () {
    Route::resource('categories', GalleryCategoryController::class);
    Route::resource('items', GalleryItemController::class);
});
```

**Categories Routes:**
- **GET** `/admin/gallery/categories`
- **POST** `/admin/gallery/categories`
- **PUT** `/admin/gallery/categories/{id}`
- **DELETE** `/admin/gallery/categories/{id}`

**Items Routes:**
- **GET** `/admin/gallery/items`
- **POST** `/admin/gallery/items`
- **PUT** `/admin/gallery/items/{id}`
- **DELETE** `/admin/gallery/items/{id}`

---

#### Certificates Management
```php
Route::resource('certificates', CertificateController::class);
```

**Available Routes:**
- **GET** `/admin/certificates`
- **POST** `/admin/certificates`
- **PUT** `/admin/certificates/{id}`
- **DELETE** `/admin/certificates/{id}`

---

### Media Library Routes
```php
Route::prefix('admin/media')->name('admin.media.')->group(function () {
    Route::post('/upload', [MediaController::class, 'upload'])->name('upload');
    Route::get('/', [MediaController::class, 'index'])->name('index');
    Route::delete('/delete', [MediaController::class, 'delete'])->name('delete');
});
```

#### Upload File
```php
POST /admin/media/upload
```
- **Request:**
  ```json
  {
    "file": File,
    "folder": "services" // optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "path": "services/image-123.jpg",
    "url": "http://domain/storage/services/image-123.jpg"
  }
  ```

#### Browse Media Library
```php
GET /admin/media?folder=services&search=logo&sort=newest
```
- **Query Params:**
  - `folder` (optional): Filter by folder
  - `search` (optional): Search filename
  - `sort` (optional): newest|oldest|name
- **Response:**
  ```json
  {
    "files": [
      {
        "name": "image-123.jpg",
        "path": "services/image-123.jpg",
        "url": "http://domain/storage/services/image-123.jpg",
        "size": 156789,
        "modified": "2025-10-20 10:30:00"
      }
    ]
  }
  ```

#### Delete File(s)
```php
DELETE /admin/media/delete
```
- **Request:**
  ```json
  {
    "paths": [
      "services/old-image.jpg",
      "clients/unused.png"
    ]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "deleted": 2
  }
  ```

---

### Messages Routes
```php
Route::prefix('admin/messages')->name('admin.messages.')->group(function () {
    Route::get('/', [MessageController::class, 'index'])->name('index');
    Route::get('/{id}', [MessageController::class, 'show'])->name('show');
    Route::patch('/{id}/read', [MessageController::class, 'markAsRead'])->name('read');
    Route::delete('/{id}', [MessageController::class, 'destroy'])->name('destroy');
});
```

**Available Routes:**
- **GET** `/admin/messages` - List all messages
- **GET** `/admin/messages/{id}` - Show single message
- **PATCH** `/admin/messages/{id}/read` - Mark as read
- **DELETE** `/admin/messages/{id}` - Delete message

---

### Settings Routes
```php
Route::prefix('admin/setting')->name('admin.setting.')->group(function () {
    Route::get('/', [SettingController::class, 'index'])->name('index');
    Route::put('/', [SettingController::class, 'update'])->name('update');
});
```

**GET** `/admin/setting`
- View settings page

**PUT** `/admin/setting`
- Update company settings
- **Request Data:**
  ```json
  {
    "company_name": "PT. Sinergy Garda Pratama",
    "company_description": "...",
    "company_address": "...",
    "company_phone": "+62 21 1234567",
    "company_email": "info@sigap.com",
    "whatsapp_number": "+6281126821105",
    "whatsapp_default_message": "Halo, saya ingin bertanya...",
    "whatsapp_enabled": true,
    "google_maps_embed": "<iframe src=\"...\"></iframe>",
    "meta_title": "...",
    "meta_description": "...",
    "meta_keywords": "...",
    "founding_year": 2010
  }
  ```

---

## 🔐 Authentication Routes

**Provider:** Laravel Fortify  
**File:** `routes/auth.php`

### Login
```php
GET  /login  - Login form
POST /login  - Process login
```

### Logout
```php
POST /logout - Logout user
```

### Register (Optional, usually disabled)
```php
GET  /register - Register form
POST /register - Process registration
```

### Password Reset
```php
GET  /forgot-password       - Forgot password form
POST /forgot-password       - Send reset link
GET  /reset-password/{token} - Reset form
POST /reset-password        - Process reset
```

---

## 📊 Route Summary

### Public Routes (9 routes)
```
GET  /                      → home
GET  /about                 → about
GET  /services              → services.index
GET  /services/{slug}       → services.show
GET  /gallery               → gallery.index
GET  /gallery/{slug}        → gallery.category
GET  /clients               → clients.index
GET  /clients/{slug}        → clients.show
GET  /contact               → contact.index
POST /contact               → contact.store
```

### Admin Routes (~40+ routes)
```
Dashboard:               1 route
About Management:        4 routes
Services Management:     7 routes
Clients Management:      7 routes
Gallery Management:     14 routes (categories + items)
Certificates:            7 routes
Media Library:           3 routes
Messages:                4 routes
Settings:                2 routes
```

### Auth Routes (6-10 routes)
```
Login/Logout:            3 routes
Password Reset:          4 routes
Register (optional):     2 routes
```

---

## 🔍 Route Patterns

### Naming Convention
```php
// Public routes
Route::get('/path', [Controller::class, 'method'])->name('resource.action');

// Admin routes
Route::get('/admin/path', [AdminController::class, 'method'])
     ->name('admin.resource.action');

// Resource routes (CRUD)
Route::resource('name', Controller::class);
// Generates: index, create, store, show, edit, update, destroy
```

### Route Groups
```php
// Public routes group
Route::middleware(['web'])->group(function () {
    // Public routes here
});

// Admin routes group
Route::middleware(['web', 'auth'])->prefix('admin')->group(function () {
    // Admin routes here
});
```

---

## 🚀 API Endpoints (Optional)

**File:** `routes/api.php`

Currently, aplikasi menggunakan **Inertia.js** (tidak butuh REST API). Namun, jika diperlukan API untuk mobile app atau third-party:

```php
Route::prefix('api/v1')->group(function () {
    Route::get('/services', [ApiServiceController::class, 'index']);
    Route::get('/services/{slug}', [ApiServiceController::class, 'show']);
    Route::get('/clients', [ApiClientController::class, 'index']);
    Route::post('/contact', [ApiContactController::class, 'store']);
});
```

---

## 📚 Next Documentation

- [Components Guide](COMPONENTS.md)
- [Setup Guide](SETUP_GUIDE.md)
- [Deployment Guide](DEPLOYMENT.md)

---

**Last Updated:** October 20, 2025
