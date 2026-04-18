'use client'

/**
 * Navbar — sticky credibility strip + main navigation.
 *
 * Structure:
 *   .ceovia-root (dir-aware wrapper)
 *     .cred-strip  — rotating message bar, dismissable, scrolls away
 *     .ceovia-nav  — sticky at top:0; transparent → white on scroll
 *       logo | primary nav | right actions
 *   .mobile-overlay   — full-screen slide-in overlay (lg:hidden)
 *   .cart-overlay-bg  — backdrop for cart drawer
 *   .cart-drawer      — sliding cart panel (right)
 *
 * CSS approach: `<style>` tag is kept for:
 *   - @keyframes (stripFade, megaFadeIn)
 *   - ::after pseudo-elements (gold nav underline)
 *   - .nav-item:hover .mega-menu (parent-triggered mega menu, no Tailwind equivalent)
 *   - :nth-child selectors (hamburger bar animation)
 *   - Class-toggled transitions (.open, .scrolled)
 *
 * Cart: MOCK_CART placeholder — no Shopify cart context exists yet.
 * TODO: connect to Shopify cart when context/hook is available.
 *
 * Fonts: loaded via next/font in layout.tsx — @import removed from style tag.
 */

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────────

type Language = {
  code: 'en' | 'ar' | 'fr'
  label: string
  dir: 'ltr' | 'rtl'
}

type NavLink = {
  label: string
  href: string
}

type MegaColumn = {
  heading: string
  links: NavLink[]
}

type NavItem = {
  label: string
  href: string
  mega?: {
    columns: MegaColumn[]
  }
}

type CartItem = {
  id: number
  name: string
  subtitle: string
  price: string
  qty: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STRIP_MESSAGES = [
  'Cell Bioactivator · Clinically Structured 90-Day System',
  'Himalayan Sea Buckthorn · Revitalisation · Restoration · Rejuvenation',
  'Free Shipping on orders over AED 400 · GCC, EU & UK',
]

const NAV_ITEMS: NavItem[] = [
  { label: 'Science',  href: '/science' },
  { label: 'Products', href: '/products/ceovia-90-day' },
  { label: 'Blog',     href: '/journal' },
  { label: 'About',    href: '/about' },
  { label: 'Clinical Insight', href: '/clinical-insight' },
]

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English',  dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
]

// TODO: connect to Shopify cart context when available
const MOCK_CART: CartItem[] = [
  {
    id: 1,
    name: 'CEOVIA 2-Bottle Supply',
    subtitle: 'Sea Buckthorn Softgel Capsules',
    price: 'AED 913.00',
    qty: 1,
  },
]

