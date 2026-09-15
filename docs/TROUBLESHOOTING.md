# 🔧 Troubleshooting Guide - PT. Sinergy Garda Pratama

## Overview

Common issues dan solusinya yang mungkin ditemui saat development atau production.

---

## 📋 Issue Categories

1. [Installation Issues](#1-installation-issues)
2. [Database Issues](#2-database-issues)
3. [File Storage Issues](#3-file-storage-issues)
4. [Email Issues](#4-email-issues)
5. [CSRF Token Issues](#5-csrf-token-issues)
6. [Vite/Asset Issues](#6-viteasset-issues)
7. [Performance Issues](#7-performance-issues)
8. [Permission Issues](#8-permission-issues)
9. [Admin Panel Issues](#9-admin-panel-issues)
10. [Production Issues](#10-production-issues)

---

## 1. Installation Issues

### ❌ Issue: `composer install` fails

**Symptoms:**
```
Your requirements could not be resolved to an installable set of packages.
```

**Solutions:**
```bash
# Solution 1: Update composer
composer self-update

# Solution 2: Clear composer cache
composer clear-cache
composer install

# Solution 3: Remove vendor and reinstall
rm -rf vendor composer.lock
composer install

# Solution 4: Check PHP version
php -v  # Must be >= 8.2
```

---

### ❌ Issue: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
```bash
# Solution 1: Clear npm cache
npm cache clean --force
npm install

# Solution 2: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 3: Use --legacy-peer-deps
npm install --legacy-peer-deps

# Solution 4: Check Node version
node -v  # Recommended: >= 18.x
```

---

### ❌ Issue: APP_KEY not set

**Symptoms:**
```
No application encryption key has been specified.
```

**Solutions:**
```bash
# Generate new key
php artisan key:generate

# If still fails, check .env
cat .env | grep APP_KEY

# Manually set in .env if needed
APP_KEY=base64:your-generated-key-here
```

---

## 2. Database Issues

### ❌ Issue: Connection refused

**Symptoms:**
```
SQLSTATE[HY000] [2002] Connection refused
```

**Solutions:**
```bash
# Solution 1: Check MySQL is running
# macOS
brew services list
brew services start mysql

# Linux
sudo systemctl status mysql
sudo systemctl start mysql

# Solution 2: Check .env credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=compro_sigap
DB_USERNAME=root
DB_PASSWORD=your_password

# Solution 3: Test connection
mysql -u root -p

# Solution 4: Check MySQL socket (macOS)
php artisan config:clear
```

---

### ❌ Issue: Database does not exist

**Symptoms:**
```
SQLSTATE[HY000] [1049] Unknown database 'compro_sigap'
```

**Solutions:**
```bash
# Create database manually
mysql -u root -p
CREATE DATABASE compro_sigap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Then run migrations
php artisan migrate
```

---

### ❌ Issue: Migration fails

**Symptoms:**
```
SQLSTATE[42S01]: Base table or view already exists
```

**Solutions:**
```bash
# Solution 1: Rollback and re-migrate
php artisan migrate:rollback
php artisan migrate

# Solution 2: Fresh migration (⚠️ deletes all data!)
php artisan migrate:fresh

# Solution 3: Fresh with seeding
php artisan migrate:fresh --seed

# Solution 4: Specific migration
php artisan migrate --path=/database/migrations/2024_01_01_000000_specific_migration.php
```

---

## 3. File Storage Issues

### ❌ Issue: Storage symlink not working

**Symptoms:**
```
- Uploaded images return 404
- Images not accessible via browser
```

**Solutions:**
```bash
# Solution 1: Create symlink
php artisan storage:link

# Solution 2: Remove and recreate
rm public/storage
php artisan storage:link

# Solution 3: Verify symlink
ls -la public/
# Should show: storage -> ../storage/app/public

# Solution 4: Check permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

### ❌ Issue: File upload fails

**Symptoms:**
```
- "The file could not be uploaded"
- Files not saving
```

**Solutions:**
```bash
# Solution 1: Check permissions
sudo chown -R www-data:www-data storage
sudo chmod -R 775 storage

# For development (macOS/Linux)
sudo chown -R $USER:www-data storage
chmod -R 775 storage

# Solution 2: Check php.ini upload limits
php -i | grep upload_max_filesize
php -i | grep post_max_size

# Increase if needed (php.ini)
upload_max_filesize = 10M
post_max_size = 10M

# Solution 3: Check disk space
df -h

# Solution 4: Clear config cache
php artisan config:clear
```

---

### ❌ Issue: Images not displaying

**Symptoms:**
```
- Broken image icons
- 404 errors for images
```

**Solutions:**
```bash
# Check 1: Verify symlink exists
ls -la public/storage

# Check 2: Verify file exists
ls -la storage/app/public/

# Check 3: Check URL in code
# Should be: /storage/images/filename.jpg
# NOT: /app/public/images/filename.jpg

# Check 4: Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

---

## 4. Email Issues

### ❌ Issue: Emails not sending

**Symptoms:**
```
- Contact form submits but no email received
- Swift_TransportException
```

**Solutions:**
```bash
# Solution 1: Check .env mail config
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password  # NOT regular password!
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

# Solution 2: Generate Gmail App Password
# 1. Go to Google Account → Security
# 2. Enable 2-Step Verification
# 3. Go to App Passwords
# 4. Generate password for "Mail"
# 5. Use this password in .env

# Solution 3: Test email
php artisan tinker
Mail::raw('Test email', function($msg) {
    $msg->to('test@example.com')->subject('Test');
});

# Solution 4: Check queue (if using)
php artisan queue:work

# Solution 5: Clear config
php artisan config:clear
```

---

### ❌ Issue: Gmail blocks login

**Symptoms:**
```
Username and Password not accepted
```

**Solutions:**
```
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other"
   - Copy generated password
   - Use in MAIL_PASSWORD (no spaces)

3. Alternatively, enable "Less secure app access" (not recommended)
```

---

## 5. CSRF Token Issues

### ❌ Issue: CSRF token mismatch

**Symptoms:**
```
419 | Page Expired
TokenMismatchException
```

**Solutions:**
```bash
# Solution 1: Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Solution 2: Check session config
# config/session.php
'domain' => env('SESSION_DOMAIN', null),
'secure' => env('SESSION_SECURE_COOKIE', false),
'same_site' => 'lax',

# Solution 3: Check .env
SESSION_DRIVER=file  # or database
SESSION_LIFETIME=120

# Solution 4: Check permissions
chmod -R 775 storage/framework/sessions

# Solution 5: For Inertia, check middleware
# app/Http/Middleware/HandleInertiaRequests.php
```

---

### ❌ Issue: Form keeps showing expired error

**Symptoms:**
```
- Every form submission shows 419
- Even after refresh
```

**Solutions:**
```javascript
// Check Inertia setup in app.tsx
import { createInertiaApp } from '@inertiajs/react'
import axios from 'axios'

// Ensure CSRF token is set
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Check meta tag in app.blade.php
<meta name="csrf-token" content="{{ csrf_token() }}">
```

```bash
# Clear everything
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Restart dev server
npm run dev
```

---

## 6. Vite/Asset Issues

### ❌ Issue: Vite not running

**Symptoms:**
```
- Styles not loading
- JavaScript not working
- White screen
```

**Solutions:**
```bash
# Solution 1: Start Vite
npm run dev

# Solution 2: Check port 5173 is available
lsof -i :5173
# If in use, kill process or change port in vite.config.ts

# Solution 3: Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Solution 4: Rebuild
npm run build
```

---

### ❌ Issue: Assets not loading in production

**Symptoms:**
```
- 404 errors for JS/CSS files
- Mixed content warnings
```

**Solutions:**
```bash
# Build for production
npm run build

# Check manifest exists
ls -la public/build/manifest.json

# Check .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com  # with https!

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

---

### ❌ Issue: CSS not applying

**Symptoms:**
```
- Styles missing
- Tailwind classes not working
```

**Solutions:**
```bash
# Check Tailwind config
# tailwind.config.js
content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.tsx',
],

# Rebuild
npm run dev

# Check CSS import in app.tsx or app.css
@import 'tailwindcss';
```

---

## 7. Performance Issues

### ❌ Issue: Slow page load

**Symptoms:**
```
- Pages take > 3 seconds to load
- High Time To First Byte (TTFB)
```

**Solutions:**
```bash
# Solution 1: Enable caching
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Solution 2: Optimize composer autoload
composer dump-autoload -o

# Solution 3: Enable OPcache (php.ini)
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000

# Solution 4: Optimize images
# Use WebP format
# Implement lazy loading
# Compress images

# Solution 5: Use CDN for assets

# Solution 6: Database optimization
php artisan db:seed --class=OptimizeDatabase
```

---

### ❌ Issue: High memory usage

**Symptoms:**
```
Allowed memory size exhausted
```

**Solutions:**
```bash
# Solution 1: Increase PHP memory limit
# php.ini
memory_limit = 256M

# Solution 2: Optimize queries
# Use eager loading
Service::with('category')->get();

# Not: N+1 problem
Service::all();  // Then accessing $service->category

# Solution 3: Use pagination
Service::paginate(15);

# Solution 4: Clear cache
php artisan cache:clear
```

---

## 8. Permission Issues

### ❌ Issue: Permission denied

**Symptoms:**
```
file_put_contents(...): failed to open stream: Permission denied
```

**Solutions:**
```bash
# macOS/Linux Development
sudo chown -R $USER:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Production (Ubuntu/Debian)
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 775 storage bootstrap/cache

# Check current permissions
ls -la storage/

# Storage directories
chmod -R 775 storage/app
chmod -R 775 storage/framework
chmod -R 775 storage/logs
```

---

### ❌ Issue: Cannot write to log file

**Symptoms:**
```
The stream or file "storage/logs/laravel.log" could not be opened
```

**Solutions:**
```bash
# Create logs directory if missing
mkdir -p storage/logs

# Set permissions
sudo chown -R www-data:www-data storage/logs
chmod -R 775 storage/logs

# Or for development
sudo chown -R $USER storage/logs
chmod -R 775 storage/logs
```

---

## 9. Admin Panel Issues

### ❌ Issue: Cannot login to admin

**Symptoms:**
```
- Credentials rejected
- Validation errors
```

**Solutions:**
```bash
# Check if user exists
php artisan tinker
User::where('email', 'admin@sigap.com')->first();

# Create admin user if missing
php artisan db:seed --class=UserSeeder

# Or manually
php artisan tinker
$user = new App\Models\User();
$user->name = 'Admin';
$user->email = 'admin@sigap.com';
$user->password = Hash::make('password123');
$user->save();

# Reset password
php artisan tinker
$user = User::where('email', 'admin@sigap.com')->first();
$user->password = Hash::make('newpassword');
$user->save();
```

---

### ❌ Issue: Admin routes return 404

**Symptoms:**
```
- /admin/* routes not found
```

**Solutions:**
```bash
# Clear route cache
php artisan route:clear
php artisan route:cache

# Check routes are registered
php artisan route:list | grep admin

# Verify middleware
# routes/admin.php should have:
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // routes
});
```

---

### ❌ Issue: Media picker not working

**Symptoms:**
```
- Modal doesn't open
- Files don't upload
```

**Solutions:**
```javascript
// Check component import
import MediaPickerModal from '@/components/molecules/media-picker-modal';

// Check state management
const [isOpen, setIsOpen] = useState(false);

// Check API endpoint
// routes/api.php or admin.php
Route::post('/admin/media/upload', [MediaController::class, 'upload']);
```

---

## 10. Production Issues

### ❌ Issue: 500 Internal Server Error

**Symptoms:**
```
- Generic 500 error
- No details shown
```

**Solutions:**
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Check web server logs
# Apache
tail -f /var/log/apache2/error.log

# Nginx
tail -f /var/log/nginx/error.log

# Enable debug temporarily (DON'T leave on!)
# .env
APP_DEBUG=true
# Then set back to false after fixing

# Check permissions
sudo chown -R www-data:www-data /var/www/html
chmod -R 775 storage bootstrap/cache
```

---

### ❌ Issue: White screen (WSOD)

**Symptoms:**
```
- Blank page
- No content
- No errors visible
```

**Solutions:**
```bash
# Check browser console (F12)
# Look for JavaScript errors

# Check Laravel logs
tail -f storage/logs/laravel.log

# Rebuild frontend assets
npm run build

# Check .env APP_URL matches domain
APP_URL=https://yourdomain.com

# Clear all caches
php artisan optimize:clear
```

---

### ❌ Issue: SSL/HTTPS issues

**Symptoms:**
```
- Mixed content warnings
- Assets not loading over HTTPS
```

**Solutions:**
```bash
# Force HTTPS in AppServiceProvider
// app/Providers/AppServiceProvider.php
public function boot()
{
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }
}

# Update .env
APP_URL=https://yourdomain.com
SESSION_SECURE_COOKIE=true

# Check web server config
# Nginx: ensure SSL is configured
# Apache: ensure mod_ssl is enabled
```

---

## 🛠️ Debugging Tools

### Laravel Debugging
```bash
# View all routes
php artisan route:list

# View config values
php artisan tinker
config('app.name')
config('database.default')

# Check event listeners
php artisan event:list

# Check scheduled tasks
php artisan schedule:list

# Test database connection
php artisan tinker
DB::connection()->getPdo();
```

### Browser DevTools
```
Chrome DevTools (F12):
1. Console → Check for JavaScript errors
2. Network → Check failed requests
3. Application → Check localStorage/cookies
4. Lighthouse → Performance audit
```

### Laravel Telescope (Optional)
```bash
# Install
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate

# Access at: /telescope
```

---

## 📝 Common Commands Reference

### Cache Management
```bash
# Clear all caches
php artisan optimize:clear

# Individual clears
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Database
```bash
# Fresh migration with seeding
php artisan migrate:fresh --seed

# Rollback last migration
php artisan migrate:rollback

# Seed specific seeder
php artisan db:seed --class=UserSeeder
```

### Storage
```bash
# Create storage link
php artisan storage:link

# Fix permissions (development)
chmod -R 775 storage bootstrap/cache
```

### Queue (if using)
```bash
# Process queue jobs
php artisan queue:work

# List failed jobs
php artisan queue:failed

# Retry failed job
php artisan queue:retry {id}
```

---

## 🆘 Getting Help

### Check Logs
```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Real-time log monitoring
php artisan pail

# Web server logs
tail -f /var/log/nginx/error.log
tail -f /var/log/apache2/error.log
```

### Enable Debugging
```bash
# .env (development only!)
APP_DEBUG=true
LOG_LEVEL=debug
```

### Resources
- Laravel Documentation: https://laravel.com/docs
- Inertia.js Documentation: https://inertiajs.com
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- Stack Overflow: https://stackoverflow.com

---

## 📚 Related Documentation

- [Setup Guide](SETUP_GUIDE.md) - Installation instructions
- [Testing Guide](TESTING.md) - Testing checklist
- [Architecture](ARCHITECTURE.md) - System architecture
- [Deployment](DEPLOYMENT.md) - Deployment guide

---

**Last Updated:** October 21, 2025

## 💡 Tips

1. **Always check logs first** - Most issues leave traces in logs
2. **Clear cache when in doubt** - Many issues are cache-related
3. **Check .env file** - Many configuration issues start here
4. **Verify permissions** - File permission issues are common
5. **Test in isolation** - Narrow down the problem
6. **Google the exact error** - Someone likely faced it before
7. **Check recent changes** - What changed before the issue appeared?
8. **Restart services** - Sometimes a simple restart fixes it

---

**Found a bug not listed here?** Please document it for future reference!
