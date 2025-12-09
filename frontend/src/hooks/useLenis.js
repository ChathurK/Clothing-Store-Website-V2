import { useEffect, useRef, useCallback } from "react";

/**
 * useLenis Hook
 * 
 * A custom React hook that provides access to Lenis scroll instance and utility methods.
 * This allows you to programmatically control scroll behavior in your components.
 * 
 * THEORY: Custom hooks let you extract component logic into reusable functions.
 * This hook gives you direct access to Lenis methods without prop drilling.
 * 
 * @returns {Object} Object containing Lenis utilities
 */
export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Try to find Lenis instance on window (if available)
    // Note: This requires LenisScrollProvider to expose instance globally
    lenisRef.current = window.lenis || null;
  }, []);

  /**
   * Scroll to a specific target
   * 
   * @param {number|string|HTMLElement} target - Where to scroll
   * @param {Object} options - Scroll options
   * 
   * Examples:
   * scrollTo(0) - Scroll to top
   * scrollTo('#section-id') - Scroll to element
   * scrollTo(500) - Scroll to 500px
   */
  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  }, []);

  /**
   * Stop smooth scrolling
   * Useful when you want to temporarily disable scrolling (e.g., when a modal opens)
   */
  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  /**
   * Resume smooth scrolling
   * Call this after stop() to re-enable scrolling
   */
  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
};

/**
 * USAGE EXAMPLES:
 * 
 * 1. Scroll to Top Button:
 * ```jsx
 * import { useLenis } from '../hooks/useLenis';
 * 
 * function ScrollToTop() {
 *   const { scrollTo } = useLenis();
 *   
 *   return (
 *     <button onClick={() => scrollTo(0, { duration: 1.5 })}>
 *       Back to Top
 *     </button>
 *   );
 * }
 * ```
 * 
 * 2. Scroll to Section:
 * ```jsx
 * function Navigation() {
 *   const { scrollTo } = useLenis();
 *   
 *   return (
 *     <nav>
 *       <button onClick={() => scrollTo('#about', { offset: -100 })}>
 *         About
 *       </button>
 *     </nav>
 *   );
 * }
 * ```
 * 
 * 3. Stop/Start Scrolling (for modals):
 * ```jsx
 * function Modal({ isOpen }) {
 *   const { stop, start } = useLenis();
 *   
 *   useEffect(() => {
 *     if (isOpen) {
 *       stop(); // Disable scrolling when modal opens
 *     } else {
 *       start(); // Re-enable when modal closes
 *     }
 *   }, [isOpen, stop, start]);
 *   
 *   return <div>Modal content...</div>;
 * }
 * ```
 */
