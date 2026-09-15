# 📊 Database Schema - PT. Sinergy Garda Pratama

## Overview

Database menggunakan **MySQL** dengan struktur relational yang terorganisir untuk mendukung company profile website.

---

## 📋 Tables Overview

```
1. users                    # Admin users
2. company_settings         # Company information
3. services                 # Services offered
4. clients                  # Client portfolio
5. gallery_categories       # Gallery categories
6. gallery_items            # Gallery photos
7. certificates             # Company certificates
8. about_us                 # About page content
9. messages                 # Contact form submissions
```

---

## 🗄️ Table Schemas

### 1. users
**Purpose:** Admin authentication  
**Model:** `app/Models/User.php`

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Indexes:**
- PRIMARY KEY: `id`
- UNIQUE: `email`

---

### 2. company_settings
**Purpose:** Global company information  
**Model:** `app/Models/CompanySetting.php`  
**Seeder:** `database/seeders/CompanySettingsSeeder.php`

```sql
CREATE TABLE company_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_description TEXT,
    company_address TEXT,
    company_phone VARCHAR(50),
    company_email VARCHAR(255),
    whatsapp_number VARCHAR(50),
    whatsapp_default_message TEXT,
    whatsapp_enabled BOOLEAN DEFAULT TRUE,
    google_maps_embed TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    founding_year INT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'company_name', 'company_description', 'company_address',
    'company_phone', 'company_email', 'whatsapp_number',
    'whatsapp_default_message', 'whatsapp_enabled',
    'google_maps_embed', 'meta_title', 'meta_description',
    'meta_keywords', 'founding_year'
];
```

**Casts:**
```php
protected $casts = [
    'whatsapp_enabled' => 'boolean',
    'founding_year' => 'integer'
];
```

---

### 3. services
**Purpose:** Services/layanan yang ditawarkan  
**Model:** `app/Models/Service.php`  
**Seeder:** `database/seeders/ServicesSeeder.php`

```sql
CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    content LONGTEXT,
    image VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    sortOrder INT DEFAULT 0,
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    metaKeywords TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'title', 'slug', 'description', 'content', 'image',
    'isActive', 'sortOrder', 'metaTitle', 'metaDescription',
    'metaKeywords'
];
```

**Casts:**
```php
protected $casts = [
    'isActive' => 'boolean',
    'sortOrder' => 'integer'
];
```

**Appends:**
```php
protected $appends = ['image_url'];

public function getImageUrlAttribute() {
    return $this->image 
        ? asset('storage/' . $this->image) 
        : null;
}
```

**Scopes:**
```php
public function scopeActive($query) {
    return $query->where('isActive', true);
}

public function scopeOrdered($query) {
    return $query->orderBy('sortOrder', 'asc');
}
```

**Indexes:**
- PRIMARY KEY: `id`
- UNIQUE: `slug`
- INDEX: `isActive`, `sortOrder`

---

### 4. clients (Portfolio)
**Purpose:** Client/portfolio showcase  
**Model:** `app/Models/Client.php`  
**Seeder:** `database/seeders/ClientsSeeder.php`

```sql
CREATE TABLE clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    sector VARCHAR(255),
    description LONGTEXT,
    logo_path VARCHAR(255),
    images JSON,
    website_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'name', 'slug', 'sector', 'description', 'logo_path',
    'images', 'website_url', 'is_active', 'sort_order',
    'meta_title', 'meta_description', 'meta_keywords'
];
```

**Casts:**
```php
protected $casts = [
    'images' => 'array',
    'is_active' => 'boolean',
    'sort_order' => 'integer'
];
```

**Appends:**
```php
protected $appends = ['logo_url', 'image_urls'];

public function getLogoUrlAttribute() {
    return $this->logo_path 
        ? asset('storage/' . $this->logo_path) 
        : null;
}

public function getImageUrlsAttribute() {
    if (!$this->images) return [];
    
    return array_map(function($image) {
        return asset('storage/' . $image);
    }, $this->images);
}
```

**Indexes:**
- PRIMARY KEY: `id`
- UNIQUE: `slug`
- INDEX: `sector`, `is_active`, `sort_order`

