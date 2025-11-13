# 🎨 Landing Page - Quick Customization Guide

Panduan cepat untuk mengkustomisasi landing page ShopHub sesuai kebutuhan Anda.

---

## 🎯 Customization Checklist

- [ ] Ubah nama brand dari "ShopHub" ke nama Anda
- [ ] Ubah warna utama dari biru ke brand color Anda
- [ ] Update product data dengan produk real Anda
- [ ] Tambah/edit customer reviews
- [ ] Update contact information
- [ ] Sesuaikan menu items

---

## 📋 Panduan Customization by Section

### 1️⃣ NAVBAR - Ubah Menu Items

**File:** `components/sections/Navbar.tsx`

```jsx
// Cari bagian Desktop Navigation (line ~32)
<Link href="#features" className="...">Fitur</Link>
<Link href="#products" className="...">Produk</Link>
<Link href="#reviews" className="...">Ulasan</Link>
<Link href="#feedback" className="...">Feedback</Link>

// Ubah ke:
<Link href="#your-section" className="...">Menu Anda</Link>
```

**Ubah Button Text:**
```jsx
// Cari Login/Signup buttons (line ~50)
<Link href="/login">
  <Button variant="outline">Masuk</Button>
</Link>

// Ubah "/login" dan "/signup" ke routes yang sesuai
```

---

### 2️⃣ HERO - Update Headline & CTA

**File:** `components/sections/Hero.tsx`

```jsx
// Ubah Badge (line ~23)
<span>Ubah text badge di sini</span>

// Ubah Heading (line ~32)
<h1 className="text-5xl md:text-6xl font-bold">
  Ubah headline utama Anda di sini
  <span className="block">Dan subtitle di sini</span>
</h1>

// Ubah Description (line ~40)
<p className="text-lg">
  Ubah deskripsi value proposition di sini
</p>

// Ubah Button Labels (line ~48)
<Button>Ubah Label Button di Sini</Button>

// Ubah Statistics (line ~68)
<p className="text-3xl font-bold">Angka Anda</p>
<p className="text-gray-600">Label statistik</p>
```

---

### 3️⃣ FEATURES - Edit Feature Items

**File:** `components/sections/Features.tsx`

```jsx
// Ubah 6 features di array features (line ~8)
const features = [
  {
    icon: YourIcon,
    title: 'Judul Fitur Anda',
    description: 'Deskripsi fitur yang menarik...',
  },
  // ... tambah/edit lebih banyak
];

// Icons yang bisa digunakan (dari lucide-react):
// - Zap, Shield, Truck, Headphones, CreditCard, TrendingUp
// - Plus, Check, Star, Heart, ShoppingCart, dll.
// Lihat: https://lucide.dev/
```

---

### 4️⃣ PRODUCTS - Update Product Data

**File:** `components/sections/TrendingProducts.tsx`

```jsx
// Ubah product array (line ~10)
const products = [
  {
    id: 1,
    name: 'Nama Produk Anda',
    price: 'Rp 1.234.000',
    originalPrice: 'Rp 1.999.000',
    rating: 4.9,
    reviews: 256,
    image: '📱', // Ganti emoji atau use image URL
    badge: 'Label Produk', // Bestseller, Sale, New, dll.
    discount: '-40%',
  },
  // ... tambah produk lainnya
];

// PENTING: Untuk menggunakan image URL bukannya emoji:
// 1. Ubah bagian image di product item menjadi image URL
// 2. Ubah JSX rendering dari emoji menjadi <Image /> component
```

---

### 5️⃣ REVIEWS - Add Customer Reviews

**File:** `components/sections/Review.tsx`

```jsx
// Ubah review array (line ~8)
const reviews = [
  {
    id: 1,
    author: 'Nama Pelanggan',
    avatar: '👤', // Atau image URL
    rating: 5, // 1-5
    title: 'Judul Review',
    content: 'Isi review yang panjang dan detail...',
    date: '2 hari yang lalu',
    verified: true,
  },
  // ... tambah review lainnya
];

// Ubah heading dan description
<h2>Ubah judul section</h2>
<p>Ubah deskripsi section</p>
```

