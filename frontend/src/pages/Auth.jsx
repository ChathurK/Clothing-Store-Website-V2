import { useState, useEffect } from "react";
import { useFormik, validateYupSchema } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  EnvelopeIcon,
  LockKeyIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  GoogleLogoIcon,
  AppleLogoIcon,
} from "@phosphor-icons/react";
import Header from "../components/layout/Header";
import Footer_Bottom from "../components/layout/Footer/Footer_Bottom";
import authService from "../services/authService";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Update page title based on login/register state
  useEffect(() => {
    document.title = isLogin ? "Login - Integral" : "Register - Integral";
  }, [isLogin]);

  // Handle OAuth callback on component mount
  useEffect(() => {
    try {
      const authData = authService.handleOAuthCallback();
      if (authData) {
        // Redirect immediately to home page
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  }, [navigate]);

  // Login validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Registration validation schema
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .lowercase()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character",
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Login form
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.login(values);
        setSuccessMessage(response.message || "Login successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 1500);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // Registration form
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const { confirmPassword, ...registerData } = values;
        const response = await authService.register(registerData);
        setSuccessMessage(response.message || "Registration successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 1500);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const currentForm = isLogin ? loginForm : registerForm;

  const handleOAuthLogin = (provider) => {
    setError(null);
    if (provider === "Google") {
      authService.googleLogin();
    } else if (provider === "Apple") {
      authService.appleLogin();
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    loginForm.resetForm();
    registerForm.resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16 sm:pt-12 dark:bg-black">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:min-h-[calc(100vh-3rem)] sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isLogin ? "Sign in to your account" : "Join us today"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-red-800 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <p className="text-sm text-green-800 dark:text-green-400">
                  {successMessage}
                </p>
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin("Google")}
                disabled={loading}
                className="dark:active:border-black-300 flex h-12 w-full items-center justify-center gap-3 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 active:border-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
              >
                <GoogleLogoIcon size={20} weight="bold" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin("Apple")}
                disabled={loading}
                className="dark:active:border-black-300 flex h-12 w-full items-center justify-center gap-3 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 active:border-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
              >
                <AppleLogoIcon size={20} weight="fill" />
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 px-2 text-gray-500 dark:bg-black dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={currentForm.handleSubmit} className="space-y-6">
              {/* Name field - only for registration */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="relative mt-1">
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserIcon
                        size={20}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    </div> */}
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`block w-full border ${
                        registerForm.touched.name && registerForm.errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-black focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
                      } bg-white px-3 py-3 text-gray-900 placeholder-gray-400 placeholder:italic focus:ring-1 focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder-gray-500`}
                      placeholder="Enter your full name"
                      value={registerForm.values.name}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                    />
                  </div>
                  {registerForm.touched.name && registerForm.errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {registerForm.errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="relative mt-1">
                  {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon
                      size={20}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </div> */}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full border ${
                      currentForm.touched.email && currentForm.errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-black focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
                    } bg-white px-3 py-3 text-gray-900 placeholder-gray-400 placeholder:italic focus:ring-1 focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder-gray-500`}
                    placeholder="Enter your email"
                    value={currentForm.values.email}
                    onChange={currentForm.handleChange}
                    onBlur={currentForm.handleBlur}
                  />
                </div>
                {currentForm.touched.email && currentForm.errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {currentForm.errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockKeyIcon
                      size={20}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </div> */}
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    className={`block w-full border ${
                      currentForm.touched.password &&
                      currentForm.errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-black focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
                    } bg-white py-3 pr-10 pl-3 text-gray-900 placeholder-gray-400 placeholder:italic focus:ring-1 focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder-gray-500`}
                    placeholder="Enter your password"
                    value={currentForm.values.password}
                    onChange={currentForm.handleChange}
                    onBlur={currentForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeSlashIcon
                        size={20}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 active:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:active:text-gray-300"
                      />
                    ) : (
                      <EyeIcon
                        size={20}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 active:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:active:text-gray-300"
                      />
                    )}
                  </button>
                </div>
                {currentForm.touched.password &&
                  currentForm.errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {currentForm.errors.password}
                    </p>
                  )}
              </div>

              {/* Confirm Password field - only for registration */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockKeyIcon
                        size={20}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    </div> */}
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className={`block w-full border ${
                        registerForm.touched.confirmPassword &&
                        registerForm.errors.confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-black focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
                      } bg-white py-3 pr-10 pl-3 text-gray-900 placeholder-gray-400 placeholder:italic focus:ring-1 focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder-gray-500`}
                      placeholder="Confirm your password"
                      value={registerForm.values.confirmPassword}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon
                          size={20}
                          className="cursor-pointer text-gray-400 hover:text-gray-600 active:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:active:text-gray-300"
                        />
                      ) : (
                        <EyeIcon
                          size={20}
                          className="cursor-pointer text-gray-400 hover:text-gray-600 active:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:active:text-gray-300"
                        />
                      )}
                    </button>
                  </div>
                  {registerForm.touched.confirmPassword &&
                    registerForm.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {registerForm.errors.confirmPassword}
                      </p>
                    )}
                </div>
              )}

              {/* Forgot password link - only for login */}
              {isLogin && (
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-black hover:underline dark:text-white"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <div className="group relative w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative z-10 w-full cursor-pointer px-4 py-3 font-medium text-white inset-ring inset-ring-black transition-colors duration-500 group-hover:text-black group-active:text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-black dark:inset-ring-white dark:group-hover:text-white dark:group-active:text-white"
                >
                  {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Sign in"
                      : "Create account"}
                </button>
                <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-500 group-hover:w-full group-active:w-full dark:bg-black" />
                <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-500 group-hover:w-0 group-active:w-0 dark:bg-white" />
              </div>
            </form>

            {/* Toggle auth mode */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-medium text-black hover:underline dark:text-white"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer_Bottom />
    </>
  );
};

export default Auth;
