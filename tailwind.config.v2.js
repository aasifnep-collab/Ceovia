/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA DESIGN TOKENS — tailwind.config.js  (v2 — Updated per Brand Guideline)
//
// Color Source: CEOVIA Brand Color Guideline
// Philosophy:   "Nature is refined, not displayed raw"
// Origin Story: Leaf → Green (#0E5A36) | Berry → Orange (#F4A21E) | Oil → Gold (#D4A857)
// Usage Ratio:  70% White | 20% Green | 7% Grey | 3% Orange + Gold combined
//
// CRITICAL CHANGES from v1:
// - Primary green updated: #1A4731 → #0E5A36 (your brand green, more authoritative)
// - Background updated: warm cream #F7F4EE → clinical white #FFFFFF (matches guideline)
// - Orange updated: #E07B28 → #F4A21E (authentic Sea Buckthorn berry colour)
// - Gold updated: #C9A961 → #D4A857 (your brand gold — also used for Evidence Badges)
// - Grey updated: cream-tinted → clinical #F4F6F5
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {

      // ── COLOUR PALETTE ─────────────────────────────────────────────────────
      colors: {

        // ── PRIMARY: Botanical Green (Authority / Trust / Science)
        // Derived from: Sea Buckthorn leaf
        // Guideline hex: #0E5A36
        // Use: headings, brand anchors, section dividers, product identity, primary CTAs
        // NEVER use below 60% opacity — this colour has authority; don't dilute it
        'green': {
          50:  '#E8F5EE',
          100: '#C6E6D4',
          200: '#9DD0B5',
          300: '#6EBA93',
          400: '#3FA771',
          500: '#1A8050',   // Brighter mid — useful for links, focus rings
          600: '#0E5A36',   // ← PRIMARY BRAND GREEN (your hex)
          700: '#0A4428',
          800: '#072D1A',
          900: '#03180E',
        },

        // ── SECONDARY: Sea Buckthorn Orange (Energy / Vitality / Bioactives)
        // Derived from: Sea Buckthorn berry (authentic fruit colour)
        // Guideline hex: #F4A21E
        // Use: highlights, icons, key data points, secondary CTAs
        // CRITICAL: NEVER use as a background. Max 1 orange element visible per viewport.
        'orange': {
          50:  '#FEF7E8',
          100: '#FDEAC4',
          200: '#FBD58E',
          300: '#F9BF57',
          400: '#F7AD30',
          500: '#F4A21E',   // ← BRAND ORANGE (your hex)
          600: '#D4840A',
          700: '#A96708',
          800: '#7D4C06',
          900: '#523204',
        },

        // ── ACCENT: Golden Oil (Premium Layer / Refinement)
        // Derived from: Sea Buckthorn seed oil (extracted potency)
        // Guideline hex: #D4A857
        // Use: thin lines, premium highlights, subtle separators, Evidence Badges (Gold tier)
        // Rule: Use sparingly — this creates the luxury effect. Do not distribute broadly.
        'gold': {
          50:  '#FAF4E6',
          100: '#F2E4BE',
          200: '#E8CE90',
          300: '#DEB862',
          400: '#D4A857',   // ← BRAND GOLD / EVIDENCE BADGE GOLD (your hex)
          500: '#B88C3A',
          600: '#8F6B21',
          700: '#6B4E12',
          800: '#47330A',
          900: '#241A04',
        },

        // ── BASE: Clinical White (Foundation / Canvas)
        // Guideline hex: #FFFFFF
        // Dominates ALL layouts at 70% of visual space
        // Use: slide backgrounds, website pages, product visuals
        // This is NOT warm cream — it is clean, clinical, modern white
        'white': '#FFFFFF',

        // ── NEUTRAL: Soft Clinical Grey (Structure / Sections / Cards)
        // Guideline hex: #F4F6F5 (slightly green-tinted — connects back to botanical origin)
        'grey': {
          50:  '#F4F6F5',   // ← BRAND GREY (your hex) — section bg, cards, UI blocks
          100: '#E4E9E6',   // Slightly deeper — table rows, input backgrounds
          200: '#C8D1CB',   // Border grey — dividers, input borders, card outlines
          300: '#9DAAA2',   // Mid grey — placeholder text, disabled states
          400: '#708079',   // Muted text
          500: '#4A5C52',   // Secondary text (deeper)
        },

        // ── TEXT: Deep Charcoal (Readability)
        // Guideline hex: #2B2B2B
        // NOT pure black — softer on the clinical white background
        'text': {
          primary:    '#2B2B2B',   // ← BRAND TEXT (your hex) — all body copy
          secondary:  '#4A5C52',   // ← FIXED — was #708079 (3.9:1 FAIL) → 7.1:1 ✅ WCAG AA
          muted:      '#708079',   // ← FIXED — was #9DAAA2 (2.3:1 FAIL) → 4.2:1, large text only
          mutedSafe:  '#5A6B62',   // ← NEW   — 5.8:1 ✅, safe for small/body muted text
          inverse:    '#FFFFFF',   // Text on dark/green backgrounds
          heading:    '#0A4428',   // ← FIXED — was #0E5A36 → darker, more authoritative; 10.1:1 ✅
        },

        // ── EVIDENCE BADGE SYSTEM
        // Unified with brand gold. Gold badge = #D4A857 (matches accent gold exactly)
        // These appear on Science page, Practitioner Portal, and Blog posts
        'evidence': {
          gold:       '#D4A857',   // ● Peer-Reviewed Human RCT — matches brand accent gold
          'gold-bg':  '#FAF4E6',   // Gold badge background (gold-50)
          silver:     '#87A878',   // ○ In-Vivo / In-Vitro Studies
          'silver-bg':'#F0F5EE',   // Silver badge background
          bronze:     '#C4956A',   // △ Traditional / Historical Use
          'bronze-bg':'#FAF3EC',   // Bronze badge background
          gray:       '#9DAAA2',   // ◇ Mechanism Proposed (matches grey-300)
          'gray-bg':  '#F4F6F5',   // Hypothesis badge background (matches brand grey)
        },

        // ── SEMANTIC (System / Status)
        'status': {
          success: '#0E5A36',   // Uses brand green — compliance pass
          warning: '#F4A21E',   // Uses brand orange — yellow flag
          error:   '#C0392B',   // Compliance violation / blocked claim
          info:    '#2980B9',   // Informational callout
        },
      },

      // ── TYPOGRAPHY ─────────────────────────────────────────────────────────
      // CEOVIA Font System:
      // - Cormorant Garamond: luxury serif — hero headlines, page titles, product names
      // - DM Sans: clean modern sans — body copy, UI elements, buttons, nav
      // - DM Mono: clinical monospace — batch numbers, pricing codes, data labels
      //
      // Load via next/font in layout.tsx (NOT Google Fonts link tags):
      // import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'Menlo', 'monospace'],
      },

      fontSize: {
        // ── Display Scale (Cormorant Garamond)
        // clamp() for fluid type — scales smoothly between mobile and desktop
        'display-2xl': ['clamp(3rem, 6vw, 5.5rem)',    { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 5vw, 4rem)',    { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3rem)',      { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        'display-sm':  ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],

        // ── Body Scale (DM Sans)
        'body-xl':  ['1.25rem',  { lineHeight: '1.8' }],    // correct — do not change
        'body-lg':  ['1.125rem', { lineHeight: '1.75' }],   // correct — do not change
        'body-md':  ['1rem',     { lineHeight: '1.8' }],    // ← FIXED — was 1.7, improved readability
        'body-sm':  ['0.875rem', { lineHeight: '1.75' }],   // ← FIXED — was 1.65, improved readability
        'body-xs':  ['0.75rem',  { lineHeight: '1.7' }],    // ← FIXED — was 1.6, improved readability

        // ── Label / UI Scale (DM Sans — uppercase tracking)
        'label-lg': ['0.875rem',  { lineHeight: '1', letterSpacing: '0.08em' }],
        'label-md': ['0.75rem',   { lineHeight: '1', letterSpacing: '0.10em' }],
        'label-sm': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },

      // ── SPACING ────────────────────────────────────────────────────────────
      spacing: {
        // Extended scale for generous premium layouts
        '18': '4.5rem',   '22': '5.5rem',  '26': '6.5rem',  '30': '7.5rem',
        '34': '8.5rem',   '38': '9.5rem',  '42': '10.5rem', '46': '11.5rem',
        '50': '12.5rem',  '54': '13.5rem', '58': '14.5rem', '62': '15.5rem',
        '70': '17.5rem',  '80': '20rem',   '90': '22.5rem', '100': '25rem',

        // Section padding (vertical rhythm)
        'section-sm':  '4rem',     // 64px  — compact / mobile sections
        'section-md':  '6rem',     // 96px  — standard desktop sections
        'section-lg':  '8rem',     // 128px — hero / landmark sections
        'section-xl':  '10rem',    // 160px — full-bleed hero
        'section-2xl': '12rem',    // 192px — above-the-fold hero
      },

      // ── BORDER RADIUS ──────────────────────────────────────────────────────
      borderRadius: {
        'xs':   '2px',
        'sm':   '4px',
        DEFAULT:'6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        '3xl':  '32px',
        'pill': '999px',   // CTA buttons, badges, tags
      },

      // ── SHADOWS ────────────────────────────────────────────────────────────
      // All shadows use the brand green tint for cohesion — not generic grey shadows
      boxShadow: {
        'sm':   '0 1px 3px 0 rgba(14,90,54,0.06), 0 1px 2px -1px rgba(14,90,54,0.06)',
        'md':   '0 4px 6px -1px rgba(14,90,54,0.08), 0 2px 4px -2px rgba(14,90,54,0.06)',
        'lg':   '0 10px 15px -3px rgba(14,90,54,0.08), 0 4px 6px -4px rgba(14,90,54,0.04)',
        'xl':   '0 20px 25px -5px rgba(14,90,54,0.10), 0 8px 10px -6px rgba(14,90,54,0.06)',
        // Primary CTA button shadow (green)
        'cta':       '0 4px 14px 0 rgba(14,90,54,0.40)',
        'cta-hover': '0 6px 20px 0 rgba(14,90,54,0.50)',
        // Gold accent shadow — product imagery, "Recommended" card
        'gold':      '0 0 0 1px rgba(212,168,87,0.25), 0 20px 40px -8px rgba(212,168,87,0.15)',
        // Evidence badge glow
        'badge':     '0 2px 8px 0 rgba(212,168,87,0.20)',
        // Orange CTA (secondary)
        'orange-cta':'0 4px 14px 0 rgba(244,162,30,0.35)',
        // Input focus
        'focus':     '0 0 0 2px rgba(14,90,54,0.25)',
        // Card hover
        'card-hover':'0 8px 24px -4px rgba(14,90,54,0.12)',
      },

      // ── TRANSITIONS & ANIMATION ────────────────────────────────────────────
      transitionTimingFunction: {
        'ceovia':       'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ceovia-out':   'cubic-bezier(0.33, 1, 0.68, 1)',
        'ceovia-spring':'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      keyframes: {
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in':  { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'ticker':    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'shimmer':   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'badge-pulse':{ '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.75' } },
        // Gold line draw — used under section headings
        'line-draw': { '0%': { width: '0' }, '100%': { width: '2.5rem' } },
      },

      animation: {
        'fade-up':     'fade-up 0.6s cubic-bezier(0.33, 1, 0.68, 1) both',
        'fade-up-lg':  'fade-up 0.8s cubic-bezier(0.33, 1, 0.68, 1) both',
        'fade-in':     'fade-in 0.4s ease-out both',
        'scale-in':    'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'shimmer':     'shimmer 1.5s linear infinite',
        'ticker':      'ticker 30s linear infinite',
        'badge-pulse': 'badge-pulse 2s ease-in-out infinite',
        'line-draw':   'line-draw 0.6s cubic-bezier(0.33, 1, 0.68, 1) both',
      },

      // ── BACKGROUNDS ────────────────────────────────────────────────────────
      backgroundImage: {
        // Green gradient for hero sections (dark → mid green)
        'green-gradient':  'linear-gradient(160deg, #072D1A 0%, #0E5A36 60%, #0A4428 100%)',
        // Gold sheen — "Recommended" card, premium accents
        'gold-gradient':   'linear-gradient(135deg, #D4A857 0%, #F2E4BE 50%, #D4A857 100%)',
        // Subtle grey section separator
        'grey-gradient':   'linear-gradient(180deg, #FFFFFF 0%, #F4F6F5 100%)',
        // Grain texture overlay — adds premium depth without using colour
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        // Fade to white — used for section transitions
        'fade-white': 'linear-gradient(180deg, transparent 0%, #FFFFFF 100%)',
      },

      // ── Z-INDEX SCALE ──────────────────────────────────────────────────────
      zIndex: {
        'nav':      '100',
        'sticky':   '50',
        'overlay':  '200',
        'modal':    '300',
        'toast':    '400',
      },

      // ── MAX WIDTHS ─────────────────────────────────────────────────────────
      maxWidth: {
        'container':        '1280px',
        'container-wide':   '1440px',
        'container-narrow': '960px',
        'prose-narrow':     '60ch',
        'prose-wide':       '75ch',
        'hero-headline':    '18ch',
      },
    },
  },

  // ── PLUGINS ──────────────────────────────────────────────────────────────
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),

    function({ addUtilities, addComponents, theme }) {

      // ── UTILITY CLASSES ────────────────────────────────────────────────
      addUtilities({
        // Section wrapper — consistent horizontal padding + max-width centering
        '.section-wrapper': {
          'paddingLeft':  'clamp(1.5rem, 5vw, 5rem)',
          'paddingRight': 'clamp(1.5rem, 5vw, 5rem)',
          'maxWidth':     '1280px',
          'marginLeft':   'auto',
          'marginRight':  'auto',
          'width':        '100%',
        },
        // Gold heading underline — animates in on scroll
        '.heading-underline::after': {
          'content':         '""',
          'display':         'block',
          'width':           '2.5rem',
          'height':          '2px',
          'backgroundColor': theme('colors.gold.400'),
          'marginTop':       '0.5rem',
        },
        // Skeleton loader state
        '.skeleton': {
          'background':     'linear-gradient(90deg, #E4E9E6 25%, #F4F6F5 50%, #E4E9E6 75%)',
          'backgroundSize': '200% 100%',
          'animation':      'shimmer 1.5s linear infinite',
          'borderRadius':   '4px',
        },
        // Evidence badge base
        '.badge-base': {
          'display':        'inline-flex',
          'alignItems':     'center',
          'gap':            '0.25rem',
          'padding':        '0.125rem 0.5rem',
          'borderRadius':   '999px',
          'fontSize':       '0.6875rem',
          'fontWeight':     '500',
          'fontFamily':     theme('fontFamily.sans'),
          'letterSpacing':  '0.04em',
          'lineHeight':     '1.4',
        },
        // Clinical data block — used in clinical dossier / practitioner portal
        '.clinical-data': {
          'fontFamily':    theme('fontFamily.mono'),
          'fontSize':      '0.8125rem',
          'lineHeight':    '1.6',
          'color':         theme('colors.text.primary'),
          'backgroundColor': theme('colors.grey.50'),
          'borderLeft':    `3px solid ${theme('colors.green.600')}`,
          'padding':       '0.75rem 1rem',
          'borderRadius':  '0 4px 4px 0',
        },
      });

      // ── COMPONENT CLASSES ──────────────────────────────────────────────
      addComponents({

        // ── BUTTONS ──────────────────────────────────────────────────────

        // Primary CTA — Green (authority, commitment)
        // Use for: "Start Your 90-Day System", "Add to Cart", "Request Access"
        '.btn-primary': {
          'display':          'inline-flex',
          'alignItems':       'center',
          'justifyContent':   'center',
          'gap':              '0.5rem',
          'padding':          '0.75rem 1.75rem',
          'backgroundColor':  theme('colors.green.600'),
          'color':            '#FFFFFF',
          'fontFamily':       theme('fontFamily.sans'),
          'fontSize':         '0.9375rem',
          'fontWeight':       '500',
          'letterSpacing':    '0.01em',
          'borderRadius':     '999px',
          'border':           'none',
          'boxShadow':        theme('boxShadow.cta'),
          'cursor':           'pointer',
          'transition':       'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.green.700'),
            'boxShadow':       theme('boxShadow.cta-hover'),
            'transform':       'translateY(-1px)',
          },
          '&:active': { 'transform': 'translateY(0)', 'boxShadow': theme('boxShadow.cta') },
          '&:focus-visible': { 'outline': 'none', 'boxShadow': `${theme('boxShadow.cta')}, ${theme('boxShadow.focus')}` },
        },

        // Secondary CTA — Outlined Green (exploration, learning)
        // Use for: "Learn the Science", "Download Dossier"
        '.btn-secondary': {
          'display':          'inline-flex',
          'alignItems':       'center',
          'justifyContent':   'center',
          'gap':              '0.5rem',
          'padding':          '0.6875rem 1.625rem',
          'backgroundColor':  'transparent',
          'color':            theme('colors.green.600'),
          'fontFamily':       theme('fontFamily.sans'),
          'fontSize':         '0.9375rem',
          'fontWeight':       '500',
          'letterSpacing':    '0.01em',
          'borderRadius':     '999px',
          'border':           `2px solid ${theme('colors.green.600')}`,
          'cursor':           'pointer',
          'transition':       'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.green.50'),
            'borderColor':     theme('colors.green.700'),
            'color':           theme('colors.green.700'),
          },
          '&:focus-visible': { 'outline': 'none', 'boxShadow': theme('boxShadow.focus') },
        },

        // Tertiary CTA — Orange (energy, impulse, secondary attention)
        // Use for: "Take the Assessment", "Watch the Story", icon-CTAs
        // MAX ONE per viewport. Never use on the same screen as btn-primary.
        '.btn-tertiary': {
          'display':          'inline-flex',
          'alignItems':       'center',
          'justifyContent':   'center',
          'gap':              '0.5rem',
          'padding':          '0.75rem 1.75rem',
          'backgroundColor':  theme('colors.orange.500'),
          'color':            '#FFFFFF',
          'fontFamily':       theme('fontFamily.sans'),
          'fontSize':         '0.9375rem',
          'fontWeight':       '500',
          'borderRadius':     '999px',
          'border':           'none',
          'boxShadow':        theme('boxShadow.orange-cta'),
          'cursor':           'pointer',
          'transition':       'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.orange.600'),
            'transform':       'translateY(-1px)',
          },
        },

        // ── EVIDENCE BADGES ──────────────────────────────────────────────
        '.badge-gold':       { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.gold-bg'), 'color': theme('colors.evidence.gold'), 'border': `1px solid ${theme('colors.evidence.gold')}` },
        '.badge-silver':     { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.silver-bg'), 'color': theme('colors.evidence.silver'), 'border': `1px solid ${theme('colors.evidence.silver')}` },
        '.badge-bronze':     { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.bronze-bg'), 'color': theme('colors.evidence.bronze'), 'border': `1px solid ${theme('colors.evidence.bronze')}` },
        '.badge-hypothesis': { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.gray-bg'), 'color': theme('colors.evidence.gray'), 'border': `1px solid ${theme('colors.evidence.gray')}` },

        // ── SECTION VARIANTS ─────────────────────────────────────────────
        // White section (dominant — 70% of page)
        '.section-white': {
          'backgroundColor': '#FFFFFF',
          'color':           theme('colors.text.primary'),
        },
        // Grey section (structure / cards — 7% of page)
        '.section-grey': {
          'backgroundColor': theme('colors.grey.50'),
          'color':           theme('colors.text.primary'),
        },
        // Green section (authority moments — 20% max — hero, closing CTA)
        '.section-green': {
          'backgroundColor': theme('colors.green.600'),
          'color':           '#FFFFFF',
        },
        // Green dark (deep hero, full-bleed backgrounds)
        '.section-green-dark': {
          'background':   theme('backgroundImage.green-gradient'),
          'color':        '#FFFFFF',
        },

        // ── CARDS ────────────────────────────────────────────────────────
        '.card': {
          'backgroundColor': '#FFFFFF',
          'border':          `1px solid ${theme('colors.grey.200')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
          'boxShadow':       theme('boxShadow.sm'),
          'transition':      'box-shadow 250ms ease, transform 250ms ease',
          '&:hover': {
            'boxShadow': theme('boxShadow.card-hover'),
            'transform': 'translateY(-2px)',
          },
        },
        '.card-grey': {
          'backgroundColor': theme('colors.grey.50'),
          'border':          `1px solid ${theme('colors.grey.100')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
        },
        // "Recommended" program card — gold border
        '.card-recommended': {
          'backgroundColor': '#FFFFFF',
          'border':          `2px solid ${theme('colors.gold.400')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
          'boxShadow':       theme('boxShadow.gold'),
        },

        // ── FORM ELEMENTS ────────────────────────────────────────────────
        '.input': {
          'width':           '100%',
          'padding':         '0.625rem 0.875rem',
          'backgroundColor': '#FFFFFF',
          'border':          `1px solid ${theme('colors.grey.200')}`,
          'borderRadius':    theme('borderRadius.md'),
          'fontFamily':      theme('fontFamily.sans'),
          'fontSize':        '0.9375rem',
          'color':           theme('colors.text.primary'),
          'transition':      'border-color 200ms ease, box-shadow 200ms ease',
          '&:focus': {
            'outline':     'none',
            'borderColor': theme('colors.green.600'),
            'boxShadow':   theme('boxShadow.focus'),
          },
          '&::placeholder': { 'color': theme('colors.text.muted') },
        },
      });
    },
  ],
};
