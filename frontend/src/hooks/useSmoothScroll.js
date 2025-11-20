import { useEffect, useRef } from "react";

/**
 * Custom hook for smooth momentum-based scrolling
 * Creates a premium scrolling experience similar to Lenis/Locomotive Scroll
 */
export const useSmoothScroll = (options = {}) => {
  const {
    smoothness = 0.1, // Lower = smoother but slower (0.05-0.15 recommended)
    damping = 0.9, // Momentum damping (0.8-0.95 recommended)
    touchMultiplier = 2, // Touch scroll sensitivity
    wheelMultiplier = 1, // Mouse wheel sensitivity
  } = options;

  const scrollRef = useRef(null);
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    let isScrolling = false;

    // Initialize scroll position
    currentScrollY.current = window.scrollY;
    targetScrollY.current = window.scrollY;

    // Handle wheel events
    const handleWheel = (e) => {
      e.preventDefault();

      // Add delta to target scroll position
      const delta = e.deltaY * wheelMultiplier;
      targetScrollY.current += delta;

      // Clamp to valid scroll range
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(
        0,
        Math.min(targetScrollY.current, maxScroll),
      );

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * touchMultiplier;

      targetScrollY.current += delta;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(
        0,
        Math.min(targetScrollY.current, maxScroll),
      );

      touchStartY = touchY;

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    // Smooth animation loop
    const animate = () => {
      // Calculate difference between current and target
      const diff = targetScrollY.current - currentScrollY.current;

      // Apply smoothing
      const delta = diff * smoothness;
      currentScrollY.current += delta;

      // Apply velocity for momentum
      velocity.current = delta * damping;

      // Update actual scroll position
      window.scrollTo(0, currentScrollY.current);

      // Continue animation if still moving
      if (Math.abs(diff) > 0.5 || Math.abs(velocity.current) > 0.5) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        // Snap to final position
        currentScrollY.current = targetScrollY.current;
        window.scrollTo(0, currentScrollY.current);
        isScrolling = false;
      }
    };

    // Handle programmatic scrolling (e.g., scroll to top button)
    const handleProgrammaticScroll = () => {
      if (!isScrolling) {
        targetScrollY.current = window.scrollY;
        currentScrollY.current = window.scrollY;
      }
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleProgrammaticScroll);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleProgrammaticScroll);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [smoothness, damping, touchMultiplier, wheelMultiplier]);

  return scrollRef;
};
