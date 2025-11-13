# 🛍️ ShopHub - Modern E-Commerce Landing Page

Selamat datang di ShopHub! Ini adalah landing page modern dan profesional untuk website e-commerce yang dirancang dengan teknologi terkini dan desain yang menarik.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Struktur Halaman](#struktur-halaman)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Komponen-Komponen](#komponen-komponen)
- [Panduan Penggunaan](#panduan-penggunaan)
- [Kustomisasi](#kustomisasi)

## ✨ Fitur Utama

✅ **Navbar Responsif** - Menu navigasi yang responsive dengan mobile support  
✅ **Hero Section** - Banner utama yang menarik dengan CTA buttons  
✅ **Features Section** - Menampilkan keunggulan dan fitur layanan  
✅ **Trending Products** - Showcase produk-produk terbaik dengan rating  
✅ **Review Section** - Ulasan pelanggan dengan rating dan statistik  
✅ **Feedbacks Section** - Form untuk mengumpulkan feedback pelanggan  
✅ **Footer** - Footer lengkap dengan multiple links dan informasi kontak  
✅ **Modern Design** - Desain terang, profesional, dan menarik  
✅ **Tailwind CSS** - Styling responsif dengan utility-first approach  
✅ **Shadcn UI Components** - Komponen UI berkualitas tinggi  

## 🏗️ Struktur Halaman

### 1. **Navbar** (`/components/sections/Navbar.tsx`)
Navigasi atas dengan fitur:
- Logo brand dengan hover effect
- Menu navigation (Fitur, Produk, Ulasan, Feedback)
- Search icon dan shopping cart
- Tombol Login/Signup
- Mobile hamburger menu

### 2. **Hero Section** (`/components/sections/Hero.tsx`)
Bagian pembuka dengan:
- Headline yang eye-catching
- Deskripsi value proposition
- CTA buttons (Belanja Sekarang, Pelajari Lebih Lanjut)
- Statistik penjualan
- Animated background elements

### 3. **Features Section** (`/components/sections/Features.tsx`)
Menampilkan 6 keunggulan utama:
- ⚡ Gratis Ongkir
- 🛡️ Pembayaran Aman
- 🚚 Pengiriman Cepat
- 💬 Dukungan Pelanggan 24/7
- 💳 Cashback & Promo
- 📈 Produk Terbaru

### 4. **Trending Products** (`/components/sections/TrendingProducts.tsx`)
Showcase produk dengan:
- Grid layout responsif (4 produk per baris)
- Product image placeholder dengan emoji
- Rating dan jumlah review
- Original vs. sale price
- Discount badges
- Wishlist button
- Add to cart button

### 5. **Review Section** (`/components/sections/Review.tsx`)
Ulasan pelanggan dengan:
- Rating summary (rata-rata dan distribusi)
- Review cards dengan author info
- Verified badge
- Rating stars
- Helpful/Reply buttons

### 6. **Feedbacks Section** (`/components/sections/Feedbacks.tsx`)
Feedback interaktif dengan:
- Form untuk submit feedback
- List feedback yang telah diterima
- Category badges (Saran, Pujian, Feedback)
- Statistics dashboard

### 7. **Footer** (`/components/sections/Footer.tsx`)
Footer lengkap dengan:
- Brand info dan social media
- Kategori produk links
- Layanan links
- Bantuan links
- Contact information
- Newsletter signup
- Payment methods
- Shipping partners
- Copyright info

## 🛠️ Teknologi yang Digunakan

```json
{
  "Frontend Framework": "Next.js 15.5.6",
  "React Version": "18.3.1",
  "Styling": "Tailwind CSS 3.4.1",
  "UI Components": "Shadcn UI",
  "Icons": "Lucide React 0.475.0",
  "Form Handling": "React Hook Form 7.66.0",
  "Database": "Prisma Client 6.19.0",
  "Authentication": "NextAuth 4.24.13",
  "Language": "TypeScript 5",
  "Animation": "Tailwind CSS (built-in)"
}
```

## 📦 Komponen-Komponen

### Shadcn UI Components yang Digunakan:
- `Button` - Button dengan berbagai variants
- `Card` - Card container untuk content
- `Input` - Input fields
- `Textarea` - Textarea untuk feedback

### Icons dari Lucide React:
- Menu, X (Navbar)
- ShoppingCart, Search (Navbar)
- Sparkles, ArrowRight (Hero)
- Zap, Shield, Truck, Headphones, CreditCard, TrendingUp (Features)
- Star, Heart, ShoppingCart (Products)
- MessageCircle, Send (Feedbacks)
- Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin (Footer)

## 🚀 Panduan Penggunaan

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build untuk Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 🎨 Kustomisasi

### Warna Brand
Untuk mengubah warna brand (saat ini biru), edit warna di:
1. **Navbar.tsx** - Line dengan `from-blue-600 to-blue-800`
2. **Hero.tsx** - Line dengan `from-blue-600 to-indigo-600`
3. **Features.tsx** - Line dengan `from-blue-100 to-indigo-100`
4. **Footer.tsx** - Line dengan `from-blue-500 to-blue-700`

### Mengubah Logo
1. Edit folder `/components/sections/Navbar.tsx` bagian logo
2. Ganti "ShopHub" dengan nama brand Anda
3. Ganti emoji/icon logo sesuai kebutuhan

### Menambah Produk
Edit `TrendingProducts.tsx` array `products`:
```jsx
const products = [
  {
    id: 5,
    name: 'Nama Produk Anda',
    price: 'Rp X.XXX.000',
    originalPrice: 'Rp X.XXX.000',
    rating: 4.8,
    reviews: 1234,
    image: '🎁', // Ganti dengan emoji atau image URL
    badge: 'New',
    discount: '-20%',
  },
  // ... produk lainnya
];
```

### Menambah Review
Edit `Review.tsx` array `reviews`:
```jsx
const reviews = [
  {
    id: 5,
    author: 'Nama Reviewer',
    avatar: '👤',
    rating: 5,
    title: 'Judul Review',
    content: 'Konten review lengkap...',
    date: 'waktu',
    verified: true,
  },
  // ... review lainnya
];
```

### Mengubah Konten Text
Semua text dapat diubah langsung di masing-masing component file:
- Navbar.tsx - Menu items, buttons
- Hero.tsx - Headline, description, buttons
- Features.tsx - Feature titles dan descriptions
- Dll.

## 📱 Responsive Design

Landing page ini fully responsive dan terlihat bagus di:
- 📱 Mobile (320px dan ke atas)
- 📱 Tablet (768px dan ke atas)
- 🖥️ Desktop (1024px dan ke atas)

## 🎯 SEO & Performance

- ✅ Semantic HTML
- ✅ Image optimization
- ✅ Fast loading with Next.js
- ✅ Mobile-first approach
- ✅ Clean code structure

## 🔐 Keamanan

- ✅ HTTPS ready
- ✅ XSS protection dengan React
- ✅ CSRF protection dengan NextAuth
- ✅ Input validation pada feedback form

## 📞 Support & Kontak

Untuk informasi lebih lanjut, silakan hubungi:
- 📧 Email: support@shophub.com
- 📱 Phone: +62 812 3456 7890
- 🏢 Address: Jl. Teknologi No. 123, Jakarta, Indonesia

## 📄 Lisensi

© 2024 ShopHub Indonesia. All rights reserved.

---

**Dibuat dengan ❤️ untuk memberikan pengalaman berbelanja online terbaik!**
