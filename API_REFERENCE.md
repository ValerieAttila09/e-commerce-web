# 📚 API Reference - Authentication & E-Commerce

**Complete API documentation for all authentication and e-commerce endpoints.**

---

## 🎯 Base URL

```
Development:  http://localhost:3001
Production:   https://yourdomain.com
```

---

## 🔐 Authentication Endpoints

### 1. POST /api/auth/signup
Create a new user account with email and password.

**Endpoint:** `POST /api/auth/signup`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Request Parameters:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| email | string | Yes | Valid email format, unique |
| password | string | Yes | Min 6 characters |
| firstName | string | No | - |
| lastName | string | No | - |

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "clxyz123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": null,
    "address": null,
    "role": "customer"
  }
}
```

**Error Responses:**

400 - Validation Error:
```json
{
  "message": "Email is required"
}
```

409 - Email Already Registered:
```json
{
  "message": "Email already registered"
}
```

500 - Server Error:
```json
{
  "message": "Something went wrong. Please try again later."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**JavaScript/Fetch Example:**
```javascript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123',
    firstName: 'John',
    lastName: 'Doe'
  })
});

const data = await response.json();
if (response.ok) {
  console.log('User created:', data.user);
} else {
  console.error('Signup failed:', data.message);
}
```

**What Happens:**
1. Validates all required fields
2. Checks if email already exists
3. Hashes password with bcryptjs (10 salt rounds)
4. Creates user in database
5. Automatically creates empty cart for user
6. Generates JWT token
7. Sets HTTP-only secure cookie
8. Returns user object

**Side Effects:**
- User record created in database
- Cart record created automatically
- JWT cookie set (expires in 7 days)

---

### 2. POST /api/auth/login
Authenticate user with email and password.

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Request Parameters:**

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| email | string | Yes | - |
| password | string | Yes | - |

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "clxyz123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main St",
    "role": "customer"
  }
}
```

**Error Responses:**

400 - Missing Fields:
```json
{
  "message": "Email and password are required"
}
```

401 - Invalid Credentials:
```json
{
  "message": "Invalid email or password"
}
```

500 - Server Error:
```json
{
  "message": "Something went wrong. Please try again later."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }' \
  -c cookies.txt
```

**JavaScript/Fetch Example:**
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123'
  }),
  credentials: 'include' // Important for cookies
});

const data = await response.json();
if (response.ok) {
  console.log('Logged in as:', data.user.email);
} else {
  console.error('Login failed:', data.message);
}
```

**What Happens:**
1. Validates email and password are provided
2. Finds user by email
3. Verifies password hash using bcryptjs
4. Generates new JWT token
5. Sets HTTP-only secure cookie
6. Returns user object

**Cookie Details:**
```
Name: auth-token
Value: JWT token
Expires: 7 days
HttpOnly: true
Secure: true (in production)
SameSite: Lax
```

**Security Notes:**
- Uses generic error message for both wrong email and password
- Password never logged or sent in response
- Constant-time password comparison prevents timing attacks

---

### 3. POST /api/auth/logout
Clear authentication and logout current user.

**Endpoint:** `POST /api/auth/logout`

**Request:**
No request body required. Uses cookie for authentication.

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Error Responses:**

500 - Server Error:
```json
{
  "message": "Something went wrong. Please try again later."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -b cookies.txt
```

**JavaScript/Fetch Example:**
```javascript
const response = await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include' // Include cookies
});

const data = await response.json();
if (response.ok) {
  console.log(data.message); // "Logout successful"
  // Redirect to login or home
} else {
  console.error('Logout failed:', data.message);
}
```

**What Happens:**
1. Clears the auth-token cookie
2. Returns success message
3. Client should redirect to login/home

**Side Effects:**
- Auth cookie deleted
- User session ended
- All protected routes now require re-login

---

### 4. GET /api/auth/me
Get current authenticated user information.

**Endpoint:** `GET /api/auth/me`

**Request:**
No request body. Uses cookie for authentication.

**Headers:**
```
Cookie: auth-token=<JWT_TOKEN>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "clxyz123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main St",
    "role": "customer",
    "createdAt": "2024-11-13T10:30:00Z",
    "updatedAt": "2024-11-13T10:30:00Z"
  }
}
```

**Error Responses:**

401 - Unauthorized (No valid token):
```json
{
  "message": "Unauthorized"
}
```

403 - Forbidden (Invalid or expired token):
```json
{
  "message": "Forbidden"
}
```

500 - Server Error:
```json
{
  "message": "Something went wrong. Please try again later."
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Cookie: auth-token=<JWT_TOKEN>"
```

**With Saved Cookies:**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -b cookies.txt
```

**JavaScript/Fetch Example:**
```javascript
const response = await fetch('/api/auth/me', {
  method: 'GET',
  credentials: 'include' // Include cookies
});

