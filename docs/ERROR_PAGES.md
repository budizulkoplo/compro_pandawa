# 🚨 Error Pages - PT. Sinergy Garda Pratama

## Overview

Custom error pages yang profesional dengan branding PT. Sinergy Garda Pratama, menggunakan Tailwind CSS dan animasi modern.

---

## 📄 Available Error Pages

### 1. **401 - Unauthorized (Tidak Terotorisasi)**
**File:** `resources/views/errors/401.blade.php`

**Kapan Muncul:**
- User mencoba akses halaman yang memerlukan autentikasi
- Session belum login

**Features:**
- Icon gembok dengan animasi
- Tombol Login
- Tombol kembali ke beranda
- Warna: Red gradient

---

### 2. **402 - Payment Required (Pembayaran Diperlukan)**
**File:** `resources/views/errors/402.blade.php`

**Kapan Muncul:**
- Akses konten berbayar tanpa subscription
- Feature yang memerlukan pembayaran

**Features:**
- Icon kartu kredit
- Tombol hubungi kami
- Warna: Yellow/Orange gradient

---

### 3. **403 - Forbidden (Akses Ditolak)**
**File:** `resources/views/errors/403.blade.php`

**Kapan Muncul:**
- User tidak memiliki permission
- Role/access denied

**Features:**
- Icon larangan dengan animasi
- Custom error message dari exception
- Warna: Red/Pink gradient

---

### 4. **404 - Not Found (Halaman Tidak Ditemukan)**
**File:** `resources/views/errors/404.blade.php`

**Kapan Muncul:**
- URL tidak ditemukan
- Resource deleted/moved

**Features:**
- Animasi floating number "404"
- Quick links ke halaman utama
- Tombol "Kembali" dan "Beranda"
- Warna: Blue gradient

**Quick Links Included:**
- Tentang Kami
- Layanan
- Klien
- Galeri
- Kontak

---

### 5. **419 - Page Expired (Halaman Kedaluwarsa)**
**File:** `resources/views/errors/419.blade.php`

**Kapan Muncul:**
- CSRF token expired
- Session timeout
- Form submission setelah idle lama

**Features:**
- Icon jam/waktu
- Tombol "Refresh Halaman"
- Info box menjelaskan kenapa terjadi
- Warna: Purple/Pink gradient

**Info Box:**
Menjelaskan bahwa ini fitur keamanan untuk melindungi data user.

---

### 6. **429 - Too Many Requests (Terlalu Banyak Permintaan)**
**File:** `resources/views/errors/429.blade.php`

**Kapan Muncul:**
- Rate limiting triggered
- Terlalu banyak request dalam waktu singkat
- DDoS protection

**Features:**
- Icon warning triangle
- Tombol "Tunggu & Coba Lagi" (auto 3 detik)
- Info tentang rate limit protection
- Warna: Orange/Red gradient

---

### 7. **500 - Server Error (Kesalahan Server)**
**File:** `resources/views/errors/500.blade.php`

**Kapan Muncul:**
- Internal server error
- Unhandled exception
- Database connection error
- Code error

**Features:**
- Icon komputer/server
- Tombol "Coba Lagi"
- Kontak support (Email & WhatsApp)
- Message: "Tim kami telah diberitahu"
- Warna: Red gradient

**Support Contact:**
- Email: dari `config('app.email')`
- WhatsApp: dari `config('app.whatsapp')`

---

### 8. **503 - Service Unavailable (Layanan Tidak Tersedia)**
**File:** `resources/views/errors/503.blade.php`

**Kapan Muncul:**
- Maintenance mode (`php artisan down`)
- Server overload
- Scheduled maintenance

**Features:**
- Icon gear/settings dengan animasi
- Status indicator (pulsing dot)
- Info apa yang sedang dikerjakan:
  - Meningkatkan performa server
  - Memperbarui keamanan sistem
  - Menambahkan fitur baru
- Tombol "Cek Status"
- Warna: Indigo/Blue gradient

---

## 🎨 Design Features

### Layout Structure
**File:** `resources/views/errors/layout.blade.php`

**Components:**
1. **Logo Section**
   - PT. Sinergy Garda Pratama logo
   - Clickable, kembali ke homepage
   - Shield icon dengan teks

2. **Main Content Area**
   - White card dengan blur backdrop
   - Rounded corners (3xl)
   - Shadow effects
   - Padding responsive

3. **Footer Section**
   - Contact information
   - Phone number
   - Email address
   - Copyright notice

### Visual Elements

#### Gradient Background
```css
.gradient-bg {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
}
```

#### Pattern Overlay
```css
.pattern-bg {
    background-image: 
        radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%);
    background-size: 100px 100px;
}
```

#### Animations
- **Float Animation**: Error code naik-turun
- **Pulse Slow**: Icon background glow
- **Standard Pulse**: Status indicators

---

## 🎯 Common Elements

### Error Code Display
- Font size: 8xl - 9xl
- Gradient text
- Transparent background
- Animated floating effect

