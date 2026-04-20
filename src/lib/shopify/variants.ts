export const CEOVIA_PRODUCT_HANDLE = 'ceovia-softgel-capsules'

export const CEOVIA_VARIANT_GIDS: Record<string, string> = {
  '30day': 'gid://shopify/ProductVariant/45992404746474',
  '60day': 'gid://shopify/ProductVariant/45992404779242',
  '90day': 'gid://shopify/ProductVariant/45992404812010',
  'subscription': 'gid://shopify/ProductVariant/45992404844778',
}

export const CEOVIA_SELLING_PLAN_ID =
  process.env.NEXT_PUBLIC_CEOVIA_SELLING_PLAN_ID || undefined
