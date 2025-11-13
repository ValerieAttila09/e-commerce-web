# ⚡ Quick Reference Guide

**Fast lookup for common tasks and commands.**

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Setup database
npx prisma generate
npx prisma migrate deploy

# 3. Start development server
npm run dev

# 4. Visit http://localhost:3001
```

---

## 📝 Common Commands

### Development
```bash
npm run dev              # Start dev server (port 3001)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npx prisma generate                    # Generate Prisma Client
npx prisma migrate dev --name "desc"   # Create migration
npx prisma migrate deploy               # Apply migrations
npx prisma db push                     # Push schema to DB
npx prisma db seed                     # Seed database
npx prisma studio                      # Open database GUI
npx prisma migrate reset               # Reset DB (dev only)
```

### Testing
```bash
# Test signup/login flow manually
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"TestPass123","firstName":"John"}'

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"TestPass123"}'
```

---

## 🔑 Authentication

### Signup
```typescript
const { signup } = useAuthStore();
await signup('email@test.com', 'Password123', 'John', 'Doe');
```

### Login
```typescript
const { login } = useAuthStore();
await login('email@test.com', 'Password123');
```

### Logout
```typescript
const { logout } = useAuthStore();
await logout();
```

### Get Current User
```typescript
const { user, isAuthenticated } = useAuthStore();
```

### Check Auth Status
```typescript
useEffect(() => {
  checkAuth();
}, []);
```

---

## 🛒 Cart Management

### Add to Cart
```typescript
const { addItem } = useCartStore();
addItem({ id: 1, name: 'Product', price: 99.99 }, 1);
```

### Remove from Cart
```typescript
const { removeItem } = useCartStore();
removeItem(productId);
```

### Update Quantity
```typescript
const { updateQuantity } = useCartStore();
updateQuantity(productId, 3);
```

### Get Cart Total
```typescript
const { getTotal } = useCartStore();
const total = getTotal();
```

### Get Item Count
```typescript
const { getItemCount } = useCartStore();
const count = getItemCount();
```

### Clear Cart
```typescript
const { clearCart } = useCartStore();
clearCart();
```

---

## 📊 Database Operations

### Create User
```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashed_password',
    firstName: 'John'
  }
});
```

### Find User
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' }
});
```

### Update User
```typescript
const updated = await prisma.user.update({
  where: { id: 'user-id' },
  data: { firstName: 'Jane' }
});
```

### Get User with Cart
```typescript
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: { cart: { include: { items: true } } }
});
```

### Delete User (Cascade)
```typescript
await prisma.user.delete({
  where: { id: 'user-id' }
});
```

---

## 🔐 Password Hashing

### Hash Password
```typescript
import { hashPassword } from '@/lib/auth';
const hash = await hashPassword('plaintext_password');
```

### Verify Password
```typescript
import { verifyPassword } from '@/lib/auth';
const isValid = await verifyPassword('plaintext', hash);
```

---

## 🎟️ JWT Tokens

### Generate Token
```typescript
import { generateToken } from '@/lib/auth';
const token = generateToken('user-id');
```

### Verify Token
```typescript
import { verifyToken } from '@/lib/auth';
const payload = verifyToken(token);
```

---

## 🍪 Cookie Management

### Get Auth Cookie
```typescript
import { getAuthToken } from '@/lib/auth';
const token = getAuthToken();
```

### Set Auth Cookie
```typescript
import { setAuthCookie } from '@/lib/auth';
setAuthCookie(token);
```

### Clear Auth Cookie
```typescript
import { clearAuthCookie } from '@/lib/auth';
clearAuthCookie();
```

---

## 🌐 API Endpoints

### POST /api/auth/signup
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass123","firstName":"John"}'
```

### POST /api/auth/login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass123"}'
```

### GET /api/auth/me
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -b cookies.txt
```

### POST /api/auth/logout
```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -b cookies.txt
```

---

## 🗂️ File Locations

### Key Files
```
Auth Store:         lib/store/authStore.ts
Cart Store:         lib/store/cartStore.ts
Auth Utils:         lib/auth.ts
Prisma Client:      lib/prisma.ts
DB Schema:          prisma/schema.prisma
```

### API Routes
```
Signup:             app/api/auth/signup/route.ts
Login:              app/api/auth/login/route.ts
Logout:             app/api/auth/logout/route.ts
Get User:           app/api/auth/me/route.ts
```

### Pages
```
Home:               app/page.tsx
Login:              app/login/page.tsx
Signup:             app/signup/page.tsx
Products:           app/products/page.tsx
Cart:               app/cart/page.tsx
Profile:            app/profile/page.tsx
About:              app/about/page.tsx
```

### Components
```
Navbar:             components/sections/Navbar.tsx
Hero:               components/sections/Hero.tsx
Features:           components/sections/Features.tsx
Footer:             components/sections/Footer.tsx
```

---

## 🔧 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# JWT Secret (must be long & random)
JWT_SECRET=your_super_secret_key_min_32_characters

# Node Environment
NODE_ENV=development
```

