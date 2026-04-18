// Single Shopify product variant used for CEOVIA one-time purchases.
// Bottle-count options are represented by checkout quantity, not separate variants.
export const CEOVIA_BOTTLE_VARIANT_GID = 'gid://shopify/ProductVariant/45992404746474'

export const CEOVIA_VARIANT_GIDS: Record<string, string> = {
  '1-bottle':  CEOVIA_BOTTLE_VARIANT_GID,
  '2-bottles': CEOVIA_BOTTLE_VARIANT_GID,
  '3-bottles': CEOVIA_BOTTLE_VARIANT_GID,
  // Legacy keys retained for compatibility during transition
  '30day': CEOVIA_BOTTLE_VARIANT_GID,
  '60day': CEOVIA_BOTTLE_VARIANT_GID,
  '90day': CEOVIA_BOTTLE_VARIANT_GID,
  'subscription': CEOVIA_BOTTLE_VARIANT_GID,
}

export const CEOVIA_SELLING_PLAN_ID =
  process.env.NEXT_PUBLIC_CEOVIA_SELLING_PLAN_ID || undefined
