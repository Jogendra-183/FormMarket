/**
 * Animation Variants Library
 * Reusable Framer Motion animation presets for consistent UI animations
 */

// Standard easing curves
export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0.0, 0.2, 1],
};

// Standard durations (in seconds)
export const durations = {
  instant: 0.15,
  quick: 0.3,
  standard: 0.5,
  slow: 0.7,
};

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.instant,
      ease: easings.sharp,
    },
  },
};

// Fade in variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
};

// Slide up variants
export const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
};

// Slide in from left
export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
};

// Slide in from right
export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
};

// Scale in variants
export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
};

// Pop in with bounce
export const popInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.standard,
      ease: easings.bounce,
    },
  },
};

// Stagger container variants
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger for small items
export const fastStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Slow stagger for large items
export const slowStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Card hover variants
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: durations.instant,
      ease: easings.smooth,
    },
  },
  tap: {
    scale: 0.98,
  },
};

// Button hover variants
export const buttonHoverVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: durations.instant,
      ease: easings.smooth,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Modal/Dialog variants
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: durations.instant,
      ease: easings.sharp,
    },
  },
};

// Drawer/Sidebar variants
export const drawerVariants = {
  hidden: {
    x: -300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.quick,
      ease: easings.smooth,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      duration: durations.quick,
      ease: easings.sharp,
    },
  },
};

// Dropdown variants
export const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.instant,
      ease: easings.smooth,
    },
  },
};

// Toast/Notification variants
export const toastVariants = {
  hidden: {
    opacity: 0,
    x: 400,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: durations.quick,
      ease: easings.bounce,
    },
  },
  exit: {
    opacity: 0,
    x: 400,
    transition: {
      duration: durations.instant,
      ease: easings.sharp,
    },
  },
};

// Loading pulse variants
export const pulseVariants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Floating animation variants
export const floatVariants = {
  initial: {
    y: 0,
  },
  float: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Shimmer loading variants
export const shimmerVariants = {
  initial: {
    backgroundPosition: "-1000px 0",
  },
  animate: {
    backgroundPosition: "1000px 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Count-up number animation helper
export const createCountUpVariant = (from = 0, to = 100, duration = 2) => ({
  initial: { value: from },
  animate: {
    value: to,
    transition: {
      duration,
      ease: "easeOut",
    },
  },
});

// Helper function to check if reduced motion is preferred
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Conditional animation - returns static props if reduced motion
export const conditionalAnimation = (variants) => {
  if (prefersReducedMotion()) {
    return { initial: "visible", animate: "visible", variants };
  }
  return { initial: "hidden", animate: "visible", variants };
};

// Scroll reveal config
export const scrollRevealConfig = {
  once: true,
  amount: 0.3,
};