if (response.ok) {
  const data = await response.json();
  console.log('Current user:', data.user);
} else if (response.status === 401) {
  console.log('Not authenticated');
  // Redirect to login
} else {
  console.error('Error fetching user');
}
```

**What Happens:**
1. Retrieves JWT token from cookie
2. Verifies token validity and expiration
3. Fetches user from database
4. Returns user object if valid
5. Returns 401 if not authenticated

**Common Use Cases:**
- Check if user is logged in
- Get current user data on page load
- Update user info in app state
- Verify auth on protected pages

**Token Verification:**
- Token must be valid JWT
- Token must not be expired (expires in 7 days)
- User must exist in database
- Token signature must be valid

---

## 📦 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Login successful, user fetched |
| 201 | Created | User registered successfully |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | Invalid credentials or no token |
| 403 | Forbidden | Token expired or invalid |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Database error, unexpected error |

---

## 🔒 Authentication Details

### JWT Token Structure
```
Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJjbHh5ejEyMyIsImlhdCI6MTczMTA1NzAwMCwiZXhwIjoxNzMxNjYyMDB9.
zH3r7K9pLmQ2vX4bN6wY8aZ1cD5eF9gH3jK7lM...
```

### Token Payload
```json
{
  "userId": "clxyz123abc",
  "iat": 1731057000,
  "exp": 1731662800
}
```

### Cookie Details
```
Name:     auth-token
HttpOnly: true (cannot be accessed by JavaScript)
Secure:   true (only sent over HTTPS in production)
SameSite: Lax (protection against CSRF)
Path:     / (available to all routes)
MaxAge:   604800 seconds (7 days)
```

---

## 🛡️ Security Best Practices

### For Frontend Developers

**DO:**
✅ Always use `credentials: 'include'` in fetch requests
✅ Never store tokens in localStorage
✅ Use HTTP-only cookies (automatic)
✅ Validate email format client-side
✅ Require strong passwords
✅ Show password strength indicator

**DON'T:**
❌ Log sensitive data in console
❌ Send password unencrypted
❌ Store tokens in localStorage
❌ Share JWT tokens
❌ Skip validation
❌ Cache sensitive data

### For Backend Developers

**DO:**
✅ Always hash passwords (bcryptjs with 10+ rounds)
✅ Verify JWT tokens on protected routes
✅ Use HTTP-only secure cookies
✅ Validate all input
✅ Use environment variables for secrets
✅ Log security events (logins, failures)

**DON'T:**
❌ Log password hashes
❌ Return passwords in responses
❌ Accept unvalidated input
❌ Use weak JWT secrets
❌ Share JWT secret with frontend
❌ Store plaintext passwords

---

## 🔄 Complete Auth Flow Example

### Step 1: Signup
```bash
POST /api/auth/signup
→ User created
→ Cart created
→ JWT cookie set
```

### Step 2: Login on Next Visit
```bash
POST /api/auth/login
→ JWT cookie set
```

### Step 3: Get User Data
```bash
GET /api/auth/me
→ Returns user object
```

### Step 4: Make Authenticated Requests
```bash
POST /api/cart/add (include auth cookie)
→ Adds item to user's cart
```

### Step 5: Logout
```bash
POST /api/auth/logout
→ JWT cookie cleared
→ User session ended
```

---

## 🧪 Testing Examples

### Test Valid Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }' \
  -v
```

**Expected:**
- Status: 200
- Response: User object
- Set-Cookie header with auth-token

### Test Invalid Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "WrongPassword"
  }'
```

**Expected:**
- Status: 401
- Response: "Invalid email or password"

### Test Protected Route Without Auth
```bash
curl -X GET http://localhost:3001/api/auth/me
```

**Expected:**
- Status: 401
- Response: "Unauthorized"

### Test Protected Route With Auth
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -b cookies.txt
```

**Expected:**
- Status: 200
- Response: User object

---

## 📝 Implementation Checklist

When implementing authentication on frontend:

- [ ] Import useAuthStore from Zustand
- [ ] Call login/signup/logout methods
- [ ] Handle loading state
- [ ] Display error messages
- [ ] Redirect on auth success/failure
- [ ] Check auth status on page load
- [ ] Protect routes (redirect if not authenticated)
- [ ] Update UI based on auth state

### Example Implementation
```typescript
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginPage() {
  const { login, isLoading, error } = useAuthStore();
  
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Store handles redirect
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {error && <div className="error">{error}</div>}
      {isLoading && <spinner />}
      {/* Form fields */}
    </form>
  );
}
```

---

## 🚀 Deployment Considerations

### Environment Variables
```bash
# Add to .env.production
DATABASE_URL=your_production_database_url
JWT_SECRET=super_long_random_string_min_32_chars_production_only
NODE_ENV=production
```

### CORS Configuration
```typescript
// In next.config.ts for production domain
module.exports = {
  async headers() {
    return [{
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://yourdomain.com'
        }
      ]
    }];
  }
};
```

### Cookie Settings for Production
```typescript
// In lib/auth.ts
const isProduction = process.env.NODE_ENV === 'production';
// Cookie secure flag automatically set to true in production
```

---

## 📞 Support & Troubleshooting

### Common Issues

**"Unauthorized" on protected routes:**
- Check cookie is being sent
- Verify JWT_SECRET is correct
- Check token hasn't expired
- Clear browser cookies and retry

**"Email already registered":**
- Use different email
- Or reset database if testing

**Password not matching:**
- Verify password >= 6 chars
- Check for typos/spaces
- Verify caps lock is off

**CORS errors:**
- Check domain is whitelisted
- Verify Content-Type header
- Add credentials: 'include'

---

**Version:** 1.0  
**Last Updated:** November 13, 2024  
**Status:** ✅ Complete & Production Ready

For more information, see AUTH_SYSTEM_GUIDE.md and TESTING_GUIDE.md
