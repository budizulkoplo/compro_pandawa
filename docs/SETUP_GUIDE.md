# 🛠️ Setup Guide - PT. Sinergy Garda Pratama

## Prerequisites

Pastikan sistem Anda memiliki:

### Required
- **PHP:** >= 8.1
- **Composer:** Latest version
- **Node.js:** >= 18.x
- **npm/yarn:** Latest version
- **Database:** MySQL 8.0+ atau PostgreSQL 13+
- **Web Server:** Apache/Nginx (untuk production)

### Optional
- **Git:** Untuk version control
- **VS Code:** Recommended IDE
- **TablePlus/phpMyAdmin:** Database management

---

## 🚀 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/fadhly-git/compro_sigap.git
cd compro_sigap
```

### 2. Install PHP Dependencies
```bash
composer install
```

**Packages yang diinstall:**
- Laravel Framework 11
- Laravel Fortify (authentication)
- Inertia.js Laravel Adapter
- Laravel Sanctum
- Dan dependencies lainnya

### 3. Install Node.js Dependencies
```bash
npm install
```

**Packages yang diinstall:**
- React 18
- TypeScript
- Inertia.js React Adapter
- Vite
- Tailwind CSS v4
- Shadcn UI components
- Lucide Icons
- Dan dependencies lainnya

### 4. Environment Setup

#### Copy .env file
```bash
cp .env.example .env
```

#### Edit .env file
```env
# Application
APP_NAME="PT. Sinergy Garda Pratama"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=compro_sigap
DB_USERNAME=root
DB_PASSWORD=

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@sigap.com"
MAIL_FROM_NAME="${APP_NAME}"

# Admin Email (untuk notifikasi)
ADMIN_EMAIL=admin@sigap.com

# Session
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Create Database

#### Menggunakan MySQL CLI
```bash
mysql -u root -p
```
```sql
CREATE DATABASE compro_sigap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Atau menggunakan phpMyAdmin/TablePlus
- Buat database baru bernama `compro_sigap`
- Set charset: `utf8mb4`
- Set collation: `utf8mb4_unicode_ci`

### 7. Run Migrations
```bash
php artisan migrate
```

**Migrations yang akan dijalankan:**
- create_users_table
- create_cache_table
- create_jobs_table
- create_company_settings_table
- create_services_table
- create_clients_table
- create_gallery_categories_table
- create_gallery_items_table
- create_certificates_table
- create_about_us_table
- create_messages_table
- create_personal_access_tokens_table

### 8. Run Seeders
```bash
php artisan db:seed
```

**Seeders yang akan dijalankan:**
- CompanySettingsSeeder (1 record)
- AboutUsSeeder (1 record)
- ServicesSeeder (4 services)
- ClientsSeeder (~10 clients)
- ContactSeeder (sample messages)

#### Atau seed individual:
```bash
php artisan db:seed --class=CompanySettingsSeeder
php artisan db:seed --class=AboutUsSeeder
php artisan db:seed --class=ServicesSeeder
php artisan db:seed --class=ClientsSeeder
```

### 9. Create Storage Symlink
```bash
php artisan storage:link
```

**Ini akan membuat symlink:**
```
public/storage → storage/app/public
```

### 10. Create Admin User

#### Menggunakan Tinker
```bash
php artisan tinker
```
```php
\App\Models\User::create([
    'name' => 'Admin SIGAP',
    'email' => 'admin@sigap.com',
    'password' => bcrypt('password123'),
    'email_verified_at' => now()
]);
```

#### Atau buat UserSeeder
```php
// database/seeders/UserSeeder.php
public function run()
{
    \App\Models\User::create([
        'name' => 'Admin SIGAP',
        'email' => 'admin@sigap.com',
        'password' => bcrypt('password123'),
        'email_verified_at' => now()
    ]);
}
```
```bash
php artisan db:seed --class=UserSeeder
```

### 11. Build Frontend Assets

#### Development (dengan watch mode)
```bash
npm run dev
```

#### Production Build
```bash
npm run build
```

### 12. Start Development Server

#### Terminal 1: Laravel Server
```bash
php artisan serve
```
Server akan running di: `http://localhost:8000`

#### Terminal 2: Vite Dev Server (jika npm run dev)
```bash
npm run dev
```
Vite akan running di: `http://localhost:5173`

---

## 📁 Directory Permissions

Pastikan folder berikut writable:

