# Authentication API Documentation

## Setup Instructions

### 1. Database Setup

Run the SQL schema file to create all tables:

```bash
mysql -u root -p < src/main/resources/db/migration/schema.sql
```

### 2. Update Application Properties

Edit `src/main/resources/application.properties`:

**Database:**

```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

**JWT Secret (Generate a secure 256-bit key):**

```properties
jwt.secret=YOUR_BASE64_ENCODED_SECRET_KEY_HERE
```

**Google OAuth2:**

```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
```

### 3. Get Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:8080/login/oauth2/code/google`
   - `http://localhost:8080/oauth2/callback/google`
6. Copy Client ID and Client Secret to application.properties

---

## API Endpoints

### 1. Register (Email/Password)

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Validation Rules:**

- First name: Required, max 100 characters
- Last name: Required, max 100 characters
- Email: Required, valid email format
- Password: Required, min 8 characters
- Phone: Optional, max 20 characters

---

### 2. Login (Email/Password)

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Google Login

**Option A: Direct Browser Flow**

Navigate to:

```
http://localhost:8080/oauth2/authorization/google
```

This will:

1. Redirect to Google login page
2. User authorizes the app
3. Redirect back to your app with tokens
4. Frontend receives tokens at: `http://localhost:5173/auth/callback?token=...&refreshToken=...`

**Option B: Manual Callback (for testing)**

**GET** `/api/auth/google/callback?email=user@gmail.com&googleId=123456&firstName=John&lastName=Doe`

**Response:**

```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "email": "user@gmail.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## Testing with cURL

### Register

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "phone": "+1234567890"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123"
  }'
```

### Access Protected Endpoint

```bash
curl -X GET http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Frontend Integration (React Example)

### 1. Email/Password Registration

```javascript
const register = async (formData) => {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    // Redirect to dashboard
  }
};
```

### 2. Email/Password Login

```javascript
const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    // Redirect to dashboard
  }
};
```

### 3. Google Login Button

```javascript
const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

// In your callback page (e.g., /auth/callback)
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const refreshToken = params.get("refreshToken");

  if (token && refreshToken) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    // Redirect to dashboard
  }
}, []);
```

### 4. Using JWT Token in Requests

```javascript
const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
```

---

## Security Features Implemented

✅ **Password Hashing**: BCrypt with salt
✅ **JWT Tokens**: Access & refresh tokens
✅ **OAuth2**: Google login integration
✅ **Event Tracking**: Signup/login events logged
✅ **Account Linking**: Google accounts can be linked to existing email accounts
✅ **Email Verification**: Field ready for future implementation
✅ **Account Status**: Can deactivate users
✅ **Session Management**: Last login timestamp tracking

---

## Common Errors

### Email Already Registered

```json
{
  "success": false,
  "message": "Email is already registered"
}
```

### Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": "Email should be valid",
    "password": "Password must be at least 8 characters"
  }
}
```

### Account Deactivated

```json
{
  "success": false,
  "message": "Account is deactivated"
}
```

---

## Next Steps

1. ✅ Email/Password Registration & Login
2. ✅ Google OAuth2 Login
3. 🔲 Email Verification Flow
4. 🔲 Password Reset Flow
5. 🔲 Refresh Token Endpoint
6. 🔲 User Profile Management
7. 🔲 Apple Sign-In Integration
