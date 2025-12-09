/**
 * Lenis Configuration Presets
 * 
 * Pre-configured Lenis options for common use cases.
 * Import and spread these into your LenisScrollProvider.
 */

/**
 * SMOOTH & SLOW - Very dramatic smooth scrolling
 * Perfect for: Portfolio sites, luxury brands, storytelling websites
 */
export const SMOOTH_SLOW = {
  lerp: 0.05,
  duration: 1.8,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 0.8,
};

/**
 * SMOOTH & FAST - Noticeable but responsive
 * Perfect for: Modern web apps, e-commerce, content sites
 */
export const SMOOTH_FAST = {
  lerp: 0.15,
  duration: 0.8,
  smoothWheel: true,
  wheelMultiplier: 1.2,
  touchMultiplier: 1.2,
};

/**
 * BALANCED (Recommended) - Good balance of smooth and responsive
 * Perfect for: Most websites, general use
 */
export const BALANCED = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
};

/**
 * SNAPPY - Minimal smoothing, very responsive
 * Perfect for: SaaS dashboards, admin panels, data-heavy sites
 */
export const SNAPPY = {
  lerp: 0.2,
  duration: 0.6,
  smoothWheel: true,
  wheelMultiplier: 1.5,
  touchMultiplier: 1.5,
};

/**
 * MOBILE_FRIENDLY - Optimized for touch devices
 * Perfect for: Mobile-first websites, touch-heavy interfaces
 */
export const MOBILE_FRIENDLY = {
  lerp: 0.12,
  duration: 1,
  smoothWheel: true,
  syncTouch: false, // More stable on older devices
  touchMultiplier: 1.2,
  touchInertiaExponent: 1.5,
};

/**
 * DESKTOP_SYNC - Synced touch behavior (experimental)
 * Perfect for: Unified experience across devices
 * Warning: Can be unstable on iOS < 16
 */
export const DESKTOP_SYNC = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  syncTouch: true, // Mimic desktop on touch
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
};

/**
 * HORIZONTAL - For horizontal scrolling sites
 * Perfect for: Galleries, timelines, unique layouts
 */
export const HORIZONTAL = {
  lerp: 0.1,
  duration: 1.2,
  orientation: "horizontal",
  gestureOrientation: "horizontal",
  smoothWheel: true,
};

/**
 * INFINITE - Infinite scrolling (loops back)
 * Perfect for: Creative sites, unique experiences
 * Requires: syncTouch: true for touch devices
 */
export const INFINITE = {
  lerp: 0.1,
  duration: 1.2,
  infinite: true,
  syncTouch: true, // Required for touch
  smoothWheel: true,
};

/**
 * CUSTOM EASING FUNCTIONS
 * Use these with the easing option
 */
export const EASINGS = {
  // No easing
  linear: (t) => t,

  // Ease-in (starts slow)
  easeIn: (t) => t * t,

  // Ease-out (ends slow) - DEFAULT
  easeOut: (t) => t * (2 - t),

  // Ease-in-out (smooth start and end)
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic ease-out (smooth deceleration)
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),

  // Quart ease-out (stronger deceleration)
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),

  // Expo ease-out (dramatic deceleration)
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),

  // Back ease-out (slight overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  // Elastic (bouncy)
  elastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

/**
 * USAGE EXAMPLES:
 * 
 * 1. Using a preset:
 * ```jsx
 * import { SMOOTH_SLOW } from './config/lenisPresets';
 * 
 * <LenisScrollProvider options={SMOOTH_SLOW}>
 *   <App />
 * </LenisScrollProvider>
 * ```
 * 
 * 2. Combining preset with custom options:
 * ```jsx
 * import { BALANCED, EASINGS } from './config/lenisPresets';
 * 
 * <LenisScrollProvider 
 *   options={{ 
 *     ...BALANCED, 
 *     easing: EASINGS.easeOutCubic,
 *     anchors: true,
 *   }}
 * >
 *   <App />
 * </LenisScrollProvider>
 * ```
 * 
 * 3. Using custom easing:
 * ```jsx
 * import { EASINGS } from './config/lenisPresets';
 * 
 * <LenisScrollProvider 
 *   options={{ 
 *     lerp: 0.1,
 *     easing: EASINGS.elastic, // Bouncy scroll!
 *   }}
 * >
 * ```
 */