---

### 6️⃣ FEEDBACKS - Customize Form

**File:** `components/sections/Feedbacks.tsx`

```jsx
// Form ini sudah functional dengan state management
// Untuk mengubah text input placeholders:

<input placeholder="Ubah placeholder di sini" />
<textarea placeholder="Ubah placeholder textarea" />

// Ubah label
<label>Ubah Label Input</label>

// Ubah button text
<Button>Ubah Text Button</Button>

// Ubah initial feedbacks (line ~14)
const [feedbacks, setFeedbacks] = useState([
  {
    id: 1,
    name: 'Nama User',
    email: 'email@example.com',
    message: 'Feedback message...',
    category: 'Saran', // Saran, Pujian, Feedback
    timestamp: 'waktu',
  },
]);

// Ubah statistics (line ~183)
<p className="text-4xl font-bold">Angka</p>
<p>Label statistik</p>
```

---

### 7️⃣ FOOTER - Update Contact & Links

**File:** `components/sections/Footer.tsx`

```jsx
// Ubah brand name (line ~18)
<span className="font-bold">Nama Brand Anda</span>

// Ubah deskripsi (line ~22)
<p>Deskripsi brand Anda yang menarik</p>

// Ubah social media links (line ~27)
<a href="https://facebook.com/your-page">
  <Facebook />
</a>

// Ubah section titles dan links (line ~46)
// Contoh untuk KATEGORI section:
<h4>Kategori</h4>
<Link href="#">Kategori Anda</Link>

// Ubah contact information (line ~120)
<p>+62 XXX XXX XXXX</p>
<p>email@yourdomain.com</p>
<p>Alamat Anda</p>

// Ubah newsletter description
<h3>Ubah title newsletter</h3>
<p>Ubah deskripsi newsletter</p>

// Ubah payment methods (line ~193)
// Edit bagian "Metode Pembayaran"

// Ubah copyright year (automatic - line ~10)
// const currentYear = new Date().getFullYear();
```

---

## 🎨 Mengubah Warna

### Warna Utama Brand

Untuk mengubah dari **biru** ke warna lain, cari dan ganti pattern berikut:

**Pattern Biru yang perlu diubah:**
- `from-blue-600 to-blue-800` → Gradient utama (logo, buttons)
- `from-blue-600 to-indigo-600` → Gradient (headlines, sections)
- `bg-blue-600` → Background solid
- `text-blue-600` → Text color
- `border-blue-600` → Border color
- `bg-blue-100` → Light background
- `from-blue-50` → Very light background

**Contoh: Mengubah ke Warna Merah**
```jsx
// Ubah dari:
className="from-blue-600 to-blue-800"

// Menjadi:
className="from-red-600 to-red-800"

// Available colors: red, blue, green, purple, pink, orange, yellow, cyan, dll.
// Level: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

**Tailwind Color Palette:**
- `red` - Merah
- `green` - Hijau
- `blue` - Biru
- `purple` - Ungu
- `pink` - Pink/Mawar
- `orange` - Orange
- `yellow` - Kuning
- `cyan` - Cyan
- `indigo` - Indigo
- `violet` - Violet

---

## 📝 Mengubah Content Text

### Global Text Changes

1. **Title/Metadata** - `app/layout.tsx`
   ```jsx
   export const metadata: Metadata = {
     title: "Ubah judul halaman di sini",
     description: "Ubah deskripsi halaman di sini",
   };
   ```

2. **Body Font** - `app/layout.tsx`
   ```jsx
   <body className="outfit-thin">
     {/* Ubah class: outfit-thin, outfit-regular, outfit-medium, etc. */}
   </body>
   ```

---

## 🔗 Mengubah Links

### Update Navigation Links

**Navbar Menu:**
```jsx
<Link href="#features">Fitur</Link>
<Link href="#products">Produk</Link>
<Link href="#reviews">Ulasan</Link>
<Link href="#feedback">Feedback</Link>
```

**Auth Links:**
```jsx
<Link href="/login">Login page</Link>
<Link href="/signup">Signup page</Link>
```

**Footer Links:**
```jsx
<Link href="/about">About us</Link>
<Link href="/privacy">Privacy policy</Link>
<Link href="/terms">Terms & conditions</Link>
```

---

## 🖼️ Mengubah Images/Emojis

### Product Images
```jsx
// Current: Menggunakan emoji
image: '📱'

