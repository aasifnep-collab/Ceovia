import { CEOVIA_VARIANT_GIDS } from './variants'

const VARIANT_KEYS = [
  '30day',
  '60day',
  '90day',
  'subscription',
] as const

export function validateShopifyConfig(): void {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

  if (!domain?.trim()) {
    throw new Error('CEOVIA launch blocked: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set.')
  }

  if (domain.startsWith('http://') || domain.startsWith('https://')) {
    throw new Error('CEOVIA launch blocked: Store domain must be hostname only (e.g., akiuae.myshopify.com)')
  }

  if (!token?.trim() || token.length < 20) {
    throw new Error('CEOVIA launch blocked: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is missing or invalid.')
  }

  for (const key of VARIANT_KEYS) {
    const gid = CEOVIA_VARIANT_GIDS[key]
    if (!gid?.startsWith('gid://shopify/ProductVariant/')) {
      throw new Error(`CEOVIA launch blocked: Invalid Shopify ProductVariant GID for "${key}". Got: ${gid}`)
    }
  }

}