### Icon Design
- Size: 32x32 (w-32 h-32)
- Colored stroke
- Background glow with blur
- Pulse animation on glow

### Action Buttons

#### Primary Button
```html
<a href="#" class="bg-blue-600 hover:bg-blue-700 text-white ...">
    <svg>...</svg>
    Button Text
</a>
```

#### Secondary Button
```html
<a href="#" class="bg-white hover:bg-gray-50 text-gray-700 border-2 ...">
    <svg>...</svg>
    Button Text
</a>
```

**Features:**
- Shadow effects
- Hover scale (105%)
- Transition animations
- Icon + text layout

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** Full width padding
- **Tablet:** Centered content
- **Desktop:** Max-width 4xl container

### Mobile Optimizations
- Stacked buttons on mobile
- Responsive text sizes
- Touch-friendly button sizes
- Optimized spacing

---

## 🔧 Configuration

### Environment Variables Used
```env
APP_NAME="SINERGY GARDA PRATAMA"
APP_PHONE="+62-21-1234-5678"
APP_WHATSAPP="+6281234567890"
APP_EMAIL="admin@sigap.com"
```

### Accessing Config
```php
{{ config('app.name') }}
{{ config('app.phone') }}
{{ config('app.email') }}
{{ config('app.whatsapp') }}
```

---

## 🧪 Testing Error Pages

### Test Locally

#### 404 Error
```
# Visit any non-existent URL
http://localhost:8000/this-page-does-not-exist
```

#### 419 Error (CSRF)
```php
// Submit form without CSRF token
// Or wait for session to expire
```

#### 500 Error
```php
// Create intentional error in code
Route::get('/test-500', function() {
    throw new Exception('Test 500 error');
});
```

#### 503 Error (Maintenance)
```bash
# Enter maintenance mode
php artisan down

# Exit maintenance mode
php artisan up
```

---

## 🎨 Customization

### Change Colors

Edit each error page's gradient:

```blade
<!-- 404 - Blue -->
<h1 class="... bg-gradient-to-r from-blue-600 to-blue-400">

<!-- 401 - Red -->
<h1 class="... bg-gradient-to-r from-red-600 to-orange-400">

<!-- 419 - Purple -->
<h1 class="... bg-gradient-to-r from-purple-600 to-pink-400">
```

### Change Logo

Edit `layout.blade.php`:
```blade
<svg class="w-10 h-10 text-blue-600" ...>
    <!-- Change SVG path -->
</svg>
```

Or use image:
```blade
<img src="{{ asset('images/logo.png') }}" alt="Logo" class="w-16 h-16">
```

### Change Messages

Edit each error page's content section:
```blade
@section('content')
    <!-- Customize messages here -->
@endsection
```

---

## 📊 Error Page Hierarchy

```
errors/
├── layout.blade.php        # Main layout dengan branding
├── minimal.blade.php       # Fallback minimal layout
├── 401.blade.php          # Unauthorized
├── 402.blade.php          # Payment Required
├── 403.blade.php          # Forbidden
├── 404.blade.php          # Not Found ⭐ Most Common
├── 419.blade.php          # Page Expired (CSRF)
├── 429.blade.php          # Too Many Requests
├── 500.blade.php          # Server Error ⭐ Critical
└── 503.blade.php          # Service Unavailable (Maintenance)
```

---

## 🔗 Quick Links Feature (404 Only)

Error 404 includes quick navigation to main pages:
- `/about` - Tentang Kami
- `/services` - Layanan
- `/clients` - Klien
- `/gallery` - Galeri
- `/contact` - Kontak

This helps users find what they're looking for even if they land on wrong URL.

---

## 💡 Best Practices

### DO ✅
- Keep error messages user-friendly
- Provide clear action buttons
- Include contact information
- Maintain consistent branding
- Use appropriate colors per error type
- Add animations for better UX
- Make mobile responsive

### DON'T ❌
- Show technical error details to users
- Use generic error messages
- Forget to include way back to site
- Make buttons hard to click (too small)
- Use confusing language
- Leave users stranded without help

---

## 🚀 Production Checklist

Before deploying:

- [ ] Test all error pages
- [ ] Verify contact information correct
- [ ] Check logo displays properly
- [ ] Test responsive design
- [ ] Verify all links work
- [ ] Check animations smooth
- [ ] Test maintenance mode (503)
- [ ] Set `APP_DEBUG=false` in production
- [ ] Verify Vite assets compiled
- [ ] Test on different browsers

---

## 📚 Related Documentation

- [Design System](DESIGN_SYSTEM.md) - Colors & typography
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues
- [Testing Guide](TESTING.md) - Testing procedures

---

**Last Updated:** October 21, 2025

---

## 🎉 Error Pages Overview

**Status:** ✅ All error pages implemented with professional design and PT. Sinergy Garda Pratama branding.

**Key Features:**
- Modern gradient backgrounds
- Smooth animations
- Responsive design
- Company branding
- Contact information
- Clear call-to-actions
- User-friendly messages
- Quick navigation (404)
- Maintenance info (503)
- Support contacts (500)