// Untuk menggunakan image URL:
image: 'https://example.com/product.jpg'

// Kemudian ubah render di JSX:
// Dari: <div className="text-6xl">{product.image}</div>
// Ke: <Image src={product.image} alt="product" width={200} height={200} />
```

### Avatar Images
```jsx
// Untuk review avatars
avatar: '👨' // Emoji
// atau
avatar: 'https://example.com/avatar.jpg' // URL

// Update JSX untuk menampilkan image URL
```

---

## 🚀 Advanced Customizations

### Menambah Section Baru

1. Buat file baru di `components/sections/YourSection.tsx`
2. Buat component React
3. Import di `app/page.tsx`
4. Tambahkan ke main layout

Contoh:
```jsx
// components/sections/YourSection.tsx
export default function YourSection() {
  return (
    <section className="py-20 bg-white">
      {/* Your content here */}
    </section>
  );
}

// app/page.tsx
import YourSection from '@/components/sections/YourSection';

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <YourSection /> {/* Tambahkan di sini */}
      {/* ... */}
    </main>
  );
}
```

### Mengubah Layout Section

Edit className di root `<section>` element:
```jsx
// Ubah padding
<section className="py-20 md:py-32"> {/* py-20, py-32, dll */}

// Ubah background
<section className="bg-white"> {/* bg-white, bg-gray-50, dll */}

// Ubah max-width container
<div className="max-w-7xl"> {/* max-w-5xl, max-w-6xl, dll */}
```

---

## 📱 Mobile Customization

### Responsive Text Sizes
```jsx
// Desktop size | Mobile size
<h1 className="text-5xl md:text-6xl"> {/* 5xl on mobile, 6xl on desktop */}

// Ubah dengan:
// sm: small (640px)
// md: medium (768px)
// lg: large (1024px)
// xl: extra large (1280px)
```

### Responsive Grid
```jsx
// 1 column mobile, 2 columns tablet, 4 columns desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 🐛 Common Issues & Solutions

### Text tidak terlihat
**Solusi:** Ganti text color
```jsx
// Dari: className="text-gray-600"
// Ke: className="text-gray-900" (lebih gelap)
```

### Button tidak responsive
**Solusi:** Tambahkan responsive classes
```jsx
className="w-full sm:w-auto" {/* Full width on mobile, auto on desktop */}
```

### Spacing terlalu besar/kecil
**Solusi:** Ubah padding/margin values
```jsx
// Padding: p-4, p-6, p-8, p-12, dll.
// Margin: m-4, m-6, m-8, m-12, dll.
// Margin vertical: my-8, my-12, my-16, dll.
```

---

## 💾 Best Practices

1. **Selalu backup** sebelum melakukan perubahan besar
2. **Test di mobile** setelah ubah styling
3. **Gunakan consistent spacing** (padding/margin)
4. **Keep it simple** - jangan terlalu banyak customization
5. **Reuse components** - jangan duplikate code

---

## 🔍 Debugging Tips

### Check component in browser:
1. Buka DevTools (F12)
2. Inspect element yang ingin diubah
3. Lihat classes dan styling di panel
4. Test perubahan langsung di DevTools

### Check console errors:
1. Buka DevTools → Console tab
2. Lihat ada error apakah
3. Fix error sesuai message

---

## 📞 Need Help?

Jika ada pertanyaan tentang kustomisasi:
1. Lihat documentation di Tailwind CSS: https://tailwindcss.com
2. Lihat icons di Lucide: https://lucide.dev
3. Lihat components di Shadcn UI: https://ui.shadcn.com

---

**Happy customizing! 🎉**

*Last updated: 2024*
