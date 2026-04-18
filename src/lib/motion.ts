/**
 * CEOVIA Motion System
 *
 * Rules:
 * - Ease-out only — no spring, no bounce, no overshoot
 * - y offset: 12px — precise, not theatrical
 * - Duration: 0.45s across all variants
 * - Stagger: 0.08s between siblings (< 0.1s max)
 * - Use `easeOut` variant for scroll-triggered sections (whileInView)
 * - Use `easeOutImmediate` variant for above-the-fold content (animate)
 *
 * Easing: [0.33, 1, 0.68, 1]  ← ceovia-out (Tailwind token)
 * Clean deceleration — no spring characteristics.
 */

import type { Variants, Transition } from 'framer-motion'

// ── Base easing ─────────────────────────────────────────────────────────────
export const EASE_OUT = [0.33, 1, 0.68, 1] as const

// ── Shared transition presets ────────────────────────────────────────────────
export const transition = {
  /** Standard element transition — headline, body copy */
  base: {
    duration: 0.45,
    ease: EASE_OUT,
  } satisfies Transition,

  /** Consistent with base — smaller elements use the same timing */
  fast: {
    duration: 0.45,
    ease: EASE_OUT,
  } satisfies Transition,

  /** Hover micro-interaction */
  hover: {
    duration: 0.2,
    ease: EASE_OUT,
  } satisfies Transition,
} as const

// ── Container variant — orchestrates stagger ─────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
}

export const staggerContainerDelayed: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// ── Core item variants ────────────────────────────────────────────────────────

/** Fade + 12px upward lift — primary content reveal */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
}

/** Pure fade — for elements that should not shift position */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: transition.fast,
  },
}

/** Fade + 12px lift — consistent with fadeUp for nested elements */
export const fadeUpSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: transition.fast,
  },
}

// ── Hover states ──────────────────────────────────────────────────────────────

/** Card hover — 2px lift */
export const cardHover = {
  y: -2,
  transition: transition.hover,
} as const

/** CTA button hover — 1px lift */
export const ctaHover = {
  y: -1,
  transition: transition.hover,
} as const

// ── Viewport config ───────────────────────────────────────────────────────────
export const viewport = {
  once: true,
  margin: '0px 0px -60px 0px',
} as const
