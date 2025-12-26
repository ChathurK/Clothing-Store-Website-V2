/**
 * ScrollerToTopBtn
 *
 * A floating "scroll to top" button that appears when the user scrolls down a specified percentage of the page height.
 * When clicked, it smoothly scrolls the window back to the top. The button is positioned fixed at the
 * bottom-right corner of the viewport and features hover/active state animations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.percentage=10] - The scroll percentage threshold (0-100) at which the button becomes visible
 * @returns {JSX.Element|null} The scroll-to-top button element when visible (scrolled past the threshold), otherwise null.
 *
 * @example
 * // Place this somewhere at the root of your app (e.g., in App.jsx)
 * import ScrollerToTopBtn from './components/common/ScrollerToTopBtn';
 *
 * function App() {
 *   return (
 *     <div>
 *        { Your app content here... }
 *       <ScrollerToTopBtn percentage={10} />
 *     </div>
 *   );
 * }
 *
 * @requires react - React hooks (useState, useEffect)
 * @requires tailwindcss - For styling classes
 */

import React, { useEffect, useState } from "react";

const ScrollerToTopBtn = ({ percentage = 10 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight;
      const currentScrollY = window.scrollY;

      // console.log(height)
      // console.log(currentScrollY);
      // console.log((currentScrollY / height) * 100);

      // Show button if scrolled past the carousel section
      if ((currentScrollY / height) * 100 >= percentage) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="group bg-black-200/50 hover:bg-black-300/80 active:bg-black-300/80 dark:bg-black-800/50 dark:hover:bg-black-700/80 dark:active:bg-black-700/80 fixed right-2 bottom-20 z-50 flex cursor-pointer items-center justify-center transition-colors"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 256 256"
        className="size-10 p-2 text-white/30 transition-colors group-hover:text-white group-active:text-white"
        aria-hidden="true"
      >
        <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
      </svg>
    </div>
  );
};

export default ScrollerToTopBtn;
