'use client'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export type AnalyticsPayload = Record<string, unknown>

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event,
    ...payload,
    ts: Date.now(),
  })
}
