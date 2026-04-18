'use client'

/**
 * CEOVIA Concierge Chat Widget
 *
 * Fixed-position chat button + sliding panel.
 * Renders globally via layout.tsx — visible on all pages.
 *
 * Design tokens used:
 *   Brand Green   #1A4731   panel header, user bubbles, send button, trigger
 *   Cream BG      #F7F4EE   assistant bubbles, input field, page background
 *   Warm Card     #EDE8DF   widget panel background
 *   Gold Accent   #C9A961   fallback link hover, refusal border
 *   Dark Text     #1C1C1C   body copy
 *   Muted Text    #8B8070   placeholder, timestamps, disclaimer
 *   Display Font  --font-display (Cormorant Garamond) — header title only
 *   Body Font     --font-sans   (DM Sans) — all other text
 *
 * Response rendering:
 *   normal   → standard bubble
 *   redirect → calm green-tinted bubble (condition-name healthcare redirect) + optional links
 *   refusal  → amber-tinted bubble (compliance block)
 *   fallback → message + clickable suggested links (technical failure)
 */

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent, FormEvent } from 'react'
import { AnimatePresence, motion }    from 'framer-motion'
import { usePathname }                from 'next/navigation'
import { useConciergeChat }           from '@/hooks/useConciergeChat'
import type { ChatMessage, SuggestedLink } from '@/hooks/useConciergeChat'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ChatWidgetProps {
  /** Market code passed to the chat API for claim filtering. Defaults to 'global'. */
  market?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget
// ─────────────────────────────────────────────────────────────────────────────

export function ChatWidget({ market = 'global' }: ChatWidgetProps) {
  const pathname = usePathname()
  const [isOpen,      setIsOpen]      = useState(false)
  const [inputValue,  setInputValue]  = useState('')
  const messagesEndRef                = useRef<HTMLDivElement>(null)
  const inputRef                      = useRef<HTMLInputElement>(null)
  const panelRef                      = useRef<HTMLDivElement>(null)
  const previousFocusRef              = useRef<HTMLElement | null>(null)

  const { messages, isLoading, rateLimitRetryAt, sendMessage, clearMessages } =
    useConciergeChat(market)

  const isSuppressedRoute = pathname === '/products/ceovia-90-day'

  // ── Scroll to latest message ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // ── Focus input when panel opens ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
      const timer = setTimeout(() => inputRef.current?.focus(), 160)
      return () => clearTimeout(timer)
    }

    previousFocusRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown as unknown as EventListener)
    return () =>
      document.removeEventListener('keydown', handleKeydown as unknown as EventListener)
  }, [isOpen])

  const isRateLimited =
    rateLimitRetryAt !== null && rateLimitRetryAt > Date.now()

  const canSend = inputValue.trim().length > 0 && !isLoading && !isRateLimited

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    const msg = inputValue.trim()
    setInputValue('')
    await sendMessage(msg)
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(e as unknown as FormEvent)
    }
  }

  // Detect typing indicator: last message is an empty assistant bubble
  const lastMsg           = messages[messages.length - 1]
  const showTypingDots    =
    isLoading &&
    lastMsg?.role === 'assistant' &&
    lastMsg?.content === ''

  if (isSuppressedRoute) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">

      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.17, ease: 'easeOut' }}
            className="w-[360px] flex flex-col bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-[#E8E3D9] overflow-hidden"
            style={{ maxHeight: 'min(520px, calc(100vh - 100px))' }}
            role="dialog"
            aria-modal="true"
            aria-label="CEOVIA Concierge Chat"
            ref={panelRef}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A4731] shrink-0">
              <div>
                <p
                  className="text-white font-semibold text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  CEOVIA Concierge
                </p>
                <p className="text-[#A8C5B0] text-[11px] mt-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
                  Ask about the 90-Day System
                </p>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="text-white/50 hover:text-white/90 text-[11px] transition-colors"
                    title="Clear conversation"
                    aria-label="Clear conversation"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <XIcon />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[240px]"
              style={{ fontFamily: 'var(--font-sans)' }}
              aria-live="polite"
              aria-label="Conversation"
            >
              {/* Empty state */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center text-center text-sm text-[#8B8070] pt-6 pb-2 px-2 gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F0EDE6] flex items-center justify-center mb-1">
                    <LeafIcon />
                  </div>
                  <p className="font-medium text-[#1A4731] text-[13px]" style={{ fontFamily: 'var(--font-display)' }}>
                    Hello — how can I help?
                  </p>
                  <p className="text-[12px] leading-relaxed">
                    Ask me about the 90-Day System,<br />
                    ingredients, pricing, or how to start.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                    {STARTER_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setInputValue(p); inputRef.current?.focus() }}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-[#D4CFC5] text-[#5C4E3D] hover:border-[#1A4731] hover:text-[#1A4731] transition-colors bg-white"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message list */}
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={isLoading && msg.id === lastMsg?.id}
                />
              ))}

              {/* Typing dots — shown while waiting for first chunk */}
              {showTypingDots && (
                <div className="flex justify-start">
                  <div className="bg-[#F7F4EE] rounded-xl px-3 py-2.5 flex items-center gap-1">
                    <TypingDot delay="0ms"   />
                    <TypingDot delay="160ms" />
                    <TypingDot delay="320ms" />
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[#E8E3D9] px-3 py-3 flex gap-2 shrink-0 bg-white"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder={
                  isRateLimited   ? 'Please wait before sending…'
                  : isLoading     ? 'Responding…'
                  : 'Ask a question…'
                }
                disabled={isLoading || isRateLimited}
                maxLength={500}
                className="flex-1 text-[13px] px-3 py-2 rounded-lg border border-[#D4CFC5] bg-[#F7F4EE] text-[#1C1C1C] placeholder:text-[#B0A898] focus:outline-none focus:ring-1 focus:ring-[#1A4731] focus:border-[#1A4731] disabled:opacity-50 transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="px-3.5 py-2 bg-[#1A4731] text-white rounded-lg text-[13px] font-medium hover:bg-[#15382A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Send
              </button>
            </form>

            {/* Regulatory disclaimer */}
            <div className="px-4 pb-3 shrink-0">
              <p className="text-[10px] text-[#B0A898] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                These statements have not been evaluated by regulatory authorities.
                Not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ───────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-[#1A4731] text-white rounded-full shadow-lg hover:bg-[#15382A] transition-colors flex items-center justify-center relative"
        aria-label={isOpen ? 'Close chat' : 'Chat with CEOVIA Concierge'}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{    rotate:  90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <XIcon size={20} />
            </motion.span>
          ) : (
            <motion.span key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{    rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChatBubbleIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread indicator — shown when there are messages and panel is closed */}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#C9A961] rounded-full border-2 border-white" />
        )}
      </motion.button>

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MessageBubble
// ─────────────────────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isStreaming,
}: {
  message:     ChatMessage
  isStreaming: boolean
}) {
  const isUser = message.role === 'user'

  // ── Redirect variant — healthcare redirect + optional links ──────────────
  // Calm green-tinted styling: informative, not alarming.
  if (message.variant === 'redirect') {
    return (
      <div className="space-y-2">
        <div
          className="text-[13px] leading-relaxed text-[#2D4E38] bg-[#F0F5F1] border border-[#C2D9C8] rounded-xl px-3 py-2.5 max-w-[88%]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {message.content}
        </div>
        {message.suggestedLinks && message.suggestedLinks.length > 0 && (
          <div className="flex flex-col gap-1 pl-1">
            {message.suggestedLinks.map((link: SuggestedLink) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] text-[#1A4731] underline underline-offset-2 hover:text-[#C9A961] transition-colors"
              >
                → {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Fallback variant — technical failure + suggested links ────────────────
  if (message.variant === 'fallback') {
    return (
      <div className="space-y-2">
        <div
          className="text-[13px] leading-relaxed text-[#5C4E3D] bg-[#F7F4EE] rounded-xl px-3 py-2.5 max-w-[88%]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {message.content}
        </div>
        {message.suggestedLinks && message.suggestedLinks.length > 0 && (
          <div className="flex flex-col gap-1 pl-1">
            {message.suggestedLinks.map((link: SuggestedLink) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] text-[#1A4731] underline underline-offset-2 hover:text-[#C9A961] transition-colors"
              >
                → {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Normal and refusal variants ───────────────────────────────────────────
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'text-[13px] leading-relaxed rounded-xl px-3 py-2.5 max-w-[88%]',
          isUser
            ? 'bg-[#1A4731] text-white'
            : message.variant === 'refusal'
              ? 'bg-[#FFFBEE] text-[#5C4E3D] border border-[#E8D9A0]'
              : 'bg-[#F7F4EE] text-[#1C1C1C]',
        ].join(' ')}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {/* Empty bubble while waiting for response */}
        {!isUser && message.content === '' && !isStreaming && (
          <span className="text-[#B0A898] text-[12px]">—</span>
        )}
        {message.content}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TypingDot
// ─────────────────────────────────────────────────────────────────────────────

function TypingDot({ delay }: { delay: string }) {
  return (
    <span
      className="w-1.5 h-1.5 bg-[#8B8070] rounded-full"
      style={{ animation: `bounce 1s ${delay} infinite`, display: 'inline-block' }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icons (no icon library dependency)
// ─────────────────────────────────────────────────────────────────────────────

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#1A4731" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Starter prompts — pre-fill input to reduce cold-start friction
// ─────────────────────────────────────────────────────────────────────────────

const STARTER_PROMPTS = [
  'What does the 90-day system do?',
  'How much does it cost?',
  'How do I take it?',
] as const
