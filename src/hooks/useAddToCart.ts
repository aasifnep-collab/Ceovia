'use client'

/**
 * useAddToCart — shared cart hook for ProgramSelector and StickyMobileCTA.
 *
 * Flow:
 *   1. Look up Shopify variant GID from CEOVIA_VARIANT_GIDS
 *   2. If GID is a TODO placeholder: surface a user-safe error, do not call Shopify
 *   3. Call createCheckout (or createSubscriptionCheckout for subscription variant)
 *   4. Set isSuccess for 1500ms, then redirect to webUrl via window.location.href
 *   5. On failure: set user-safe error message, clear after 3000ms
 *
 * Each component that uses this hook gets its own isolated state instance.
 * ProgramSelector and StickyMobileCTA do NOT share loading state with each other.
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import {
  createCheckout,
  createSubscriptionCheckout,
} from '@/lib/shopify/client'
import {
  CEOVIA_VARIANT_GIDS,
  CEOVIA_SELLING_PLAN_ID,
} from '@/lib/shopify/variants'

// ── Constants ─────────────────────────────────────────────────────────────────

const USER_SAFE_ERROR =
  'Something went wrong. Please try again or contact us at info@ceovia.com'

const GID_NOT_CONFIGURED_ERROR =
  'This product is not yet available for purchase.'

// Maps internal error codes from client.ts to user-safe display strings.
// Falls back to USER_SAFE_ERROR for any unmapped code.
const ERROR_MESSAGES: Record<string, string> = {
  checkout_timeout:            'The request timed out. Please check your connection and try again.',
  selling_plan_not_configured: 'Subscription is not yet available. Please select a one-time purchase option.',
  'Missing checkout URL':      'Shopify did not return a checkout URL. Please verify the product is available for online purchase.',
}

const ERROR_DISPLAY_MS   = 3000
const SUCCESS_REDIRECT_MS = 1500
const PROGRAM_QUANTITY_MAP: Record<string, number> = {
  '1-bottle': 1,
  '2-bottles': 2,
  '3-bottles': 3,
  // Legacy
  '30day': 1,
  '60day': 2,
  '90day': 3,
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UseAddToCartReturn {
  addToCart: (variantKey: string) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  error: string | null
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAddToCart(): UseAddToCartReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError]         = useState<string | null>(null)

  // Track all setTimeout handles so they can be cleared on unmount,
  // preventing state updates on an unmounted component.
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  const addToCart = useCallback(async (variantKey: string): Promise<void> => {
    // scheduleTimeout registers each handle for cleanup on unmount.
    const scheduleTimeout = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timeoutRefs.current.push(id)
      return id
    }

    const gid = CEOVIA_VARIANT_GIDS[variantKey]

    // Guard: GID not yet configured (TODO placeholder still in place)
    if (!gid || gid.startsWith('TODO:')) {
      console.error('Shopify variant GID not configured for:', variantKey)
      setError(GID_NOT_CONFIGURED_ERROR)
      scheduleTimeout(() => setError(null), ERROR_DISPLAY_MS)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let checkoutUrl: string

      if (variantKey === 'subscription') {
        checkoutUrl = await createSubscriptionCheckout(gid, CEOVIA_SELLING_PLAN_ID)
      } else {
        const quantity = PROGRAM_QUANTITY_MAP[variantKey] || 1
        checkoutUrl = await createCheckout(gid, quantity)
      }

      setIsSuccess(true)
      trackEvent('checkout_redirect', {
        variant: variantKey,
      })

      // Brief visual confirmation before navigation
      scheduleTimeout(() => {
        window.location.href = checkoutUrl
      }, SUCCESS_REDIRECT_MS)

    } catch (err) {
      console.error('useAddToCart: error:', err)
      const code = err instanceof Error ? err.message : ''
      const message =
        ERROR_MESSAGES[code] ??
        (code.startsWith('Shopify ')
          ? code
          : code || USER_SAFE_ERROR)
      setError(message)
      scheduleTimeout(() => setError(null), ERROR_DISPLAY_MS)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { addToCart, isLoading, isSuccess, error }
}