---

## 🧪 Test Data

### Test User
```
Email: test@example.com
Password: TestPassword123
First Name: Test
Last Name: User
```

### Test Promo Code
```
Code: SAVE10
Discount: 10%
```

### Sample Products
```
1. Wireless Headphones - $199.99
2. USB-C Cable - $24.99
3. Phone Case - $49.99
4. Screen Protector - $9.99
5. Charging Pad - $79.99
6. Portable Battery - $59.99
7. Laptop Stand - $89.99
8. Desk Lamp - $39.99
```

---

## 🎨 Tailwind Classes Reference

### Common Utilities
```css
/* Spacing */
p-4, m-4, gap-4

/* Colors */
bg-blue-600, text-white, border-gray-200

/* Sizing */
w-full, h-screen, max-w-md

/* Display */
flex, grid, hidden, block

/* Positioning */
absolute, relative, sticky

/* Responsive */
sm:block, md:flex, lg:grid
```

---

## 📦 NPM Packages

### Auth & Security
```bash
npm install bcryptjs jsonwebtoken js-cookie
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

### State Management
```bash
npm install zustand
```

### UI Framework
```bash
npm install @radix-ui/react-... lucide-react
```

### Database
```bash
npm install @prisma/client
npm install -D prisma
```

---

## 🐛 Debug Tips

### Enable Prisma Query Logging
```prisma
// In prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  log      = ["query", "error", "warn"]
}
```

### Check Browser Cookies
```javascript
// In browser console
console.log(document.cookie);
```

### Check LocalStorage
```javascript
// In browser console
console.log(localStorage.getItem('auth-storage'));
console.log(localStorage.getItem('cart-storage'));
```

### Check Zustand Store
```javascript
// In browser console (if store is exported)
import { useAuthStore } from '@/lib/store/authStore';
console.log(useAuthStore.getState());
```

---

## ⚠️ Common Issues & Fixes

### Port 3000 Already in Use
```bash
# Next.js auto-uses port 3001
# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Prisma Client Not Found
```bash
npx prisma generate
npm run build
```

### Auth Not Persisting
```bash
# Clear cookies & localStorage
localStorage.clear()
# Clear cookies in DevTools
```

### Database Connection Failed
```bash
# Check DATABASE_URL in .env
echo $DATABASE_URL
# Test connection
npx prisma db push
```

### Build Error: "did not initialize yet"
```bash
npx prisma generate
npm run build
```

---

## 📱 Responsive Breakpoints

```
Mobile:        < 640px (sm)
Tablet:        640px - 1024px (md, lg)
Desktop:       > 1024px (xl, 2xl)
```

---

## 🔒 Security Checklist

- [ ] JWT_SECRET changed to secure value
- [ ] DATABASE_URL uses HTTPS
- [ ] API routes validate input
- [ ] Passwords hashed with bcryptjs
- [ ] HTTP-only cookies enabled
- [ ] CORS properly configured
- [ ] No secrets in git repository
- [ ] Environment variables secured

---

## 📚 Documentation Links

| Guide | Purpose |
|-------|---------|
| [AUTH_SYSTEM_GUIDE.md](./AUTH_SYSTEM_GUIDE.md) | Complete auth documentation |
| [API_REFERENCE.md](./API_REFERENCE.md) | API endpoint details |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Testing procedures |
| [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) | Database operations |
| [README_COMPLETE.md](./README_COMPLETE.md) | Project overview |

---

## 🚀 Deployment Checklist

- [ ] Build succeeds: `npm run build`
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations applied: `npx prisma migrate deploy`
- [ ] JWT_SECRET is secure
- [ ] Error logging setup
- [ ] HTTPS enabled
- [ ] Backups configured

---

## 💡 Pro Tips

1. **Use Prisma Studio to view data**: `npx prisma studio`
2. **Test APIs with Postman**: Import & save requests
3. **Enable TypeScript strict mode**: Catch errors early
4. **Use React DevTools**: Debug component state
5. **Profile performance**: Use Lighthouse
6. **Monitor API calls**: Use browser DevTools Network tab
7. **Keep dependencies updated**: `npm update`
8. **Use git branches**: One feature per branch

---

## 🎓 Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Security
- [OWASP Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Password Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Version:** 1.0  
**Last Updated:** November 13, 2024  
**Status:** ✅ Ready to Use

**Bookmark this page for quick reference!** 🔖

---

## Quick Navigation
- [Commands](#-common-commands)
- [Authentication](#-authentication)
- [Cart](#-cart-management)
- [API Endpoints](#-api-endpoints)
- [File Locations](#-file-locations)
- [Environment Variables](#-environment-variables)
- [Debugging](#-debug-tips)
- [Common Issues](#-common-issues--fixes)
- [Deployment](#-deployment-checklist)
