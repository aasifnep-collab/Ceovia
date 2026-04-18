'use client'

/**
 * useConciergeChat
 * Custom hook for the CEOVIA Concierge Closer chat widget.
 *
 * Handles:
 *   - Optimistic user message insertion
 *   - JSON responses: type 'message' | 'redirect' | 'refusal' | 'fallback'
 *   - 429 rate-limit with retry-after countdown
 *   - Network errors — always surfaces a message, never throws to the UI
 *
 * All responses are JSON (Phase 1 — generateText, no streaming).
 * Phase 2: re-introduce streaming with interrupt mechanism once output validation is proven stable
 */

import { useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type MessageRole    = 'user' | 'assistant'
export type MessageVariant = 'normal' | 'redirect' | 'refusal' | 'fallback'

export interface SuggestedLink {
  label: string
  href:  string
}

export interface ChatMessage {
  id:              string
  role:            MessageRole
  content:         string
  variant:         MessageVariant
  suggestedLinks?: SuggestedLink[]
}

export interface UseConciergeChat {
  messages:         ChatMessage[]
  isLoading:        boolean
  /** Non-null Unix ms timestamp while the user is rate-limited. */
  rateLimitRetryAt: number | null
  sendMessage:      (content: string) => Promise<void>
  clearMessages:    () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useConciergeChat(market = 'global'): UseConciergeChat {
  const [messages,         setMessages]         = useState<ChatMessage[]>([])
  const [isLoading,        setIsLoading]        = useState(false)
  const [rateLimitRetryAt, setRateLimitRetryAt] = useState<number | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    // ── 1. Optimistically add user message ───────────────────────────────────
    const userMessage: ChatMessage = {
      id:      crypto.randomUUID(),
      role:    'user',
      content: content.trim(),
      variant: 'normal',
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setRateLimitRetryAt(null)

    // ── 2. Insert empty assistant bubble (shows typing dots while awaiting response)
    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '', variant: 'normal' },
    ])

    try {
      const response = await fetch('/api/ai/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: content.trim(), market }),
      })

      // ── 3. Rate limited (429) ────────────────────────────────────────────
      if (response.status === 429) {
        const retryAfterSec = Number(response.headers.get('retry-after') ?? 60)
        setRateLimitRetryAt(Date.now() + retryAfterSec * 1_000)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: `Please wait ${retryAfterSec} seconds before sending another message.` }
              : m
          )
        )
        return
      }

      // ── 4. All non-429 responses are JSON ────────────────────────────────
      // Route returns one of four typed shapes:
      //   { type: 'message',  content }          — compliant AI response
      //   { type: 'redirect', message, suggestedLinks } — condition-name redirect
      //   { type: 'refusal',  message }           — compliance block
      //   { type: 'fallback', message, suggestedLinks } — technical failure
      type JsonPayload = {
        type?:           'message' | 'redirect' | 'refusal' | 'fallback'
        content?:        string         // present on type: 'message'
        message?:        string         // present on redirect / refusal / fallback
        suggestedLinks?: SuggestedLink[]
      }

      const data = (await response.json()) as JsonPayload

      const resolvedContent =
        data.type === 'message'
          ? (data.content ?? '')
          : (data.message ?? "I'm unable to respond right now.")

      const resolvedVariant: MessageVariant =
        data.type === 'fallback'  ? 'fallback'  :
        data.type === 'refusal'   ? 'refusal'   :
        data.type === 'redirect'  ? 'redirect'  :
        'normal'

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:        resolvedContent,
                variant:        resolvedVariant,
                suggestedLinks: data.suggestedLinks,
              }
            : m
        )
      )

    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError'
      if (!isAbort) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: 'Unable to connect. Please check your connection and try again.' }
              : m
          )
        )
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, market])

  const clearMessages = useCallback(() => {
    setMessages([])
    setRateLimitRetryAt(null)
  }, [])

  return { messages, isLoading, rateLimitRetryAt, sendMessage, clearMessages }
}
