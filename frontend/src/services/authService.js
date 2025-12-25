import api from "./api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise} Registration response with tokens
   */
  async register(userData) {
    try {
      // Split name into firstName and lastName
      const nameParts = userData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName; // Use firstName as lastName if only one name provided

      const response = await api.post("/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: userData.email,
        password: userData.password,
      });

      if (response.data.success && response.data.data) {
        this.setAuthData(response.data.data);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Login user with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise} Login response with tokens
   */
  async login(credentials) {
    try {
      const response = await api.post("/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.success && response.data.data) {
        this.setAuthData(response.data.data);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Initiate Google OAuth login
   * Redirects to backend OAuth endpoint
   */
  googleLogin() {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  }

  /**
   * Initiate Apple OAuth login
   * Redirects to backend OAuth endpoint
   */
  appleLogin() {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/apple`;
  }

  /**
   * Handle OAuth callback and extract token from URL
   * @returns {Object|null} Auth data if token found in URL
   */
  handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (error) {
      throw new Error(decodeURIComponent(error));
    }

    if (token) {
      try {
        // The token is URL-encoded JSON
        const authData = JSON.parse(decodeURIComponent(token));
        this.setAuthData(authData);

        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        return authData;
      } catch (e) {
        console.error("Failed to parse OAuth token:", e);
        throw new Error("Invalid authentication response");
      }
    }

    return null;
  }

  /**
   * Logout user and clear stored data
   */
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  /**
   * Store authentication data in localStorage
   * @param {Object} data - Auth response data
   */
  setAuthData(data) {
    // Handle both 'token' and 'accessToken' field names
    const accessToken = data.accessToken || data.token;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    // Store user info from response
    const user = data.user || {
      id: data.userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      name:
        data.firstName && data.lastName
          ? `${data.firstName} ${data.lastName}`
          : data.email,
    };
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has valid token
   */
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }

  /**
   * Get access token
   * @returns {string|null} Access token or null
   */
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  /**
   * Handle API errors
   * @param {Error} error - Axios error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "An error occurred";
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error(
        "No response from server. Please check your connection.",
      );
    } else {
      // Something else happened
      return new Error(error.message || "An unexpected error occurred");
    }
  }
}

export default new AuthService();
