# 🗄️ Database Integration Guide

**Complete guide for working with Prisma, PostgreSQL, and database operations.**

---

## 📋 Table of Contents

1. [Database Setup](#database-setup)
2. [Prisma Basics](#prisma-basics)
3. [Schema Management](#schema-management)
4. [Migrations](#migrations)
5. [Database Operations](#database-operations)
6. [Relationships](#relationships)
7. [Queries & Optimization](#queries--optimization)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Database Setup

### Current Setup
```
Database:    PostgreSQL
Provider:    Neon (Cloud PostgreSQL)
ORM:         Prisma
Connection:  CONNECTION_STRING from .env
```

### Verify Connection
```bash
# Test database connection
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio
```

### Environment Variables
```bash
# In .env (development)
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"

# In .env.production (deployment)
DATABASE_URL="postgresql://user:password@neon.tech:5432/ecommerce"
```

---

## 📚 Prisma Basics

### Key Files
```
prisma/
├── schema.prisma    # Database schema definition
├── migrations/      # Migration history
│   ├── migration_lock.toml
│   └── 20251113131118_init/
│       └── migration.sql
└── seed.ts         # (Optional) Seed data script
```

### Common Commands
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (dev only)
npx prisma db push

# Create migration from schema changes
npx prisma migrate dev --name "add_new_field"

# Apply migrations to database
npx prisma migrate deploy

# Reset database (DEV ONLY - deletes all data)
npx prisma migrate reset

# View data in browser
npx prisma studio

# Format schema
npx prisma format

# Check schema validity
npx prisma validate
```

---

## 📋 Schema Management

### Current Schema

#### User Model
```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  password    String
  firstName   String?
  lastName    String?
  phoneNumber String?
  address     String?
  role        String    @default("customer")  // "customer" or "admin"
  
  // Relationships
  cart        Cart?
  orders      Order[]
  reviews     Review[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

#### Product Model
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  image       String?
  
  // Foreign Key
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  Int
  
  // Relationships
  reviews     Review[]
  cartItems   CartItem[]
  orderItems  OrderItem[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Category Model
```prisma
model Category {
  id       Int      @id @default(autoincrement())
  name     String   @unique
  products Product[]
}
```

#### Review Model
```prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  
  product   Product  @relation(fields: [productId], references: [id])
  productId Int
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Cart Model
```prisma
model Cart {
  id     String     @id @default(cuid())
  user   User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String     @unique
  items  CartItem[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### CartItem Model
```prisma
model CartItem {
  id        String   @id @default(cuid())
  
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  cartId    String
  
  product   Product  @relation(fields: [productId], references: [id])
  productId Int
  
  quantity  Int
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([cartId, productId])  // One product per cart
}
```

#### Order Model
```prisma
model Order {
  id        String      @id @default(cuid())
  
  user      User        @relation(fields: [userId], references: [id])
  userId    String
  
  items     OrderItem[]
  total     Float
  status    String      @default("pending")  // pending, shipped, delivered, cancelled
  
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```

#### OrderItem Model
```prisma
model OrderItem {
  id        String  @id @default(cuid())
  
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  orderId   String
  
  product   Product @relation(fields: [productId], references: [id])
  productId Int
  
  quantity  Int
  price     Float   // Price at time of order
}
```

---

## 🔄 Migrations

### Creating New Field

#### Step 1: Update Schema
```prisma
// In prisma/schema.prisma
model User {
  // ... existing fields
  company   String?  // NEW FIELD
}
```

#### Step 2: Create Migration
```bash
npx prisma migrate dev --name "add_company_to_user"
```

**Output:**
```
Create migration: prisma/migrations/20240101120000_add_company_to_user
✔ Your database has been updated
✔ Generated Prisma Client
```

#### Step 3: Verify
```bash
npx prisma studio
# Check User table has new company column
```

### Modifying Existing Field

```prisma
// Before
phoneNumber String?

// After - change to required
phoneNumber String  // Removed the ?

// For production migration:
phoneNumber String @default("") // Add default value first
```

Then:
```bash
npx prisma migrate dev --name "make_phone_number_required"
```

### Renaming Field

```bash
# Prisma will guide you through the process
npx prisma migrate dev --name "rename_field_name"
```

### Adding Relationship

```prisma
// Before
model User {
  id    String @id @default(cuid())
  email String @unique
}

// After
model User {
  id    String @id @default(cuid())
  email String @unique
  posts Post[]  // NEW relationship
}

model Post {
  id      String @id @default(cuid())
  title   String
  user    User   @relation(fields: [userId], references: [id])
  userId  String
}
```

Then:
```bash
npx prisma migrate dev --name "add_user_posts_relationship"
```

---

## 🔍 Database Operations

### Using Prisma Client

#### In Server Components / API Routes

```typescript
import { prisma } from '@/lib/prisma';

// CREATE
const newUser = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashed_password',
    firstName: 'John',
    lastName: 'Doe'
  }
});

// READ
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' }
});

// READ MULTIPLE
const users = await prisma.user.findMany({
  take: 10,
  skip: 0,
  orderBy: { createdAt: 'desc' }
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: 'user-id' },
  data: {
    firstName: 'Jane',
    phoneNumber: '+1234567890'
  }
});

// DELETE
await prisma.user.delete({
  where: { id: 'user-id' }
});

// UPSERT (update or create)
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { firstName: 'Updated' },
  create: { email: 'user@example.com', password: 'hash' }
});
```

#### With Relationships

```typescript
// CREATE with relationship
const cart = await prisma.cart.create({
  data: {
    userId: 'user-id',
    items: {
      create: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    }
  }
});

// READ with relationships
const userWithCart = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: {
    cart: {
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    }
  }
});

// UPDATE nested data
await prisma.cart.update({
  where: { userId: 'user-id' },
  data: {
    items: {
      create: {
        productId: 5,
        quantity: 1
      }
    }
  }
});

// DELETE cascade
await prisma.user.delete({
  where: { id: 'user-id' }
  // Auto-deletes: cart, orders, reviews (onDelete: Cascade)
});
```

---

## 🔗 Relationships

### One-to-One
```prisma
// User has ONE Cart
model User {
  id   String @id
  cart Cart?  // Optional
}

model Cart {
  id     String @id
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique  // Makes it one-to-one
}
```

**Query:**
```typescript
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: { cart: true }
});
```

### One-to-Many
```prisma
// User has MANY Orders
model User {
  id     String @id
  orders Order[]  // List of orders
}

model Order {
  id     String @id
  user   User   @relation(fields: [userId], references: [id])
  userId String
}
```

**Query:**
```typescript
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: {
    orders: {
      take: 10,
      orderBy: { createdAt: 'desc' }
    }
  }
});
```

### Many-to-Many (with Junction Table)
```prisma
// CartItem is a junction table
model Cart {
  id    String @id
  items CartItem[]
}

model CartItem {
  id        String @id
  cart      Cart   @relation(fields: [cartId], references: [id])
  cartId    String
  
  product   Product @relation(fields: [productId], references: [id])
  productId Int
  
  quantity  Int  // Extra data on junction
  
  @@unique([cartId, productId])
}

model Product {
  id        Int @id
  cartItems CartItem[]
}
```

**Query:**
```typescript
const cart = await prisma.cart.findUnique({
  where: { id: 'cart-id' },
  include: {
    items: {
      include: {
        product: true  // Get product details with quantity
      }
    }
  }
});
```

### Cascade Delete
```prisma
// When User is deleted, all related records are deleted
model User {
  id   String @id
  cart Cart?
}

model Cart {
  id     String @id
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String @unique
}
```

---

## 🚀 Queries & Optimization

### Filtering

```typescript
// Single condition
const users = await prisma.user.findMany({
  where: { role: 'customer' }
});

// Multiple conditions (AND)
const users = await prisma.user.findMany({
  where: {
    role: 'customer',
    email: { contains: 'gmail' }
  }
});

// OR condition
const users = await prisma.user.findMany({
  where: {
    OR: [
      { firstName: 'John' },
      { lastName: 'John' }
    ]
  }
});

// String operations
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: 'example',  // Case-insensitive
      mode: 'insensitive'
    }
  }
});

// Numeric operations
const products = await prisma.product.findMany({
  where: {
    price: {
      gte: 100,  // >=
      lte: 500   // <=
    }
  }
});

// Date filtering
const recentUsers = await prisma.user.findMany({
  where: {
    createdAt: {
      gte: new Date('2024-01-01')
    }
  }
});
```

### Sorting

```typescript
// Single sort
const users = await prisma.user.findMany({
  orderBy: { createdAt: 'desc' }
});

// Multiple sorts
const users = await prisma.user.findMany({
  orderBy: [
    { role: 'asc' },
    { firstName: 'asc' }
  ]
});

// By relationship count
const users = await prisma.user.findMany({
  orderBy: {
    orders: {
      _count: 'desc'  // Most orders first
    }
  }
});
```

### Pagination

```typescript
// Limit and offset
const page = 1;
const pageSize = 10;

const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' }
});

// Get total count
const total = await prisma.user.count();
const totalPages = Math.ceil(total / pageSize);
```

### Optimization Tips

#### 1. Use `select` instead of `include` to fetch only needed fields
```typescript
// Instead of fetching entire user object
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
  select: {
    id: true,
    email: true,
    firstName: true
    // Excludes: password, address, role, etc.
  }
});
```

#### 2. Batch Operations
```typescript
// Instead of loops, use createMany
const carts = await prisma.cart.createMany({
  data: [
    { userId: 'user1' },
    { userId: 'user2' },
    { userId: 'user3' }
  ]
});
```

#### 3. Index Frequently Queried Fields
```prisma
model User {
  id    String @id
  email String @unique  // Already indexed
  
  @@index([createdAt])  // Add index for date queries
}

model Product {
  id     Int @id
  name   String
  
  @@fulltext([name])  // Full-text search index
}
```

#### 4. Use Transaction for Multiple Operations
```typescript
const [user, cart] = await prisma.$transaction([
  prisma.user.create({ data: { email, password } }),
  prisma.cart.create({ data: { userId } })
]);
```

---

## 📊 Seeding Database

### Create Seed File

**prisma/seed.ts:**
```typescript
import { prisma } from '@/lib/prisma';

async function main() {
  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' }
  });

  const accessories = await prisma.category.create({
    data: { name: 'Accessories' }
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling headphones',
      price: 199.99,
      stock: 50,
      categoryId: electronics.id
    }
  });

  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed_password_here',
      firstName: 'Test',
      lastName: 'User',
      role: 'customer',
      cart: {
        create: {}
      }
    }
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Add to package.json
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

### Run Seed
```bash
npx prisma db seed
```

---

## 🐛 Troubleshooting

### Issue: Prisma Client not initialized
```
Error: Prisma Client is not initialized yet
```

**Solution:**
```bash
# Regenerate client
npx prisma generate

# Verify singleton pattern in lib/prisma.ts is used
```

### Issue: Migration conflicts
```
Error: P3014 - Migration failed
```

**Solution:**
```bash
# Reset database (DEV ONLY - deletes data)
npx prisma migrate reset

# Or manually resolve migration
npx prisma migrate resolve --rolled-back "migration_name"
```

### Issue: Schema validation error
```
Error: The provided database string is invalid
```

**Solution:**
```bash
# Check .env file
echo $DATABASE_URL

# Verify connection string format
# Format: postgresql://user:password@host:port/database
```

### Issue: Relationship constraint error
```
Error: Foreign key constraint violation
```

**Solution:**
```typescript
// Ensure related record exists before creating
const product = await prisma.product.findUnique({
  where: { id: 1 }
});

if (product) {
  // Safe to create CartItem
  await prisma.cartItem.create({
    data: {
      cartId: 'cart-id',
      productId: 1,
      quantity: 1
    }
  });
}
```

### Issue: Slow queries
```bash
# Enable query logging in schema.prisma
log = ["query", "error", "warn"]

# Check for missing indexes
npx prisma studio
# Look for frequently filtered fields
```

**Solution:**
```prisma
// Add indexes for frequently queried fields
model User {
  id    String @id
  email String @unique
  
  @@index([createdAt])
  @@index([role])
}
```

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

**Version:** 1.0  
**Last Updated:** November 13, 2024  
**Status:** ✅ Complete & Production Ready

Built with Prisma + PostgreSQL for reliable, type-safe database operations.
