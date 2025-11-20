import { useSmoothScroll } from "../hooks/useSmoothScroll";

/**
 * SmoothScrollWrapper component
 * Wraps the application to provide smooth momentum-based scrolling
 */
const SmoothScrollWrapper = ({ children, smoothness = 0.1, damping = 0.9 }) => {
  // Apply smooth scroll effect
  useSmoothScroll({ smoothness, damping });

  return <>{children}</>;
};

export default SmoothScrollWrapper;