function getFlag(code: Language['code']): string {
  if (code === 'en') return '🇬🇧'
  if (code === 'ar') return '🇦🇪'
  return '🇫🇷'
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname()

  const [scrolled,      setScrolled]      = useState(false)
  const [stripIndex,    setStripIndex]     = useState(0)
  const [stripVisible,  setStripVisible]   = useState(true)
  const [mobileOpen,    setMobileOpen]     = useState(false)
  const [cartOpen,      setCartOpen]       = useState(false)
  const [langOpen,      setLangOpen]       = useState(false)
  const [activeLang,    setActiveLang]     = useState<Language>(LANGUAGES[0])

  const langRef = useRef<HTMLDivElement>(null)

  // Scroll detection — drives .scrolled class on ceovia-nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Strip message rotation
  useEffect(() => {
    const timer = window.setInterval(() => {
      setStripIndex((i) => (i + 1) % STRIP_MESSAGES.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, cartOpen])

  // TODO: connect to Shopify cart context — replace MOCK_CART references
  const cartCount    = useMemo(() => MOCK_CART.reduce((n, i) => n + i.qty, 0), [])
  const cartSubtotal = useMemo(() => 'AED 913.00', [])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <>
      {/*
        All complex CSS that has no Tailwind equivalent lives here:
        - @keyframes animations (stripFade, megaFadeIn)
        - ::after pseudo-elements (gold nav underline)
        - .nav-item:hover .mega-menu (CSS parent-hover child show)
        - :nth-child selectors (hamburger bars)
        - Class-toggled state (.scrolled, .open)
        Fonts are loaded via next/font — @import removed.
      */}
      <style>{`
        .ceovia-root {
          font-family: var(--font-sans), 'DM Sans', sans-serif;
          color: #2B2B2B;
        }

        /* ── CREDIBILITY STRIP ── */
        .cred-strip {
          background: #06291A;
          color: #E8C87A;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: height 0.35s ease, opacity 0.35s ease;
          overflow: hidden;
        }
        .cred-strip.hidden {
          height: 0;
          opacity: 0;
          pointer-events: none;
        }
        .strip-msg {
          flex: 1;
          text-align: center;
          animation: stripFade 0.5s ease;
        }
        @keyframes stripFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .strip-close {
          background: none;
          border: none;
          color: #E8C87A;
          cursor: pointer;
          font-size: 16px;
          opacity: 0.7;
          padding: 4px;
          line-height: 1;
          transition: opacity 0.2s;
        }
        .strip-close:hover { opacity: 1; }

        /* ── MAIN NAVBAR ── */
        .ceovia-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255,255,255,0);
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .ceovia-nav.scrolled {
          background: rgba(255,255,255,0.97);
          border-color: #E2E8E4;
          box-shadow: 0 1px 24px rgba(14,90,54,0.08);
          backdrop-filter: blur(12px);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 80px;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 36px;
          padding: 3px 0 1px;
        }

        /* ── PRIMARY NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-item { position: relative; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #43564D;
          line-height: 1.1;
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: color 0.2s ease;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 1.5px;
          background: #D4A857;
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: left;
        }
        .nav-link:hover { color: #0E5A36; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active { color: #0E5A36; font-weight: 450; }
        .nav-link.active::after { transform: scaleX(1); }

        .nav-chevron {
          width: 10px;
          height: 10px;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .nav-item:hover .nav-chevron { transform: rotate(180deg); }

        /* ── MEGA MENU — CSS hover, no JS required ── */
        .mega-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: -24px;
          background: white;
          border: 1px solid #E2E8E4;
          border-radius: 12px;
          box-shadow: 0 16px 48px rgba(10,68,40,0.14);
          padding: 28px 32px;
          min-width: 420px;
          display: none;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          animation: megaFadeIn 0.2s ease;
        }
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-item:hover .mega-menu { display: grid; }

        .mega-col-heading {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #D4A857;
          font-weight: 500;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid #E2E8E4;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .mega-link {
          display: block;
          padding: 8px 0;
          font-size: 13.5px;
          color: #4A5C52;
          text-decoration: none;
          transition: color 0.15s ease, padding-left 0.15s ease;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .mega-link:hover { color: #0A4428; padding-left: 6px; }

        /* ── RIGHT ACTIONS ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .nav-action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          color: #2B2B2B;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, color 0.15s ease;
          position: relative;
        }
        .nav-action-btn:hover { background: #F7F8F6; color: #0E5A36; }
        .nav-action-btn svg { width: 18px; height: 18px; }

        .cart-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background: #D4A857;
          color: white;
          border-radius: 50%;
          font-size: 9px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* ── LANGUAGE SELECTOR ── */
        .lang-selector { position: relative; }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #F7F8F6;
          border: 1px solid #E2E8E4;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #4A5C52;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .lang-btn:hover { border-color: #0E5A36; color: #0E5A36; }
        .lang-btn svg { width: 14px; height: 14px; }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #E2E8E4;
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          overflow: hidden;
          min-width: 140px;
          animation: megaFadeIn 0.15s ease;
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 13px;
          color: #4A5C52;
          cursor: pointer;
          transition: background 0.15s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .lang-option:hover { background: #F7F8F6; color: #0E5A36; }
        .lang-option.active { color: #0E5A36; font-weight: 500; }

        /* ── CONTACT LINK ── */
        .nav-contact {
          font-size: 13px;
          color: #4A5C52;
          text-decoration: none;
          padding: 6px 12px;
          transition: color 0.2s ease;
          white-space: nowrap;
          font-weight: 400;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .nav-contact:hover { color: #0E5A36; }

        /* ── DIVIDER ── */
        .nav-divider {
          width: 1px;
          height: 20px;
          background: #E2E8E4;
          margin: 0 4px;
          flex-shrink: 0;
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #2B2B2B;
          flex-direction: column;
          gap: 5px;
          margin-left: 8px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: currentColor;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE OVERLAY ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: #06291A;
          display: flex;
          flex-direction: column;
          padding: 100px 40px 48px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
          overflow-y: auto;
        }
        .mobile-overlay.open { transform: translateX(0); }

        .mobile-nav-links { list-style: none; flex: 1; padding: 0; margin: 0; }
        .mobile-nav-link {
          display: block;
          font-family: var(--font-display), 'Cormorant Garamond', serif;
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 400;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: color 0.2s ease, padding-left 0.2s ease;
          letter-spacing: 0.02em;
        }
        .mobile-nav-link:hover { color: #E8C87A; padding-left: 8px; }

        .mobile-sub-links {
          padding: 8px 0 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-sub-link {
          font-family: var(--font-sans), 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s ease;
        }
        .mobile-sub-link:hover { color: #E8C87A; }

        .mobile-bottom {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.12);
          margin-top: 24px;
        }
        .mobile-lang-row { display: flex; gap: 12px; }
        .mobile-lang-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .mobile-lang-btn.active { border-color: #D4A857; color: #E8C87A; }
        .mobile-contact {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }

        /* ── CART DRAWER ── */
        .cart-overlay-bg {
          position: fixed;
          inset: 0;
          background: rgba(10,68,40,0.35);
          z-index: 1100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
          backdrop-filter: blur(2px);
        }
        .cart-overlay-bg.open { opacity: 1; pointer-events: all; }

        .cart-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 380px;
          max-width: 95vw;
          background: white;
          z-index: 1101;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.175,1);
          box-shadow: -16px 0 48px rgba(10,68,40,0.12);
        }
        .cart-drawer.open { transform: translateX(0); }

        .cart-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid #E2E8E4;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cart-title {
          font-family: var(--font-display), 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #0A4428;
          letter-spacing: 0.02em;
        }
        .cart-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #4A5C52;
          padding: 6px;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .cart-close:hover { background: #F7F8F6; }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-item {
          display: flex;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid #E2E8E4;
        }
        .cart-item-img {
          width: 72px; height: 72px;
          background: #F7F8F6;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid #E2E8E4;
        }
        .cart-item-info { flex: 1; }
        .cart-item-name {
          font-size: 14px; font-weight: 500; color: #2B2B2B; margin-bottom: 3px;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-item-sub {
          font-size: 12px; color: #4A5C52; margin-bottom: 10px;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-item-row { display: flex; align-items: center; justify-content: space-between; }
        .qty-control {
          display: flex;
          align-items: center;
          border: 1px solid #E2E8E4;
          border-radius: 8px;
          overflow: hidden;
        }
        .qty-btn {
          width: 28px; height: 28px;
          background: none; border: none;
          cursor: pointer;
          font-size: 16px; color: #4A5C52;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s ease;
        }
        .qty-btn:hover { background: #F7F8F6; color: #0E5A36; }
        .qty-num {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 500;
          border-left: 1px solid #E2E8E4;
          border-right: 1px solid #E2E8E4;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-item-price {
          font-size: 14px; font-weight: 500; color: #0A4428;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-empty {
          text-align: center; padding: 48px 0;
          color: #4A5C52; font-size: 14px;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-footer {
          padding: 20px 28px 32px;
          border-top: 1px solid #E2E8E4;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cart-subtotal {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #4A5C52;
          padding-bottom: 12px;
          border-bottom: 1px solid #E2E8E4;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-subtotal strong { font-size: 16px; font-weight: 600; color: #0A4428; }
        .cart-cta {
          display: block;
          width: 100%;
          padding: 14px 24px;
          background: #0A4428;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease;
          text-align: center;
          text-decoration: none;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-cta:hover { background: #0E5A36; }
        .cart-continue {
          text-align: center;
          font-size: 12px;
          color: #4A5C52;
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.15s;
          font-family: var(--font-sans), 'DM Sans', sans-serif;
        }
        .cart-continue:hover { color: #0E5A36; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav-links    { display: none; }
          .nav-contact  { display: none; }
          .nav-divider  { display: none; }
          .lang-btn span { display: none; }
          .lang-btn { padding: 6px 8px; }
          .hamburger { display: flex; }
        }
        @media (max-width: 640px) {
          .nav-inner { padding: 0 24px; height: 72px; }
          .nav-logo { margin-right: auto; }
          .cred-strip { padding: 0 16px; font-size: 10px; }
          .cart-drawer { width: 100%; }
        }
      `}</style>

      <div className="ceovia-root" dir={activeLang.dir}>

        {/* ── CREDIBILITY STRIP ──────────────────────────────────────── */}
        <div className={`cred-strip${stripVisible ? '' : ' hidden'}`}>
          <div style={{ width: 32 }} />
          <div className="strip-msg" key={stripIndex}>
            {STRIP_MESSAGES[stripIndex]}
          </div>
          <button
            type="button"
            className="strip-close"
            onClick={() => setStripVisible(false)}
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </div>

        {/* ── MAIN NAVBAR ────────────────────────────────────────────── */}
        <nav className={`ceovia-nav${scrolled ? ' scrolled' : ''}`}>
          <div className="nav-inner">

            {/* Logo */}
            <Link href="/" aria-label="CEOVIA — return to homepage" className="nav-logo">
              <Image
                src="/images/ceovia-logo.jpg"
                alt="CEOVIA logo"
                width={156}
                height={72}
                priority
                className="block h-[48px] w-auto object-contain md:h-[70px]"
              />
            </Link>

            {/* Primary nav links */}
            <ul className="nav-links">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : item.href !== '#' && pathname.startsWith(item.href)

                return (
                  <li key={item.label} className="nav-item">
                    {item.mega ? (
                      <>
                        <Link
                          href={item.href}
                          className={`nav-link${isActive ? ' active' : ''}`}
                        >
                          {item.label}
                          <svg className="nav-chevron" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </Link>
                        <div className="mega-menu">
                          {item.mega.columns.map((col) => (
                            <div key={col.heading}>
                              <div className="mega-col-heading">{col.heading}</div>
                              {col.links.map((link) => (
                                <Link key={link.label} href={link.href} className="mega-link">
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`nav-link${isActive ? ' active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Right actions */}
            <div className="nav-actions">

              {/* Language selector */}
              <div className="lang-selector" ref={langRef}>
                <button
                  type="button"
                  className="lang-btn"
                  onClick={() => setLangOpen((o) => !o)}
                  aria-label="Select language"
                  aria-expanded={langOpen}
                >
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 1C7 1 9.5 4 9.5 7C9.5 10 7 13 7 13" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 1C7 1 4.5 4 4.5 7C4.5 10 7 13 7 13" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1.5 7H12.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2 4.5H12M2 9.5H12" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                  </svg>
                  <span>{activeLang.label}</span>
                  <svg
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      width: 10, height: 10,
                      transition: 'transform 0.2s',
                      transform: langOpen ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {langOpen && (
                  <div className="lang-dropdown" role="listbox" aria-label="Language options">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={activeLang.code === lang.code}
                        className={`lang-option${activeLang.code === lang.code ? ' active' : ''}`}
                        onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                      >
                        <span aria-hidden="true">{getFlag(lang.code)}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="nav-divider" aria-hidden="true" />

              {/* Search */}
              <button
                type="button"
                className="nav-action-btn"
                aria-label="Search"
              >
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Contact */}
              <Link href="/contact" className="nav-contact">
                Contact
              </Link>

              <div className="nav-divider" aria-hidden="true" />

              {/* Shop shortcut — CEOVIA uses direct checkout rather than a persistent cart. */}
              <Link
                href="/products/ceovia-90-day"
                className="nav-action-btn"
                aria-label="Shop CEOVIA"
              >
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5H3.5L5 11H13.5L15.5 5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6.5" cy="14" r="1" fill="currentColor" />
                  <circle cx="12.5" cy="14" r="1" fill="currentColor" />
                </svg>
              </Link>

              {/* Hamburger (mobile only — shown via CSS) */}
              <button
                type="button"
                className={`hamburger${mobileOpen ? ' open' : ''}`}
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <span />
                <span />
                <span />
              </button>

            </div>
          </div>
        </nav>

      </div>

      {/* ── MOBILE OVERLAY ─────────────────────────────────────────────── */}
      <div
        className={`mobile-overlay${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
              {item.mega && (
                <div className="mobile-sub-links">
                  {item.mega.columns.flatMap((col) =>
                    col.links.map((link) => (
                      <Link
                        key={col.heading + link.label}
                        href={link.href}
                        className="mobile-sub-link"
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-bottom">
          <div className="mobile-lang-row">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`mobile-lang-btn${activeLang.code === lang.code ? ' active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <Link href="/contact" className="mobile-contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* ── CART DRAWER ────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`cart-overlay-bg${cartOpen ? ' open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${cartOpen ? ' open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
      >
        <div className="cart-header">
          <span className="cart-title">Your Cart</span>
          <button
            type="button"
            className="cart-close"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* TODO: connect to Shopify cart context — replace MOCK_CART */}
        <div className="cart-body">
          {MOCK_CART.length === 0 ? (
            <div className="cart-empty">
              <p style={{ fontSize: 32, marginBottom: 12 }}>🌿</p>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            MOCK_CART.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" stroke="#0E5A36" strokeWidth="1.5" opacity="0.4" />
                    <path d="M12 16 Q16 8 20 16 Q16 24 12 16Z" fill="#0E5A36" opacity="0.5" />
                  </svg>
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-sub">{item.subtitle}</div>
                  <div className="cart-item-row">
                    <div className="qty-control">
                      <button type="button" className="qty-btn" aria-label="Decrease quantity">−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button type="button" className="qty-btn" aria-label="Increase quantity">+</button>
                    </div>
                    <span className="cart-item-price">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {MOCK_CART.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              {/* TODO: connect to Shopify cart context — replace cartSubtotal */}
              <strong>{cartSubtotal}</strong>
            </div>
            {/* TODO: connect cart drawer CTA to the real Shopify cart/checkout flow */}
            <Link href="/contact" className="cart-cta">
              Proceed to Checkout →
            </Link>
            <button
              type="button"
              className="cart-continue"
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
