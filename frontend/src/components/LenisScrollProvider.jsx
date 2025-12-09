import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisScrollProvider Component
 * 
 * This component wraps your application to provide smooth scrolling using the Lenis library.
 * 
 * THEORY & CONCEPTS:
 * ==================
 * 
 * 1. WHAT IS SMOOTH SCROLLING?
 *    - Native browser scrolling is instant and can feel jarring (causing physical discomfort/motion sickness/feeling of vibration)
 *    - Smooth scrolling adds interpolation (gradual transition) between scroll positions
 *    - Creates a more premium, organic feel - like scrolling through butter
 * 
 * 2. HOW LENIS WORKS:
 *    a) Intercepts native scroll events (wheel, touch, keyboard)
 *    b) Prevents default browser scroll behavior
 *    c) Calculates target scroll position based on user input
 *    d) Uses requestAnimationFrame to smoothly animate to that position
 *    e) Updates the actual scroll position every frame (~60fps)
 * 
 * 3. KEY LENIS OPTIONS EXPLAINED:
 *    
 *    - lerp (Linear Interpolation): 0.1 means "move 10% closer to target each frame"
 *      • Lower (0.05): Slower, more dramatic smoothing
 *      • Higher (0.2): Faster, less noticeable smoothing
 *      • Formula: current = current + (target - current) * lerp
 *    
 *    - duration: Alternative to lerp - defines animation time in seconds
 *      • Used when you want consistent timing regardless of distance
 *      • If lerp is set, duration is ignored
 *    
 *    - easing: Mathematical function that controls acceleration curve
 *      • Default: starts fast, ends slow (ease-out)
 *      • Makes scrolling feel more natural and organic
 *    
 *    - smoothWheel: Enable/disable smooth scrolling for mouse wheel
 *    
 *    - syncTouch: Makes touch devices mimic desktop smooth scroll
 *      • Can be unstable on older iOS devices (< iOS 16)
 *      • Creates unified experience across devices
 *    
 *    - autoRaf: Automatically runs requestAnimationFrame loop
 *      • true: Lenis manages the animation loop (simpler)
 *      • false: You manage it manually (more control for GSAP integration)
 * 
 * 4. RAF LOOP EXPLAINED:
 *    requestAnimationFrame is the browser's way of saying:
 *    "Run this code before the next screen refresh"
 *    
 *    - Browser refreshes ~60 times per second (60fps)
 *    - Each refresh is a "frame"
 *    - Lenis needs to update scroll position every frame
 *    - This creates the illusion of smooth motion
 *    
 *    Think of it like a flipbook animation - each frame shows slightly 
 *    different position, creating fluid motion when played rapidly.
 * 
 * 5. LIFECYCLE:
 *    - Mount: Create Lenis instance, start RAF loop
 *    - Update: Lenis continuously interpolates scroll position
 *    - Unmount: Stop RAF loop, destroy instance, cleanup events
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {Object} props.options - Lenis configuration options
 */
const LenisScrollProvider = ({ children, options = {} }) => {
  // Store Lenis instance in a ref to persist across renders
  // useRef doesn't trigger re-renders when value changes
  const lenisRef = useRef(null);

  useEffect(() => {
    // ========================================
    // STEP 1: Initialize Lenis
    // ========================================
    
    // Create new Lenis instance with custom options
    // Spread operator merges default options with user-provided ones
    const lenis = new Lenis({
      // SMOOTHING CONFIGURATION
      lerp: 0.1,              // Interpolation intensity (0-1)
      duration: 1.2,          // Animation duration in seconds
      
      // SCROLL BEHAVIOR
      smoothWheel: true,      // Smooth mouse wheel scrolling
      
      // TOUCH DEVICE SETTINGS
      syncTouch: false,       // Don't mimic smooth scroll on touch (more stable)
      syncTouchLerp: 0.075,   // Lerp for touch inertia if syncTouch is true
      touchInertiaExponent: 1.7, // Touch scroll momentum strength
      
      // MULTIPLIERS (sensitivity)
      wheelMultiplier: 1,     // Mouse wheel scroll speed (1 = normal)
      touchMultiplier: 1,     // Touch scroll speed (1 = normal)
      
      // SCROLL DIRECTION
      orientation: "vertical", // "vertical" or "horizontal"
      gestureOrientation: "vertical", // Which gestures trigger scroll
      
      // ADVANCED OPTIONS
      infinite: false,        // Infinite scrolling (loops back to start)
      autoResize: true,       // Auto-recalculate on window resize
      autoRaf: true,          // Automatically run RAF loop
      
      // Override with user options
      ...options,
    });

    // Store instance in ref for cleanup
    lenisRef.current = lenis;

    // ========================================
    // STEP 2: Optional Event Listeners
    // ========================================
    
    // Listen to scroll events for debugging or custom logic
    // This fires every frame while scrolling
    lenis.on("scroll", () => {
      // Scroll event data contains useful info:
      // - scroll: current scroll position
      // - limit: max scroll value
      // - velocity: current scroll speed
      // - direction: 1 (down) or -1 (up)
      // - progress: scroll progress (0-1)
      
      // Uncomment to see scroll data:
      // console.log("Scrolling:", e);
    });

    // ========================================
    // STEP 3: Cleanup on Unmount
    // ========================================
    
    return () => {
      // IMPORTANT: Always destroy Lenis instance to prevent memory leaks
      // This removes event listeners and stops the RAF loop
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]); // Re-initialize if options change

  // ========================================
  // RENDER
  // ========================================
  
  // Simply render children - Lenis works at the window level
  // No wrapper div needed unless you want custom styling
  return <>{children}</>;
};

export default LenisScrollProvider;

/**
 * USAGE EXAMPLES:
 * ===============
 * 
 * Basic usage:
 * ```jsx
 * <LenisScrollProvider>
 *   <App />
 * </LenisScrollProvider>
 * ```
 * 
 * With custom options:
 * ```jsx
 * <LenisScrollProvider options={{ lerp: 0.05, smoothWheel: true }}>
 *   <App />
 * </LenisScrollProvider>
 * ```
 * 
 * ADVANCED: Access Lenis instance
 * ```jsx
 * // Create a hook to access Lenis instance
 * import { useContext } from 'react';
 * const LenisContext = createContext(null);
 * 
 * function MyComponent() {
 *   const lenis = useContext(LenisContext);
 *   
 *   const scrollToTop = () => {
 *     lenis.scrollTo(0, { duration: 1.5 });
 *   };
 * }
 * ```
 * 
 * PREVENTING SCROLL ON SPECIFIC ELEMENTS:
 * ```jsx
 * // Method 1: Using data attribute
 * <div data-lenis-prevent>
 *   This content has normal scrolling
 * </div>
 * 
 * // Method 2: Using prevent option
 * <LenisScrollProvider options={{
 *   prevent: (node) => node.classList.contains('no-smooth-scroll')
 * }}>
 * ```
 */
