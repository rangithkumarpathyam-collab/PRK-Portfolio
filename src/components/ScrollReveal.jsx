import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable scroll-triggered animation wrapper.
 * Animates IN when entering the viewport, animates OUT when leaving.
 * 
 * @param {string} effect - 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'blurIn'
 * @param {number} delay - delay in seconds
 * @param {number} duration - animation duration in seconds
 * @param {string} className - additional CSS classes
 * @param {React.ReactNode} children
 */

const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blurIn: {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -5, y: 40 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
};

const ScrollReveal = ({
  children,
  effect = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
  margin = '-80px',
  amount = 0.3,
  ...props
}) => {
  const preset = presets[effect] || presets.fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin, amount }}
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered container: staggers children animations.
 */
export const StaggerContainer = ({
  children,
  stagger = 0.12,
  className = '',
  margin = '-50px',
  amount = 0.2,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger child item — used inside StaggerContainer.
 */
export const StaggerItem = ({
  children,
  effect = 'fadeUp',
  duration = 0.6,
  className = '',
  ...props
}) => {
  const preset = presets[effect] || presets.fadeUp;

  return (
    <motion.div
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: {
            duration,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