---

### 5. gallery_categories
**Purpose:** Gallery category grouping  
**Model:** `app/Models/GalleryCategory.php`

```sql
CREATE TABLE gallery_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'name', 'slug', 'description', 'is_active',
    'sort_order', 'meta_title', 'meta_description'
];
```

**Casts:**
```php
protected $casts = [
    'is_active' => 'boolean',
    'sort_order' => 'integer'
];
```

**Relations:**
```php
public function items() {
    return $this->hasMany(GalleryItem::class)
                ->where('is_active', true)
                ->orderBy('sort_order');
}
```

**Indexes:**
- PRIMARY KEY: `id`
- UNIQUE: `slug`
- INDEX: `is_active`, `sort_order`

---

### 6. gallery_items
**Purpose:** Gallery photos/images  
**Model:** `app/Models/GalleryItem.php`

```sql
CREATE TABLE gallery_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gallery_category_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_path VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    FOREIGN KEY (gallery_category_id) 
        REFERENCES gallery_categories(id) 
        ON DELETE CASCADE
);
```

**Fillable:**
```php
protected $fillable = [
    'gallery_category_id', 'title', 'description',
    'image_path', 'is_active', 'sort_order'
];
```

**Casts:**
```php
protected $casts = [
    'is_active' => 'boolean',
    'sort_order' => 'integer'
];
```

**Appends:**
```php
protected $appends = ['image_url'];

public function getImageUrlAttribute() {
    return asset('storage/' . $this->image_path);
}
```

**Relations:**
```php
public function category() {
    return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
}
```

**Indexes:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `gallery_category_id`
- INDEX: `is_active`, `sort_order`

---

### 7. certificates
**Purpose:** Company certificates/awards  
**Model:** `app/Models/Certificate.php`

```sql
CREATE TABLE certificates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issued_at DATE,
    expired_at DATE NULL,
    image_path VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'title', 'issuer', 'issued_at', 'expired_at',
    'image_path', 'description', 'is_active', 'sort_order'
];
```

**Casts:**
```php
protected $casts = [
    'issued_at' => 'date',
    'expired_at' => 'date',
    'is_active' => 'boolean',
    'sort_order' => 'integer'
];
```

**Appends:**
```php
protected $appends = ['image_url'];

public function getImageUrlAttribute() {
    return $this->image_path 
        ? asset('storage/' . $this->image_path) 
        : null;
}
```

**Indexes:**
- PRIMARY KEY: `id`
- INDEX: `is_active`, `sort_order`, `issued_at`

---

### 8. about_us
**Purpose:** About page content  
**Model:** `app/Models/AboutUs.php`  
**Seeder:** `database/seeders/AboutUsSeeder.php`

```sql
CREATE TABLE about_us (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    description LONGTEXT,
    vision LONGTEXT,
    mission LONGTEXT,
    profile_images JSON,
    profile_video_url VARCHAR(255),
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    slug VARCHAR(255) DEFAULT 'about-us',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'description', 'vision', 'mission', 'profile_images',
    'profile_video_url', 'meta_title', 'meta_description',
    'meta_keywords', 'slug'
];
```

**Casts:**
```php
protected $casts = [
    'profile_images' => 'array'
];
```

**Appends:**
```php
protected $appends = ['profile_image_urls'];

public function getProfileImageUrlsAttribute() {
    if (!$this->profile_images) return [];
    
    return array_map(function($image) {
        return asset('storage/' . $image);
    }, $this->profile_images);
}
```

**Data Structure:**
```json
{
    "profile_images": [
        "about-us/team-photo.jpg",
        "about-us/office.jpg"
    ],
    "profile_video_url": "https://youtube.com/watch?v=..."
}
```

**Indexes:**
- PRIMARY KEY: `id`
- INDEX: `slug`

---

### 9. messages
**Purpose:** Contact form submissions  
**Model:** `app/Models/Message.php`  
**Seeder:** `database/seeders/contactSeeder.php`

