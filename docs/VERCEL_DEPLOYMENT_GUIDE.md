# Panduan Deployment ke Vercel

## Penyebab Error

Error `PrismaClientInitializationError` terjadi karena:
- Prisma Query Engine (`libquery_engine-rhel-openssl-3.0.x.so.node`) tidak tersalin ke folder deployment
- Konfigurasi `binaryTargets` di `prisma/schema.prisma` tidak sesuai dengan runtime Vercel
- Build process tidak menjalankan `prisma generate` sebelum Next.js build

## Solusi Yang Diterapkan

### 1. Update `prisma/schema.prisma`
Tambahkan `binaryTargets` untuk mendukung runtime Vercel (rhel-openssl-3.0.x):
```prisma
generator client {
  provider      = "prisma-client-js"
  output        = "../lib/generated/prisma"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}
```

### 2. Create `vercel.json`
File konfigurasi untuk Vercel:
```json
{
  "buildCommand": "prisma generate && next build",
  "env": {
    "PRISMA_SKIP_ENGINE_CHECK": "true"
  }
}
```

### 3. Update `package.json`
Ubah build script untuk menjalankan Prisma generate:
```json
"build": "prisma generate && next build && node postbuild.js"
```

### 4. Create `postbuild.js`
Script untuk memastikan Prisma engine tersalin ke lokasi yang benar:
- Mencari `libquery_engine*.so.node` dari `node_modules/.prisma/client`
- Menyalin ke `.next/server/chunks`

### 5. Create `.vercelignore`
Mencegah file tidak perlu di-upload ke Vercel

## Langkah-Langkah Deployment

### Sebelum Deploy ke Vercel:

1. **Jalankan build local untuk testing:**
   ```bash
   npm run build
   ```
   Pastikan tidak ada error dan engine files tersalin dengan benar.

2. **Commit semua perubahan:**
   ```bash
   git add .
   git commit -m "Fix: Configure Prisma for Vercel deployment"
   ```

3. **Push ke repository:**
   ```bash
   git push origin main
   ```

### Di Vercel Dashboard:

1. **Connect Repository** (jika belum):
   - Buka https://vercel.com/dashboard
   - Klik "New Project"
   - Select repository `e-commerce-web`

2. **Environment Variables:**
   - Tambahkan `DATABASE_URL` (string koneksi Neon PostgreSQL)
   - Pastikan format: `postgresql://user:password@host/database?schema=public&sslmode=require`

3. **Build & Output Settings:**
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`
   - Node.js Version: 20.x (recommended)

4. **Deploy**

## Troubleshooting

### Jika masih mendapat error "Engine not found":

1. **Clear Vercel cache:**
   - Di Vercel Dashboard → Project Settings → Deployments
   - Klik "✓ Previous deployments" → Pilih deployment → Redeploy dengan opsi "Clear Build Cache"

2. **Regenerate Prisma:**
   ```bash
   rm -rf lib/generated
   npx prisma generate
   npm run build
   git add .
   git commit -m "Regenerate Prisma client"
   git push origin main
   ```

3. **Check Vercel Logs:**
   - Di Vercel Dashboard, buka deployment → Logs
   - Cari "libquery_engine" untuk verifikasi

4. **Update Prisma ke versi terbaru:**
   ```bash
   npm install @prisma/client@latest prisma@latest
   npx prisma generate
   npm run build
   ```

## Performa & Optimasi

### Menggunakan Prisma Accelerate (Optional):

Untuk query caching dan connection pooling yang lebih baik:

1. Setup Accelerate di Prisma Cloud
2. Update DATABASE_URL di Vercel environment variables
3. Sudah dikonfigurasi di `lib/prisma.ts` dengan extension

### Connection Management:

File `lib/prisma.ts` sudah menggunakan:
- Singleton pattern untuk connection reuse
- Accelerate extension untuk caching
- NO manual `prisma.$disconnect()` (dihandle otomatis)

## File-File Yang Diubah

| File | Perubahan |
|------|-----------|
| `prisma/schema.prisma` | Tambah `binaryTargets` untuk rhel-openssl-3.0.x |
| `package.json` | Update build script dengan `prisma generate` |
| `vercel.json` | Baru - Konfigurasi Vercel |
| `.vercelignore` | Baru - Ignore file pada upload |
| `postbuild.js` | Baru - Script untuk copy engine files |

## Testing Setelah Deploy

1. **Test API endpoints:**
   ```bash
   curl https://your-app.vercel.app/api/products
   ```
   Harus mendapatkan response JSON dengan data produk.

2. **Check Vercel Logs:**
   - Pastikan tidak ada error PrismaClientInitializationError
   - Verifikasi connection ke database berhasil

3. **Test di browser:**
   - Kunjungi halaman Products
   - Pastikan data produk loading dengan benar
   - Cek console browser untuk error

## Environment Variables di Vercel

| Variable | Contoh | Keterangan |
|----------|--------|-----------|
| `DATABASE_URL` | `postgresql://user:pass@host/db?schema=public&sslmode=require` | String koneksi PostgreSQL |
| `NEXT_PUBLIC_API_URL` | `https://your-app.vercel.app` | URL publikasi app (opsional) |
| `PRISMA_SKIP_ENGINE_CHECK` | `true` | Skip Prisma engine check |

## Informasi Berguna

- **Vercel Documentation:** https://vercel.com/docs/frameworks/nextjs
- **Prisma + Vercel:** https://www.prisma.io/docs/deploy/vercel
- **Engine Not Found:** https://pris.ly/engine-not-found-tooling-investigation

## Estimasi Waktu Fix

- Local testing: 2-3 menit
- Commit & push: 1 menit
- Vercel redeploy: 3-5 menit
- **Total:** ~10 menit untuk full fix

Jika setelah mengikuti panduan ini masih ada error, silahkan check Vercel Logs untuk error message spesifik!
