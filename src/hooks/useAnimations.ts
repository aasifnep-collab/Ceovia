'use client'

/**
 * useAnimations — prefers-reduced-motion aware variant selector.
 *
 * All animated components import this hook instead of raw variants.
 * When the OS/browser signals reduced motion, every variant collapses
 * to an instant show — no opacity ramp, no y-shift, no stagger.
 *
 * This satisfies WCAG 2.1 SC 2.3.3 (Animation from Interactions).
 */

import { useReducedMotion } from 'framer-motion'
import {
  staggerContainer,
  staggerContainerDelayed,
  fadeUp,
  fadeIn,
  fadeUpSubtle,
} from '@/lib/motion'
import type { Variants } from 'framer-motion'

/** Neutral variant — renders content immediately with no visual change */
const instant: Variants = {
  hidden: { opacity: 1 },
  show:   { opacity: 1 },
}

const instantContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0 } },
}

export function useAnimations() {
  const reduced = useReducedMotion()

  if (reduced) {
    return {
      container:        instantContainer,
      containerDelayed: instantContainer,
      fadeUp:           instant,
      fadeIn:           instant,
      fadeUpSubtle:     instant,
    }
  }

  return {
    container:        staggerContainer,
    containerDelayed: staggerContainerDelayed,
    fadeUp,
    fadeIn,
    fadeUpSubtle,
  }
}