```sql
CREATE TABLE messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Fillable:**
```php
protected $fillable = [
    'name', 'email', 'phone', 'subject', 'message', 'isRead'
];
```

**Casts:**
```php
protected $casts = [
    'isRead' => 'boolean'
];
```

**Scopes:**
```php
public function scopeUnread($query) {
    return $query->where('isRead', false);
}

public function scopeRecent($query) {
    return $query->orderBy('created_at', 'desc');
}
```

**Indexes:**
- PRIMARY KEY: `id`
- INDEX: `isRead`, `created_at`, `email`

---

## 🔗 Relationships Diagram

```
users (1:N - optional)
    |
    ├── services (created_by)
    ├── clients (created_by)
    └── certificates (created_by)

gallery_categories (1:N)
    |
    └── gallery_items (gallery_category_id)

company_settings (standalone, single row)

about_us (standalone, single row)

messages (standalone)
```

---

## 🗂️ JSON Fields Structure

### clients.images
```json
[
    "clients/client-name/project-1.jpg",
    "clients/client-name/project-2.jpg",
    "clients/client-name/office.jpg"
]
```

### about_us.profile_images
```json
[
    "about-us/team-photo-1.jpg",
    "about-us/office-building.jpg",
    "about-us/workshop.jpg"
]
```

---

## 🔍 Indexes Strategy

### Performance Indexes
```sql
-- Fast lookups by slug
INDEX idx_services_slug ON services(slug);
INDEX idx_clients_slug ON clients(slug);
INDEX idx_gallery_categories_slug ON gallery_categories(slug);

-- Filter active records
INDEX idx_services_active ON services(isActive);
INDEX idx_clients_active ON clients(is_active);
INDEX idx_gallery_categories_active ON gallery_categories(is_active);

-- Sort order optimization
INDEX idx_services_sort ON services(sortOrder);
INDEX idx_clients_sort ON clients(sort_order);

-- Composite indexes for common queries
INDEX idx_services_active_sort ON services(isActive, sortOrder);
INDEX idx_gallery_items_category_active ON gallery_items(gallery_category_id, is_active);
```

---

## 🚀 Common Queries

### Get Active Services (Ordered)
```php
Service::active()->ordered()->get();
```
```sql
SELECT * FROM services 
WHERE isActive = 1 
ORDER BY sortOrder ASC;
```

### Get Gallery Category with Items
```php
GalleryCategory::with('items')->where('slug', $slug)->firstOrFail();
```
```sql
SELECT * FROM gallery_categories WHERE slug = ?;
SELECT * FROM gallery_items 
WHERE gallery_category_id = ? AND is_active = 1 
ORDER BY sort_order ASC;
```

### Get Clients by Sector
```php
Client::where('sector', $sector)->where('is_active', true)->get();
```
```sql
SELECT * FROM clients 
WHERE sector = ? AND is_active = 1;
```

### Get Unread Messages
```php
Message::unread()->recent()->get();
```
```sql
SELECT * FROM messages 
WHERE isRead = 0 
ORDER BY created_at DESC;
```

---

## 💾 Storage Structure

```
storage/app/public/
├── services/
│   ├── service-1.jpg
│   ├── service-2.jpg
│   └── ...
├── clients/
│   ├── client-name/
│   │   ├── logo.png
│   │   └── project-1.jpg
│   └── ...
├── gallery/
│   ├── category-name/
│   │   ├── photo-1.jpg
│   │   └── photo-2.jpg
│   └── ...
├── certificates/
│   ├── cert-1.jpg
│   └── cert-2.jpg
└── about-us/
    ├── team-photo.jpg
    ├── office.jpg
    └── video.mp4
```

---

## 🔄 Migration Order

```
1. create_users_table
2. create_cache_table
3. create_jobs_table
4. create_company_settings_table
5. create_services_table
6. create_clients_table
7. create_gallery_categories_table
8. create_gallery_items_table
9. create_certificates_table
10. create_about_us_table
11. create_messages_table
12. create_personal_access_tokens_table
```

---

## 📚 Next Documentation

- [Routes Documentation](ROUTES.md)
- [Components Guide](COMPONENTS.md)
- [Setup Guide](SETUP_GUIDE.md)

---

**Last Updated:** October 20, 2025
