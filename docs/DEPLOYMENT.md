# 🚀 Deployment Guide - PT. Sinergy Garda Pratama

## Overview

Panduan deployment aplikasi ke production server.

---

## 📋 Pre-Deployment Checklist

### Environment Configuration
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_URL` ke production URL
- [ ] Configure production database credentials
- [ ] Configure production mail server
- [ ] Set secure `APP_KEY`
- [ ] Configure session & cache drivers
- [ ] Set up HTTPS/SSL certificate

### Code Preparation
- [ ] Remove development packages
- [ ] Run `composer install --optimize-autoloader --no-dev`
- [ ] Run `npm run build`
- [ ] Test all features locally in production mode
- [ ] Remove debug statements
- [ ] Check error logging configuration

### Security
- [ ] Change all default passwords
- [ ] Set strong admin passwords
- [ ] Configure CORS if needed
- [ ] Review file upload security
- [ ] Enable CSRF protection
- [ ] Review API rate limiting

---

## 🖥️ Server Requirements

### Minimum Requirements
- **OS:** Ubuntu 20.04+ / CentOS 8+ / Debian 10+
- **PHP:** 8.1 or higher
- **Database:** MySQL 8.0+ / PostgreSQL 13+
- **Web Server:** Nginx (recommended) or Apache
- **Memory:** 2GB RAM minimum
- **Storage:** 10GB minimum
- **SSL:** Let's Encrypt or commercial certificate

### PHP Extensions Required
```bash
php -m | grep -E 'pdo|mbstring|openssl|tokenizer|xml|ctype|json|bcmath|fileinfo'
```

Required extensions:
- PDO
- PDO_MySQL (or PDO_PostgreSQL)
- Mbstring
- OpenSSL
- Tokenizer
- XML
- Ctype
- JSON
- BCMath
- Fileinfo

---

## 🔧 Server Setup

### 1. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install PHP 8.1
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install -y php8.1 php8.1-fpm php8.1-cli php8.1-common \
    php8.1-mysql php8.1-mbstring php8.1-xml php8.1-bcmath \
    php8.1-curl php8.1-gd php8.1-zip php8.1-intl
```

### 3. Install Composer
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version
```

### 4. Install Node.js & npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 5. Install MySQL
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Create database:
```bash
sudo mysql -u root -p
```
```sql
CREATE DATABASE compro_sigap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sigap_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON compro_sigap.* TO 'sigap_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 6. Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 📂 Deploy Application

### 1. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/fadhly-git/compro_sigap.git
sudo chown -R $USER:www-data compro_sigap
cd compro_sigap
```

### 2. Install Dependencies
```bash
# PHP dependencies (production only)
composer install --optimize-autoloader --no-dev

# Node dependencies
npm install

# Build assets
npm run build
```

### 3. Configure Environment
```bash
cp .env.example .env
nano .env
```

**.env Production Configuration:**
```env
APP_NAME="PT. Sinergy Garda Pratama"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=compro_sigap
DB_USERNAME=sigap_user
DB_PASSWORD=secure_password_here

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"

ADMIN_EMAIL=admin@yourdomain.com
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Run Migrations & Seeders
```bash
php artisan migrate --force
php artisan db:seed --force
```

### 6. Create Storage Symlink
```bash
php artisan storage:link
```

### 7. Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/compro_sigap/storage
sudo chown -R www-data:www-data /var/www/compro_sigap/bootstrap/cache
sudo chmod -R 775 /var/www/compro_sigap/storage
sudo chmod -R 775 /var/www/compro_sigap/bootstrap/cache
```

### 8. Optimize Application
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🌐 Nginx Configuration

### Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/compro_sigap
```

**Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/compro_sigap/public;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /var/log/nginx/compro_sigap_access.log;
    error_log /var/log/nginx/compro_sigap_error.log;

    # Add security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    index index.php;

    charset utf-8;

    # Increase max upload size
    client_max_body_size 20M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/compro_sigap /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Obtain Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts:
