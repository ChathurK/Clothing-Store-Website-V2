/**
 * ScrollerToTopBtn
 *
 * A floating "scroll to top" control that becomes visible after the page is
 * scrolled down a certain distance. When clicked, it smoothly scrolls the
 * window back to the top.
 *
 * @component
 * @returns {JSX.Element|null} The scroll-to-top button element when visible, otherwise null.
 * @example
 * // Place this somewhere at the root of your app (e.g., in App.jsx)
 * <ScrollerToTopBtn />
 *
 * @requires React
 * @requires Tailwind CSS (for default styling used in the component)
 */

import React, { useEffect, useState } from "react";

const ScrollerToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // console.log(currentScrollY);

      // Show button if scrolled past 1000 pixels
      if (currentScrollY >= 1000) {
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
