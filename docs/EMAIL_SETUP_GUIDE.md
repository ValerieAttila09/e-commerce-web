# Email Setup Guide - ShopHub

Panduan lengkap untuk setup Email Notifier dengan berbagai provider.

## ⚠️ Masalah: Gmail Reject Messages

Jika Anda menerima error:
```
Message rejected. For more information, go to https://support.google.com/mail/answer/695
```

Ini berarti Gmail **menolak email dari SMTP Anda** karena security reasons.

---

## Solusi 1: Gmail App Password (Recommended untuk Gmail)

### Langkah-langkah:

1. **Aktifkan 2-Step Verification terlebih dahulu:**
   - Buka: https://myaccount.google.com/security
   - Klik "2-Step Verification" dan ikuti proses

2. **Generate App Password:**
   - Buka: https://myaccount.google.com/apppasswords
   - Pilih aplikasi: **Mail**
   - Pilih device: **Windows Computer** (atau pilihan lain sesuai device Anda)
   - Klik **Generate**
   - Google akan tampilkan password 16 karakter

3. **Copy password dan update `.env.local`:**
   ```env
   SMTP_USER=lnvvalerie60@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # Copy dari Google (tanpa spasi)
   ```

4. **Test dengan restart server:**
   ```bash
   npm run dev
   ```

---

## Solusi 2: Mailtrap (Recommended untuk Testing/Development)

Mailtrap adalah service sandbox email yang **perfect untuk development**. Free tier tersedia!

### Langkah-langkah:

1. **Buat akun Mailtrap:**
   - Buka: https://mailtrap.io/
   - Sign up dengan email Anda
   - Verifikasi email

2. **Create Project & Inbox:**
   - Di dashboard, klik **Create Project**
   - Name: "ShopHub" (atau nama apapun)
   - Pilih **Testing** mode
   - Klik **Create Inbox**

3. **Get SMTP Credentials:**
   - Buka Inbox yang baru dibuat
   - Klik tab **SMTP Settings**
   - Pilih **NodeJS** di dropdown
   - Copy credentials:

   ```
   Host: smtp.mailtrap.io
   Port: 2525 (atau 587)
   Username: (copy dari Mailtrap)
   Password: (copy dari Mailtrap)
   ```

4. **Update `.env.local`:**
   ```env
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_mailtrap_username
   SMTP_PASS=your_mailtrap_password
   FROM_EMAIL=noreply@shophub.com  # Bisa apa saja untuk Mailtrap
   ```

5. **Test:**
   - Lakukan checkout
   - Buka dashboard Mailtrap
   - Email akan terlihat di **Inbox** (tidak dikirim ke Gmail real, hanya sandbox)
   - Klik email untuk melihat preview dan full content

---

## Solusi 3: SendGrid (Recommended untuk Production)

### Langkah-langkah:

1. **Buat akun SendGrid:**
   - Buka: https://sendgrid.com/
   - Sign up (free tier: 100 email/day)

2. **Create API Key:**
   - Settings → API Keys
   - Klik **Create API Key**
   - Name: "ShopHub Email"
   - Copy API key

3. **Update `.env.local`:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxx...  # API key dari SendGrid
   FROM_EMAIL=noreply@yourdomain.com
   ```

---

## Testing Checklist

- [ ] Update SMTP credentials di `.env.local`
- [ ] Restart dev server: `npm run dev`
- [ ] Lakukan checkout dengan email test
- [ ] Check server logs untuk "Email sent" message
- [ ] Verify email diterima (Inbox, Spam, Promotions folder)
- [ ] Click email untuk lihat full content dengan nama user

---

## Current Status

**Current Configuration:**
- SMTP Host: `smtp.gmail.com`
- SMTP Port: `587`
- User: `lnvvalerie60@gmail.com`

**Error:** Gmail rejecting messages - need to verify credentials

**Next Steps:**
1. Generate new Gmail App Password
2. Or switch to Mailtrap for testing
3. Or configure SendGrid for production
