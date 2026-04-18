/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA DESIGN TOKENS — tailwind.config.js  (v3 — SPA Brief)
//
// Brand Palette (canonical):
//   Himalayan Green  #2D6A4F  — authority, nature, science
//   Deep Green       #1c2b1a  — hero backgrounds, deep sections
//   Omega Amber      #D4860A  — energy, bioactives, CTAs
//   Clinical White   #F8F4EF  — warm canvas (70% of visual space)
//   Bronze           #8B6914  — evidence badges, premium accents
//   Text Dark        #1A1A1A  — all body copy
//   Text Muted       #6B7280  — subtext, captions, labels
//
// Typography:
//   Playfair Display — display / heading serif
//   Inter            — body / UI sans-serif
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],

  theme: {
    extend: {

      // ── COLOUR PALETTE ─────────────────────────────────────────────────────
      colors: {

        // ── PRIMARY: Himalayan Green
        'himalayan-green': '#2D6A4F',
        'green': {
          50:  '#EAF2ED',
          100: '#C9E2D2',
          200: '#9FCDB5',
          300: '#71B794',
          400: '#4AA374',
          500: '#2D6A4F',   // ← HIMALAYAN GREEN (brand primary)
          600: '#245B42',
          700: '#1A4531',
          800: '#112D1F',
          900: '#07160F',
        },

        // ── DEEP GREEN — hero backgrounds, dark sections
        'deep-green': '#1c2b1a',

        // ── SECONDARY: Omega Amber
        'omega-amber': '#D4860A',
        'amber': {
          50:  '#FEF6E6',
          100: '#FCE5BA',
          200: '#F9CE88',
          300: '#F5B555',
          400: '#F09F2C',
          500: '#D4860A',   // ← OMEGA AMBER (brand secondary)
          600: '#A86808',
          700: '#7C4C06',
          800: '#513103',
          900: '#281902',
        },

        // ── ACCENT: Bronze — evidence badges, premium highlights
        'bronze': '#8B6914',
        'bronze-scale': {
          50:  '#F8F2E4',
          100: '#EDE0BB',
          200: '#DFCA8E',
          300: '#D0B261',
          400: '#BB983A',
          500: '#8B6914',   // ← BRONZE
          600: '#6D5210',
          700: '#4F3C0B',
          800: '#312506',
          900: '#150F02',
        },

        // ── CANVAS: Clinical White — warm, not stark
        'clinical-white': '#F8F4EF',

        // ── TEXT
        'text-dark':  '#1A1A1A',
        'text-muted': '#6B7280',

        // ── NEUTRAL GREYS
        'neutral': {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',   // matches text-muted
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // ── EVIDENCE BADGE SYSTEM
        'evidence': {
          gold:       '#D4A857',
          'gold-bg':  '#FAF4E6',
          silver:     '#87A878',
          'silver-bg':'#F0F5EE',
          bronze:     '#8B6914',
          'bronze-bg':'#F8F2E4',
          gray:       '#9DAAA2',
          'gray-bg':  '#F4F6F5',
        },

        // ── STATUS
        'status': {
          success: '#2D6A4F',
          warning: '#D4860A',
          error:   '#C0392B',
          info:    '#2980B9',
        },
      },

      // ── TYPOGRAPHY ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'Menlo', 'monospace'],
      },

      fontSize: {
        // ── Display Scale (Playfair Display)
        'display-2xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],  // 72px
        'display-xl':  ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],  // 56px
        'display-lg':  ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.015em' }], // 40px
        'display-md':  ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'display-sm':  ['1.5rem',  { lineHeight: '1.3' }],

        // ── Body Scale (Inter)
        'body-xl':  ['1.125rem', { lineHeight: '1.75' }],  // 18px
        'body-lg':  ['1rem',     { lineHeight: '1.7' }],   // 16px
        'body-md':  ['0.875rem', { lineHeight: '1.65' }],  // 14px
        'body-sm':  ['0.8125rem',{ lineHeight: '1.6' }],

        // ── Label / UI (Inter caps)
        'label-lg': ['0.75rem',    { lineHeight: '1', letterSpacing: '0.12em' }],
        'label-md': ['0.6875rem',  { lineHeight: '1', letterSpacing: '0.15em' }],  // 11px — brief spec
        'label-sm': ['0.625rem',   { lineHeight: '1', letterSpacing: '0.15em' }],
      },

      // ── SPACING ────────────────────────────────────────────────────────────
      // Base unit: 8px (0.5rem)
      spacing: {
        // Section vertical padding: 120px = 15rem = py-[120px]
        'section':     '7.5rem',    // 120px — sections
        'section-sm':  '4rem',      // 64px  — compact sections
        'section-lg':  '10rem',     // 160px — hero sections

        // Extended scale
        '18': '4.5rem',  '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
        '34': '8.5rem',  '38': '9.5rem', '42': '10.5rem','46': '11.5rem',
        '50': '12.5rem', '54': '13.5rem','58': '14.5rem','62': '15.5rem',
        '70': '17.5rem', '80': '20rem',  '90': '22.5rem','100': '25rem',
      },

      // ── MAX WIDTHS ─────────────────────────────────────────────────────────
      maxWidth: {
        'container':        '1200px',   // brief spec
        'container-wide':   '1440px',
        'container-narrow': '960px',
        'prose-narrow':     '60ch',
        'prose-wide':       '72ch',
        'hero-headline':    '16ch',
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
        'pill': '999px',
      },

      // ── SHADOWS ────────────────────────────────────────────────────────────
      boxShadow: {
        'sm':   '0 1px 3px 0 rgba(45,106,79,0.06), 0 1px 2px -1px rgba(45,106,79,0.06)',
        'md':   '0 4px 6px -1px rgba(45,106,79,0.08), 0 2px 4px -2px rgba(45,106,79,0.06)',
        'lg':   '0 10px 15px -3px rgba(45,106,79,0.08), 0 4px 6px -4px rgba(45,106,79,0.04)',
        'xl':   '0 20px 25px -5px rgba(45,106,79,0.10), 0 8px 10px -6px rgba(45,106,79,0.06)',
        'cta':       '0 4px 14px 0 rgba(45,106,79,0.35)',
        'cta-hover': '0 6px 20px 0 rgba(45,106,79,0.45)',
        'amber-cta': '0 4px 14px 0 rgba(212,134,10,0.35)',
        'bronze':    '0 0 0 1px rgba(139,105,20,0.20), 0 20px 40px -8px rgba(139,105,20,0.12)',
        'focus':     '0 0 0 3px rgba(45,106,79,0.20)',
        'card-hover':'0 8px 24px -4px rgba(45,106,79,0.10)',
      },

      // ── TRANSITIONS ────────────────────────────────────────────────────────
      transitionTimingFunction: {
        'ceovia':       'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ceovia-out':   'cubic-bezier(0.33, 1, 0.68, 1)',
        'ceovia-spring':'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── KEYFRAMES ──────────────────────────────────────────────────────────
      keyframes: {
        'fade-up':    { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-left':  { '0%': { opacity: '0', transform: 'translateX(24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'scale-in':   { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'ticker':     { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'shimmer':    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'line-draw':  { '0%': { width: '0' }, '100%': { width: '2rem' } },
        'count-up':   { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },

      animation: {
        'fade-up':    'fade-up 0.6s cubic-bezier(0.33, 1, 0.68, 1) both',
        'fade-up-lg': 'fade-up 0.8s cubic-bezier(0.33, 1, 0.68, 1) both',
        'fade-in':    'fade-in 0.4s ease-out both',
        'fade-left':  'fade-left 0.6s cubic-bezier(0.33, 1, 0.68, 1) both',
        'scale-in':   'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'shimmer':    'shimmer 1.5s linear infinite',
        'ticker':     'ticker 30s linear infinite',
        'line-draw':  'line-draw 0.5s cubic-bezier(0.33, 1, 0.68, 1) both',
      },

      // ── BACKGROUNDS ────────────────────────────────────────────────────────
      backgroundImage: {
        'deep-gradient':   'linear-gradient(160deg, #0d1a0b 0%, #1c2b1a 50%, #2D6A4F 100%)',
        'green-gradient':  'linear-gradient(160deg, #1c2b1a 0%, #2D6A4F 100%)',
        'amber-gradient':  'linear-gradient(135deg, #D4860A 0%, #F5B555 100%)',
        'bronze-gradient': 'linear-gradient(135deg, #8B6914 0%, #D0B261 50%, #8B6914 100%)',
        'grey-gradient':   'linear-gradient(180deg, #FFFFFF 0%, #F8F4EF 100%)',
        'grain':           "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E\")",
      },

      // ── Z-INDEX ────────────────────────────────────────────────────────────
      zIndex: {
        'nav':    '100',
        'sticky': '50',
        'overlay':'200',
        'modal':  '300',
        'toast':  '400',
      },
    },
  },

  // ── PLUGINS ────────────────────────────────────────────────────────────────
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),

    function({ addUtilities, addComponents, theme }) {

      addUtilities({
        // Section wrapper
        '.section-wrapper': {
          'paddingLeft':  'clamp(1.5rem, 5vw, 4rem)',
          'paddingRight': 'clamp(1.5rem, 5vw, 4rem)',
          'maxWidth':     '1200px',
          'marginLeft':   'auto',
          'marginRight':  'auto',
          'width':        '100%',
        },
        // Gold/bronze heading underline
        '.heading-underline::after': {
          'content':         '""',
          'display':         'block',
          'width':           '2rem',
          'height':          '2px',
          'backgroundColor': theme('colors.omega-amber'),
          'marginTop':       '0.75rem',
        },
        // Skeleton
        '.skeleton': {
          'background':     `linear-gradient(90deg, ${theme('colors.neutral.200')} 25%, ${theme('colors.neutral.100')} 50%, ${theme('colors.neutral.200')} 75%)`,
          'backgroundSize': '200% 100%',
          'animation':      'shimmer 1.5s linear infinite',
          'borderRadius':   '4px',
        },
        // Clinical data block
        '.clinical-data': {
          'fontFamily':      theme('fontFamily.mono'),
          'fontSize':        '0.8125rem',
          'lineHeight':      '1.6',
          'color':           theme('colors.text-dark'),
          'backgroundColor': theme('colors.clinical-white'),
          'borderLeft':      `3px solid ${theme('colors.himalayan-green')}`,
          'padding':         '0.75rem 1rem',
          'borderRadius':    '0 4px 4px 0',
        },
      });

      addComponents({
        // ── BUTTONS
        '.btn-primary': {
          'display':         'inline-flex',
          'alignItems':      'center',
          'justifyContent':  'center',
          'gap':             '0.5rem',
          'padding':         '0.8125rem 2rem',
          'backgroundColor': theme('colors.himalayan-green'),
          'color':           '#FFFFFF',
          'fontFamily':      theme('fontFamily.sans'),
          'fontSize':        '0.9375rem',
          'fontWeight':      '500',
          'letterSpacing':   '0.01em',
          'borderRadius':    '999px',
          'border':          'none',
          'boxShadow':       theme('boxShadow.cta'),
          'cursor':          'pointer',
          'transition':      'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.green.600'),
            'boxShadow':       theme('boxShadow.cta-hover'),
            'transform':       'translateY(-1px)',
          },
          '&:active': { 'transform': 'translateY(0)' },
          '&:focus-visible': { 'outline': 'none', 'boxShadow': theme('boxShadow.focus') },
        },

        '.btn-secondary': {
          'display':         'inline-flex',
          'alignItems':      'center',
          'justifyContent':  'center',
          'gap':             '0.5rem',
          'padding':         '0.75rem 2rem',
          'backgroundColor': 'transparent',
          'color':           theme('colors.himalayan-green'),
          'fontFamily':      theme('fontFamily.sans'),
          'fontSize':        '0.9375rem',
          'fontWeight':      '500',
          'borderRadius':    '999px',
          'border':          `2px solid ${theme('colors.himalayan-green')}`,
          'cursor':          'pointer',
          'transition':      'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.green.50'),
            'borderColor':     theme('colors.green.600'),
          },
          '&:focus-visible': { 'outline': 'none', 'boxShadow': theme('boxShadow.focus') },
        },

        '.btn-amber': {
          'display':         'inline-flex',
          'alignItems':      'center',
          'justifyContent':  'center',
          'gap':             '0.5rem',
          'padding':         '0.8125rem 2rem',
          'backgroundColor': theme('colors.omega-amber'),
          'color':           '#FFFFFF',
          'fontFamily':      theme('fontFamily.sans'),
          'fontSize':        '0.9375rem',
          'fontWeight':      '500',
          'borderRadius':    '999px',
          'border':          'none',
          'boxShadow':       theme('boxShadow.amber-cta'),
          'cursor':          'pointer',
          'transition':      'all 250ms cubic-bezier(0.33, 1, 0.68, 1)',
          '&:hover': {
            'backgroundColor': theme('colors.amber.600'),
            'transform':       'translateY(-1px)',
          },
        },

        // ── EVIDENCE BADGES
        '.badge-base': {
          'display':       'inline-flex',
          'alignItems':    'center',
          'gap':           '0.25rem',
          'padding':       '0.1875rem 0.625rem',
          'borderRadius':  '999px',
          'fontSize':      '0.6875rem',
          'fontWeight':    '500',
          'fontFamily':    theme('fontFamily.sans'),
          'letterSpacing': '0.06em',
          'lineHeight':    '1.4',
          'textTransform': 'uppercase',
        },
        '.badge-gold':    { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.gold-bg'),   'color': theme('colors.evidence.gold'),   'border': `1px solid ${theme('colors.evidence.gold')}` },
        '.badge-silver':  { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.silver-bg'), 'color': theme('colors.evidence.silver'), 'border': `1px solid ${theme('colors.evidence.silver')}` },
        '.badge-bronze':  { '@apply badge-base': {}, 'backgroundColor': theme('colors.evidence.bronze-bg'), 'color': theme('colors.evidence.bronze'), 'border': `1px solid ${theme('colors.evidence.bronze')}` },

        // ── SECTION VARIANTS
        '.section-white': { 'backgroundColor': '#FFFFFF', 'color': theme('colors.text-dark') },
        '.section-warm':  { 'backgroundColor': theme('colors.clinical-white'), 'color': theme('colors.text-dark') },
        '.section-green': { 'backgroundColor': theme('colors.himalayan-green'), 'color': '#FFFFFF' },
        '.section-deep':  { 'background': theme('backgroundImage.deep-gradient'), 'color': '#FFFFFF' },

        // ── CARDS
        '.card': {
          'backgroundColor': '#FFFFFF',
          'border':          `1px solid ${theme('colors.neutral.200')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
          'boxShadow':       theme('boxShadow.sm'),
          'transition':      'box-shadow 250ms ease, transform 250ms ease',
          '&:hover': { 'boxShadow': theme('boxShadow.card-hover'), 'transform': 'translateY(-2px)' },
        },
        '.card-warm': {
          'backgroundColor': theme('colors.clinical-white'),
          'border':          `1px solid ${theme('colors.neutral.200')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
        },
        '.card-featured': {
          'backgroundColor': '#FFFFFF',
          'border':          `2px solid ${theme('colors.omega-amber')}`,
          'borderRadius':    theme('borderRadius.xl'),
          'padding':         '1.5rem',
          'boxShadow':       theme('boxShadow.bronze'),
        },
      });
    },
  ],
};
