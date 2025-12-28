import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonStarsIcon,
  HeartIcon,
  UserCircleIcon,
  ListIcon,
  XIcon,
  YoutubeLogoIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const ProductsHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFavoriteDropdown, setShowFavoriteDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(
    localStorage.getItem("favorites")?.length || 0,
  ); // This will be dynamic later
  const [isLoggedIn] = useState(false); // This will be dynamic later
  const lastScrollYRef = useRef(window.scrollY);

  const socialLinks = [
    { icon: YoutubeLogoIcon, url: "https://youtube.com", label: "YouTube" },
    { icon: InstagramLogoIcon, url: "https://instagram.com", label: "Instagram" },
    { icon: FacebookLogoIcon, url: "https://facebook.com", label: "Facebook" },
    { icon: TiktokLogoIcon, url: "https://tiktok.com", label: "TikTok" },
  ];

  useEffect(() => {
    // const favoriteCountFromStorage = JSON.parse(localStorage.getItem("favorites")||"[]").length;
    // setFavoriteCount(favoriteCountFromStorage);

    const handleScroll = () => {
      const headerHeight =
        document.getElementsByTagName("header")[0].offsetHeight;
      const currentScrollY = window.scrollY;

      // Show/hide header based on scroll direction
      if (
        currentScrollY > lastScrollYRef.current &&
        currentScrollY > headerHeight
      ) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowFavoriteDropdown(false);
      setShowProfileDropdown(false);
      setIsMobileMenuOpen(false);
    };

    if (showFavoriteDropdown || showProfileDropdown || isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showFavoriteDropdown, showProfileDropdown, isMobileMenuOpen]);

  useEffect(() => {
    const favoriteCountFromStorage = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    ).length;
    setFavoriteCount(favoriteCountFromStorage);
  }, []);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesChange = () => {
      const favoriteCountFromStorage = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      ).length;
      setFavoriteCount(favoriteCountFromStorage);
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    return () =>
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
  }, []);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setShowFavoriteDropdown(!showFavoriteDropdown);
    setShowProfileDropdown(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
    setShowFavoriteDropdown(false);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowFavoriteDropdown(false);
    setShowProfileDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 bg-white/60 backdrop-blur-xs transition-all duration-500 dark:bg-black/60 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="dark:border-b-black-300 border-b">
        <div className="flex h-16 items-center justify-between sm:h-12">
          {/* Left: Social Links (Desktop Only) */}
          <div className="hidden h-full md:flex">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-black-700 dark:border-r-black-300 dark:text-black-300 flex size-full w-16 items-center justify-center border-r border-r-black transition-colors duration-300 hover:bg-black hover:text-white md:w-12 dark:hover:bg-white dark:hover:text-black"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link to="/" className="block">
              <picture>
                <source
                  srcSet={`${import.meta.env.BASE_URL}/logo_black.avif`}
                  type="image/avif"
                />
                <source
                  srcSet={`${import.meta.env.BASE_URL}/logo_black.webp`}
                  type="image/webp"
                />
                <img
                  src={`${import.meta.env.BASE_URL}/logo_black.png`}
                  alt="Logo"
                  className="h-8 w-auto text-black md:h-10 dark:text-white"
                />
              </picture>
            </Link>
          </div>

          {/* Right: Theme Toggle, Favorite, Profile (Desktop) */}
          <div className="hidden h-full md:flex">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group dark:border-l-black-300 flex h-full w-16 cursor-pointer items-center justify-center border-l transition-colors duration-300 hover:bg-black md:w-12 dark:hover:bg-white"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonStarsIcon
                  size={20}
                  className="text-black-700 transition-colors duration-300 group-hover:text-white"
                />
              ) : (
                <SunIcon
                  size={20}
                  className="dark:text-black-300 transition-colors duration-300 group-hover:text-black"
                />
              )}
            </button>

            {/* Favorite */}
            <div className="dark:border-l-black-300 relative h-full w-16 border-l md:w-12">
              <button
                onClick={handleFavoriteClick}
                className="group relative flex size-full cursor-pointer items-center justify-center transition-colors duration-300 hover:bg-black dark:hover:bg-white"
                aria-label="Favorites"
              >
                <HeartIcon
                  size={20}
                  weight={favoriteCount > 0 ? "fill" : "regular"}
                  className="text-black-700 dark:text-black-300 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black"
                />
                {favoriteCount > 0 && (
                  <span className="absolute top-0 left-0 flex items-center justify-center bg-black px-[0.2rem] text-xs font-medium text-white dark:bg-white dark:text-black">
                    {favoriteCount}
                  </span>
                )}
              </button>

              {/* Favorite Dropdown */}
              {showFavoriteDropdown && (
                <div className="dark:bg-black-900 dark:border-black-300 absolute right-0 mt-2 w-64 border bg-white p-4 shadow-lg">
                  {isLoggedIn ? (
                    <p className="text-sm text-gray-600 dark:text-white">
                      Your favorites list is empty
                    </p>
                  ) : (
                    <div className="text-center">
                      <p className="text-black-600 mb-3 text-sm dark:text-white">
                        Please login to view favorites
                      </p>
                      <button
                        onClick={() => navigate("/auth")}
                        className="hover:bg-black-800 dark:hover:bg-black-100 w-full cursor-pointer bg-black px-4 py-2 font-medium text-white transition-colors dark:bg-white dark:text-black"
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="dark:border-l-black-300 relative h-full w-16 border-l md:w-12">
              <button
                onClick={handleProfileClick}
                className="group flex size-full cursor-pointer items-center justify-center transition-colors duration-300 hover:bg-black dark:hover:bg-white"
                aria-label="User profile"
              >
                <UserCircleIcon
                  size={20}
                  className="text-black-700 dark:text-black-300 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black"
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="dark:bg-black-900 dark:border-black-300 absolute right-1/2 mt-2 w-48 border bg-white p-4 shadow-lg">
                  {isLoggedIn ? (
                    <div>
                      <p className="mb-2 text-sm font-medium">John Doe</p>
                      <button className="text-black-600 dark:text-black-400 w-full py-1 text-left text-sm hover:text-black dark:hover:text-white">
                        Profile
                      </button>
                      <button className="text-black-600 dark:text-black-400 w-full py-1 text-left text-sm hover:text-black dark:hover:text-white">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/auth")}
                      className="hover:bg-black-800 dark:hover:bg-black-100 w-full cursor-pointer bg-black px-4 py-2 font-medium text-white transition-colors dark:bg-white dark:text-black"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Side: Favorite, Profile, Menu */}
          <div className="flex h-full md:hidden">
            {/* Favorite (Mobile) */}
            <div className="dark:border-l-black-300 relative h-full w-16 border-l sm:w-12">
              <button
                onClick={handleFavoriteClick}
                className="group relative flex size-full cursor-pointer items-center justify-center transition-colors hover:bg-black active:bg-black dark:hover:bg-white dark:active:bg-white"
                aria-label="Favorites"
              >
                <HeartIcon
                  size={20}
                  weight={favoriteCount > 0 ? "fill" : "regular"}
                  className="text-black-700 dark:text-black-300 transition-colors group-hover:text-white group-active:text-white dark:group-hover:text-black dark:group-active:text-black"
                />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-medium text-white dark:bg-white dark:text-black">
                    {favoriteCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile (Mobile) */}
            <div className="dark:border-l-black-300 relative h-full w-16 border-l sm:w-12">
              <button
                onClick={handleProfileClick}
                className="group flex size-full cursor-pointer items-center justify-center transition-colors hover:bg-black active:bg-black dark:hover:bg-white dark:active:bg-white"
                aria-label="User profile"
              >
                <UserCircleIcon
                  size={20}
                  className="text-black-700 dark:text-black-300 transition-colors group-hover:text-white group-active:text-white dark:group-hover:text-black dark:group-active:text-black"
                />
              </button>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={handleMenuToggle}
              className="group dark:border-l-black-300 flex w-16 items-center justify-center border-l transition-colors hover:bg-black active:bg-black sm:w-12 dark:hover:bg-white dark:active:bg-white"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <XIcon
                  size={24}
                  className="text-black-700 dark:text-black-300 transition-colors group-hover:text-white group-active:text-white dark:group-hover:text-black dark:group-active:text-black"
                />
              ) : (
                <ListIcon
                  size={24}
                  className="text-black-700 dark:text-black-300 transition-colors group-hover:text-white group-active:text-white dark:group-hover:text-black dark:group-active:text-black"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Favorite Dropdown */}
      {showFavoriteDropdown && (
        <div className="dark:bg-black-900 dark:border-black-300 absolute top-20 right-4 w-64 border bg-white p-4 shadow-lg md:hidden">
          {isLoggedIn ? (
            <p className="text-sm text-gray-600 dark:text-white">
              Your favorites list is empty
            </p>
          ) : (
            <div className="text-center">
              <p className="text-black-600 mb-3 text-sm dark:text-white">
                Please login to view favorites
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="hover:bg-black-800 active:bg-black-800 dark:hover:bg-black-100 dark:active:bg-black-100 w-full cursor-pointer bg-black px-4 py-2 font-medium text-white transition-colors dark:bg-white dark:text-black"
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {showProfileDropdown && (
        <div className="dark:bg-black-900 dark:border-black-300 absolute top-20 right-4 w-48 border bg-white p-4 shadow-lg md:hidden">
          {isLoggedIn ? (
            <div>
              <p className="mb-2 text-sm font-medium">John Doe</p>
              <button className="text-black-600 dark:text-black-400 w-full py-1 text-left text-sm hover:text-black active:text-black dark:hover:text-white dark:active:text-white">
                Profile
              </button>
              <button className="text-black-600 dark:text-black-400 w-full py-1 text-left text-sm hover:text-black active:text-black dark:hover:text-white dark:active:text-white">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hover:bg-black-800 active:bg-black-800 dark:active:bg-black-100 dark:hover:bg-black-100 w-full cursor-pointer bg-black px-4 py-2 font-medium text-white transition-colors dark:bg-white dark:text-black"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="dark:border-b-black-300 border-b border-b-black md:hidden"
          >
            <div className="space-y-4 px-4 py-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="dark:border-black-300 text-black-700 dark:text-black-300 block w-full cursor-pointer border border-black p-2 text-sm font-medium transition-colors hover:bg-black hover:text-white active:bg-black active:text-white dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black"
                >
                  Home
                </Link>
                {/* <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full cursor-pointer border border-gray-300 p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-black hover:text-white active:bg-black active:text-white dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black"
                >
                  Shop Now
                </Link> */}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="group dark:border-black-300 flex w-full cursor-pointer items-center space-x-3 border border-black p-2 transition-colors hover:bg-black active:bg-black dark:hover:bg-white dark:active:bg-white"
              >
                {theme === "light" ? (
                  <>
                    <MoonStarsIcon
                      size={20}
                      className="text-black-700 transition-colors group-hover:text-white group-active:text-white"
                    />
                    <span className="text-black-700 text-sm font-medium group-hover:text-white group-active:text-white">
                      Dark Mode
                    </span>
                  </>
                ) : (
                  <>
                    <SunIcon
                      size={20}
                      className="dark:text-black-300 dark:group-hover:text-black dark:group-active:text-black"
                    />
                    <span className="dark:text-black-300 text-sm font-medium dark:group-hover:text-black dark:group-active:text-black">
                      Light Mode
                    </span>
                  </>
                )}
              </button>

              {/* Social Links */}
              <div className="border-black-500 dark:border-black-500 border-t pt-4">
                <p className="text-black-600 dark:text-black-300 mb-3 text-xs font-medium">
                  Follow Us
                </p>
                <div className="flex">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-black-700 dark:text-black-300 transition-colors hover:bg-black hover:text-white active:bg-black active:text-white dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black"
                    >
                      <social.icon size={20} className="m-2" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ProductsHeader;