```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

Atau jika menggunakan macOS/Linux:
```bash
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```

---

## 🗂️ Storage Structure

Buat folder structure di `storage/app/public/`:

```bash
mkdir -p storage/app/public/services
mkdir -p storage/app/public/clients
mkdir -p storage/app/public/gallery
mkdir -p storage/app/public/certificates
mkdir -p storage/app/public/about-us
```

Atau jalankan command:
```bash
php artisan storage:structure
```

(Buat custom artisan command jika diperlukan)

---

## 📧 Email Configuration

### Development (Mailtrap)

1. Daftar di [Mailtrap.io](https://mailtrap.io)
2. Buat inbox baru
3. Copy credentials ke `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@sigap.com"
MAIL_FROM_NAME="PT. Sinergy Garda Pratama"
```

### Production (Gmail SMTP)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@sigap.com"
MAIL_FROM_NAME="PT. Sinergy Garda Pratama"
```

**Note:** Untuk Gmail, gunakan App Password, bukan password akun biasa.

### Production (SMTP Hosting)

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=noreply@sigap.com
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="noreply@sigap.com"
MAIL_FROM_NAME="PT. Sinergy Garda Pratama"
```

### Test Email

```bash
php artisan tinker
```
```php
Mail::raw('Test email', function($message) {
    $message->to('test@example.com')->subject('Test');
});
```

---

## 🔧 Configuration

### Company Settings

Setelah setup, login ke admin panel dan update:

1. **Company Information**
   - `/admin/setting`
   - Update company name, address, phone, email

2. **WhatsApp Integration**
   - Set WhatsApp number
   - Set default message
   - Enable/disable WhatsApp button

3. **Google Maps**
   - Embed Google Maps iframe

4. **SEO Defaults**
   - Meta title
   - Meta description
   - Meta keywords

### About Us Content

1. Navigate to `/admin/management-content/about`
2. Fill in:
   - Description
   - Vision
   - Mission
   - Upload profile images
   - Add video URL
   - Set SEO meta tags

---

## 🎨 Tailwind Configuration

File: `tailwind.config.js`

```javascript
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.tsx",
    "./resources/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E94D2',
        secondary: '#C1EBF7',
        accent: '#21B6FC',
        foreground: '#00334E',
        background: '#F3FCFF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 📦 VS Code Extensions (Recommended)

Install extensions berikut untuk development:

1. **PHP Intelephense** - PHP autocomplete
2. **Laravel Extension Pack** - Laravel snippets
3. **ESLint** - JavaScript/TypeScript linting
4. **Prettier** - Code formatting
5. **Tailwind CSS IntelliSense** - Tailwind autocomplete
6. **TypeScript and JavaScript Language Features**
7. **Inertia.js** - Inertia snippets
8. **React Developer Tools**

---

## 🧪 Testing Setup

### Run PHPUnit Tests
```bash
php artisan test
```

### Run Specific Test
```bash
php artisan test --filter=ServiceTest
```

---

## 🐛 Common Issues & Solutions

### Issue: "No application encryption key has been specified"
**Solution:**
```bash
php artisan key:generate
```

### Issue: "Class 'PDO' not found"
**Solution:** Install PHP PDO extension
```bash
# Ubuntu/Debian
sudo apt-get install php8.1-mysql

# macOS (Homebrew)
brew install php@8.1
```

### Issue: Storage symlink broken
**Solution:**
```bash
rm public/storage
php artisan storage:link
```

### Issue: Vite assets not loading
**Solution:**
```bash
npm run build
# Or in development:
npm run dev
```

### Issue: Permission denied on storage
**Solution:**
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Issue: CSRF token mismatch
**Solution:**
```bash
php artisan config:clear
php artisan cache:clear
```

### Issue: Changes not reflected
**Solution:**
```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Rebuild
npm run build
```

---

## 🔄 Database Reset (Development)

Jika ingin reset database dari awal:

```bash
# Drop all tables and re-migrate with seeds
php artisan migrate:fresh --seed
```

**Warning:** Ini akan menghapus semua data!

---

## 📝 Next Steps

Setelah setup selesai:

1. ✅ Login ke admin panel: `http://localhost:8000/login`
   - Email: `admin@sigap.com`
   - Password: `password123`

2. ✅ Update company settings

3. ✅ Add/edit services

4. ✅ Add clients/portfolio

5. ✅ Upload gallery photos

6. ✅ Test contact form

7. ✅ Test email notifications

---

## 📚 Next Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [Testing Guide](TESTING.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

**Last Updated:** October 20, 2025
