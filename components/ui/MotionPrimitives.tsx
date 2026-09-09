'use client';

import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';

// Smooth luxury cubic bezier curve
export const LUXURY_EASE = [0.22, 1, 0.36, 1];

// Text Word-by-Word Stagger Reveal
interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}) => {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {text}
    </Component>
  );
};

// Smooth Pop-In Entrance for Cards & Modules
interface PopInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scale?: number;
}

export const PopIn: React.FC<PopInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  yOffset = 30,
  scale = 0.97,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Group for Grid Items
export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const item: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={item} style={{ willChange: 'opacity, transform' }} className={className}>
      {children}
    </motion.div>
  );
};

// Parallax Float for Architectural Elements & Imagery
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  offset = 40,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, willChange: 'transform', transform: 'translateZ(0)' }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};
