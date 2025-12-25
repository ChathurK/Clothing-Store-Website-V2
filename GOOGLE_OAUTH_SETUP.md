# Google OAuth Setup Guide

This guide explains how to set up Google OAuth login for the Integral Clothing Store application.

## Prerequisites

- A Google Cloud Platform account
- Backend Spring Boot application running on `http://localhost:8080`
- Frontend React application running on `http://localhost:5173`

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:

   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Configure the OAuth consent screen if prompted

5. Configure the OAuth client:

   - **Name**: Integral Clothing Store (or any name)
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     http://localhost:8080
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:8080/login/oauth2/code/google
     ```

6. Click "Create" and copy the Client ID and Client Secret

## Step 2: Update Backend Configuration

1. Open `backend/src/main/resources/application.properties`

2. Replace the placeholder values with your Google credentials:

   ```properties
   # Google OAuth2
   spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
   spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
   ```

3. Save the file and restart the backend application

## Step 3: Test the Integration

### Backend is already running (Exit Code: 0) ✅

1. **Start the frontend** (if not already running):

   ```bash
   cd frontend
   npm install  # if dependencies aren't installed
   npm run dev
   ```

2. **Navigate to** `http://localhost:5173/auth`

3. **Click "Continue with Google"**:
   - You'll be redirected to Google's login page
   - Sign in with your Google account
   - Grant permissions to the application
   - You'll be redirected back to the app with authentication complete

## How It Works

### Frontend Flow:

1. User clicks "Continue with Google" button
2. Frontend redirects to: `http://localhost:8080/oauth2/authorization/google`
3. Backend redirects to Google's OAuth consent screen
4. User authorizes the application
5. Google redirects back to: `http://localhost:8080/login/oauth2/code/google`
6. Backend processes the OAuth code and generates JWT tokens
7. Backend redirects to: `http://localhost:5173/auth?token={encodedAuthData}`
8. Frontend extracts the token from URL and stores it in localStorage
9. User is redirected to the home page

### Authentication Data Stored:

The following data is stored in localStorage after successful authentication:

- `accessToken`: JWT token for API requests (24 hours expiry)
- `refreshToken`: Token for refreshing access token (7 days expiry)
- `user`: User profile information (name, email, etc.)

### API Integration:

All API requests automatically include the JWT token in the Authorization header:

```javascript
Authorization: Bearer {accessToken}
```

## Email/Password Authentication

The application also supports traditional email/password authentication:

### Register:

```javascript
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Login:

```javascript
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Both endpoints return:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "tokenType": "Bearer",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

## Protected Routes (Future Implementation)

To protect routes in the frontend:

```javascript
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// Usage in routes:
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>;
```

## API Service Usage

The authentication service provides these methods:

```javascript
import authService from "../services/authService";

// Register
await authService.register({ name, email, password });

// Login
await authService.login({ email, password });

// Google OAuth (redirects)
authService.googleLogin();

// Apple OAuth (redirects)
authService.appleLogin();

// Handle OAuth callback
authService.handleOAuthCallback();

// Logout
authService.logout();

// Check authentication
const isAuth = authService.isAuthenticated();

// Get current user
const user = authService.getCurrentUser();

// Get access token
const token = authService.getAccessToken();
```

## Troubleshooting

### "Redirect URI mismatch" error:

- Ensure the redirect URI in Google Cloud Console exactly matches:
  `http://localhost:8080/login/oauth2/code/google`
- No trailing slashes
- Correct port number (8080 for backend)

### "Invalid client" error:

- Check that Client ID and Client Secret are correctly copied
- No extra spaces or line breaks
- Restart backend after updating configuration

### CORS errors:

- Frontend origin (`http://localhost:5173`) is already configured in backend
- If using different port, update `cors.allowed-origins` in application.properties

### Token not being stored:

- Check browser console for errors
- Ensure localStorage is enabled
- Check if URL contains `?token=` parameter after OAuth redirect

## Security Notes

⚠️ **Important for Production:**

1. **JWT Secret**: Replace the JWT secret in `application.properties` with a strong, Base64-encoded 256-bit key:

   ```bash
   # Generate a secure key:
   openssl rand -base64 32
   ```

2. **CORS Origins**: Update allowed origins to your production domain:

   ```properties
   cors.allowed-origins=https://yourdomain.com
   ```

3. **OAuth Redirect URIs**: Add production URLs in Google Cloud Console:

   ```
   https://api.yourdomain.com/login/oauth2/code/google
   ```

4. **HTTPS**: Always use HTTPS in production for OAuth callbacks

5. **Environment Variables**: Store sensitive credentials in environment variables, not in code

## Next Steps

- [ ] Set up refresh token endpoint
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Set up Apple OAuth (similar to Google)
- [ ] Add user profile management
- [ ] Implement role-based access control
