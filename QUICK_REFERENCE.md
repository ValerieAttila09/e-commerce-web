# 🎯 Landing Page Quick Reference Card

**TL;DR - Cheat Sheet untuk Landing Page ShopHub**

---

## 🚀 Start Development

```bash
npm run dev                    # Start dev server (localhost:3001)
npm run build                  # Build for production
npm start                      # Start production server
npm run lint                   # Check linting errors
```

---

## 📁 File Structure - Where to Edit

| Untuk Ubah | File | Line/Location |
|-----------|------|----------------|
| **Logo/Brand Name** | `Navbar.tsx` | ~20 |
| **Navbar Menu** | `Navbar.tsx` | ~32 |
| **Login/Signup Links** | `Navbar.tsx` | ~50 |
| **Hero Headline** | `Hero.tsx` | ~32 |
| **Hero Description** | `Hero.tsx` | ~40 |
| **Hero CTA Buttons** | `Hero.tsx` | ~48 |
| **Hero Stats** | `Hero.tsx` | ~68 |
| **Features** | `Features.tsx` | ~8 (array) |
| **Products** | `TrendingProducts.tsx` | ~10 (array) |
| **Reviews** | `Review.tsx` | ~8 (array) |
| **Feedbacks** | `Feedbacks.tsx` | ~14 (initial state) |
| **Footer Links** | `Footer.tsx` | Multiple |
| **Footer Contact** | `Footer.tsx` | ~120 |
| **Colors/Styling** | All files | Search `blue-600` |
| **Metadata** | `app/layout.tsx` | ~8 |

---

## 🎨 Quick Color Changes

**Change Brand Color:**
```
Search:  from-blue-600 to-blue-800
Replace: from-[YOUR_COLOR]-600 to-[YOUR_COLOR]-800

Example: from-red-600 to-red-800
Example: from-purple-600 to-purple-800
Example: from-green-600 to-green-800
```

**Available Colors:**
- `red` `orange` `yellow` `green` `blue` `indigo` `purple` `pink` `cyan` `slate` `gray`

---

## ✏️ Edit Content - Copy-Paste Ready

### 1. Change Brand Name
```jsx
// In Navbar.tsx (line ~22)
- ShopHub
+ YourBrandName

// In Footer.tsx (line ~18)
- ShopHub
+ YourBrandName
```

### 2. Update Navbar Menu Items
```jsx
// In Navbar.tsx (line ~32-42)
<Link href="#features">Fitur</Link>      // Change text & href
<Link href="#products">Produk</Link>
<Link href="#reviews">Ulasan</Link>
<Link href="#feedback">Feedback</Link>
```

### 3. Update Hero Section
```jsx
// Headline (Hero.tsx line 32)
<h1>Your Headline Here</h1>

// Description (line 40)
<p>Your description here</p>

// CTA Button (line 48)
<Button>Your Button Text</Button>
```

### 4. Update Features
```jsx
// In Features.tsx - Edit features array
const features = [
  {
    icon: IconName,
    title: 'Your Feature Title',
    description: 'Your feature description...',
  },
];
```

### 5. Update Products
```jsx
// In TrendingProducts.tsx - Edit products array
const products = [
  {
    id: 1,
    name: 'Your Product Name',
    price: 'Rp X.XXX.000',
    originalPrice: 'Rp X.XXX.000',
    rating: 4.9,
    reviews: 123,
    image: '📦', // or image URL
    badge: 'Your Badge',
    discount: '-XX%',
  },
];
```

### 6. Update Reviews
```jsx
// In Review.tsx - Edit reviews array
const reviews = [
  {
    id: 1,
    author: 'Customer Name',
    avatar: '👤',
    rating: 5,
    title: 'Review Title',
    content: 'Review content...',
    date: 'Time ago',
    verified: true,
  },
];
```

---

## 🔗 Navigation Links Map

```
Navbar Links:
- #features → Features Section
- #products → Trending Products Section
- #reviews → Review Section
- #feedback → Feedbacks Section
- /login → Login Page
- /signup → Signup Page

Footer Links:
- Kategori → Update in Footer.tsx line ~46
- Layanan → Update in Footer.tsx line ~66
- Bantuan → Update in Footer.tsx line ~86
- Contact → Update in Footer.tsx line ~120
```

---

## 📱 Responsive Classes

```css
/* Tailwind Breakpoints */
sm: 640px    (mobile landscape)
md: 768px    (tablet)
lg: 1024px   (desktop)
xl: 1280px   (large desktop)
2xl: 1536px  (extra large)

/* Usage */
text-3xl md:text-5xl lg:text-6xl
/* Mobile: 3xl, Tablet: 5xl, Desktop: 6xl */

grid-cols-1 md:grid-cols-2 lg:grid-cols-4
/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */
```

