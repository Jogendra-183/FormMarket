import { motion } from "motion/react";
import { pageVariants, prefersReducedMotion } from "../utils/animations";

/**
 * AnimatedPage - Wrapper for page-level animations
 * Provides smooth fade-in and slide-up effect for entire pages
 */
export function AnimatedPage({ children, className = "" }) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedSection - Wrapper for section-level animations
 * Adds scroll-triggered reveal animations
 */
export function AnimatedSection({ 
  children, 
  className = "",
  variant = "slideUp",
  delay = 0 
}) {
  const shouldAnimate = !prefersReducedMotion();

  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, delay, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Container that staggers child animations
 * Children will animate in sequence
 */
export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.08,
  initialDelay = 0.1 
}) {
  const shouldAnimate = !prefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Child item for StaggerContainer
 * Use inside StaggerContainer for sequential animations
 */
export function StaggerItem({ 
  children, 
  className = "",
  variant = "slideUp" 
}) {
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
      },
    },
  };

  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal - Reveals content on scroll
 * More flexible than AnimatedSection with custom threshold
 */
export function ScrollReveal({ 
  children, 
  className = "",
  threshold = 0.3,
  once = true 
}) {
  const shouldAnimate = !prefersReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn - Simple fade-in animation
 */
export function FadeIn({ children, className = "", delay = 0, duration = 0.5 }) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideIn - Slide in from specified direction
 */
export function SlideIn({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0,
  distance = 20 
}) {
  const shouldAnimate = !prefersReducedMotion();

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - Scale in with fade
 */
export function ScaleIn({ children, className = "", delay = 0 }) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover animations for interactive elements
 */
export function HoverLift({ children, className = "", liftAmount = -4 }) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: liftAmount, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverScale - Scale on hover
 */
export function HoverScale({ children, className = "", scale = 1.05 }) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