- Enter email address
- Agree to terms
- Choose to redirect HTTP to HTTPS

### Auto-renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot sets up auto-renewal via cron/systemd timer
sudo systemctl status certbot.timer
```

---

## 🗄️ Database Backup

### Create Backup Script
```bash
sudo nano /usr/local/bin/backup-sigap-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="compro_sigap"
DB_USER="sigap_user"
DB_PASS="secure_password_here"

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/compro_sigap_$TIMESTAMP.sql.gz

# Keep only last 30 days of backups
find $BACKUP_DIR -name "compro_sigap_*.sql.gz" -mtime +30 -delete

echo "Backup completed: compro_sigap_$TIMESTAMP.sql.gz"
```

```bash
sudo chmod +x /usr/local/bin/backup-sigap-db.sh
```

### Schedule Daily Backup
```bash
sudo crontab -e
```

Add line:
```
0 2 * * * /usr/local/bin/backup-sigap-db.sh >> /var/log/mysql-backup.log 2>&1
```

---

## 🔄 Deployment Updates

### Update Script
Create `deploy.sh` in project root:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Install/update dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Run migrations
php artisan migrate --force

# Clear and cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Reload PHP-FPM
sudo systemctl reload php8.1-fpm

echo "✅ Deployment completed!"
```

```bash
chmod +x deploy.sh
```

### Run Deployment
```bash
./deploy.sh
```

---

## 📊 Monitoring & Logging

### Laravel Logs
```bash
tail -f storage/logs/laravel.log
```

### Nginx Logs
```bash
# Access log
tail -f /var/log/nginx/compro_sigap_access.log

# Error log
tail -f /var/log/nginx/compro_sigap_error.log
```

### PHP-FPM Logs
```bash
tail -f /var/log/php8.1-fpm.log
```

---

## ⚡ Performance Optimization

### 1. Enable OPcache
Edit `/etc/php/8.1/fpm/php.ini`:
```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=60
opcache.fast_shutdown=1
```

Restart PHP-FPM:
```bash
sudo systemctl restart php8.1-fpm
```

### 2. Configure Laravel Caching
```bash
# Config cache
php artisan config:cache

# Route cache
php artisan route:cache

# View cache
php artisan view:cache
```

### 3. Use Redis (Optional)
```bash
sudo apt install -y redis-server
```

Update `.env`:
```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

---

## 🔐 Security Hardening

### 1. Firewall Setup
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

### 2. Disable Directory Listing
Already handled in Nginx config.

### 3. Hide PHP Version
Edit `/etc/php/8.1/fpm/php.ini`:
```ini
expose_php = Off
```

### 4. Limit File Upload Size
Already set in Nginx config: `client_max_body_size 20M`

### 5. Enable Fail2Ban (Optional)
```bash
sudo apt install -y fail2ban
```

---

## 📚 Post-Deployment

### 1. Test Website
- [ ] Visit homepage
- [ ] Test all public pages
- [ ] Test contact form
- [ ] Verify email notifications
- [ ] Test admin login
- [ ] Test CRUD operations
- [ ] Check image uploads
- [ ] Verify WhatsApp button
- [ ] Test gallery lightbox
- [ ] Check responsive design

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Google Analytics (if needed)
- [ ] Set up robots.txt
- [ ] Verify meta tags on all pages

### 3. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error notifications
- [ ] Monitor disk space
- [ ] Monitor database size

---

## 🆘 Troubleshooting

### Website shows 500 error
```bash
# Check logs
tail -f storage/logs/laravel.log
tail -f /var/log/nginx/compro_sigap_error.log

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### Assets not loading (404)
```bash
# Rebuild assets
npm run build

# Check symlink
ls -la public/storage
php artisan storage:link
```

### Database connection failed
```bash
# Test connection
php artisan tinker
>>> DB::connection()->getPdo();

# Check credentials in .env
```

---

## 📚 Next Documentation

- [Testing Guide](TESTING.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

**Last Updated:** October 20, 2025