---

## 🎨 Tailwind Utility Classes

```css
/* Spacing */
p-4  (padding)      m-4  (margin)      space-y-4 (vertical gap)
pt-8 (padding-top)  mx-4 (margin horizontal)

/* Text */
text-xl          (font size)
font-bold        (font weight)
text-gray-600    (color)
text-center      (alignment)

/* Backgrounds */
bg-white         (background)
bg-gray-50       (light background)
from-blue-600    (gradient start)
to-blue-800      (gradient end)

/* Borders */
border-2         (border width)
border-gray-300  (border color)
rounded-lg       (border radius)

/* Display */
flex   (display flex)
grid   (display grid)
hidden (hidden)
absolute (positioning)

/* Hover Effects */
hover:bg-gray-100      (hover background)
hover:text-blue-600    (hover text color)
hover:shadow-lg        (hover shadow)
```

---

## 🔧 Common Component Props

### Button Component
```jsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button size="lg">Large</Button>
<Button className="custom-class">Custom</Button>
<Button disabled>Disabled</Button>
```

### Card Component
```jsx
<Card className="p-6 border border-gray-200">
  Card content here
</Card>
```

### Using Icons
```jsx
import { IconName } from 'lucide-react';

<IconName size={24} className="text-blue-600" />
```

---

## 🐛 Debug Tips

```javascript
// Check browser console (F12)
// Look for:
// - Red errors
// - Yellow warnings
// - Network tab for API calls

// Check DevTools
// Elements tab - Inspect styling
// Console tab - Check errors
// Network tab - Check resource loading

// Test responsive
// F12 → Toggle device toolbar (Ctrl+Shift+M)
// Test at: 375px, 768px, 1024px, 1440px
```

---

## 📦 Dependencies Reference

```json
{
  "next": "15.5.6",
  "react": "18.3.1",
  "tailwindcss": "3.4.1",
  "lucide-react": "0.475.0",
  "@radix-ui/react-*": "Latest"
}
```

**Add new package:**
```bash
npm install package-name
```

---

## 🚀 Deployment Commands

```bash
# Vercel (recommended)
npm install -g vercel
vercel

# Build check
npm run build
npm start

# Production mode
NODE_ENV=production npm run build
NODE_ENV=production npm start

# Docker
docker build -t shophub:latest .
docker run -p 3000:3000 shophub:latest
```

---

## 📊 Section IDs Map

```
Navbar navigates to:
#features  → id="features" (Features Section)
#products  → id="products" (TrendingProducts Section)
#reviews   → id="reviews" (Review Section)
#feedback  → id="feedback" (Feedbacks Section)
```

---

## ✅ Pre-Launch Checklist

```
Content:
- [ ] Brand name updated everywhere
- [ ] Product data updated
- [ ] Contact info updated
- [ ] All typos fixed

Functionality:
- [ ] All links working
- [ ] Forms working
- [ ] Buttons clickable
- [ ] Mobile menu works

Testing:
- [ ] Desktop view
- [ ] Mobile view (375px)
- [ ] Tablet view (768px)
- [ ] All browsers
- [ ] Console clear (no errors)

Performance:
- [ ] npm run build succeeds
- [ ] No warnings
- [ ] Page loads fast
- [ ] Images optimized
```

---

## 🎨 Color Palette Reference

```css
Blue:    blue-50 → blue-950
Red:     red-50 → red-950
Green:   green-50 → green-950
Purple:  purple-50 → purple-950
Pink:    pink-50 → pink-950
Orange:  orange-50 → orange-950

Gray:    gray-50 → gray-950
Neutral: neutral-50 → neutral-950
Slate:   slate-50 → slate-950

Using:
bg-blue-100      (light blue)
bg-blue-600      (medium blue)
bg-blue-900      (dark blue)
```

---

## 📞 Quick Help

**Issue:** Styling not applied
- Clear cache: `rm -rf .next`
- Restart: `npm run dev`

**Issue:** Build fails
- Check console for errors
- Run: `npm install` to update deps
- Check: `npm run lint` for syntax errors

**Issue:** Mobile looks wrong
- Check responsive classes
- Use DevTools device emulator
- Test width: 375px, 768px, 1024px

**Issue:** Slow performance
- Optimize images
- Check for large bundles
- Run: `npm run build` to check size

---

## 🎯 Section Component Map

```
app/page.tsx (Main Page)
├── Navbar
├── Hero
├── Features
├── TrendingProducts (NEW)
├── Review
├── Feedbacks
└── Footer
```

---

**Print this page & keep handy! 🖨️**

*Version 1.0 - Quick Reference Card*
*For detailed info, see CUSTOMIZATION_GUIDE.md*
