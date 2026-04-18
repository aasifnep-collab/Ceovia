export const SHOPIFY_API_VERSION = '2025-01'

export function getShopifyStoreDomain(): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim()

  if (!domain) {
    throw new Error('Shopify configuration error: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set.')
  }

  if (domain.startsWith('http://') || domain.startsWith('https://')) {
    throw new Error(
      'Shopify configuration error: Store domain must not include a protocol. Use akiuae.myshopify.com'
    )
  }

  return domain
}

export function getShopifyStorefrontToken(): string {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim()

  if (!token) {
    throw new Error('Shopify configuration error: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set.')
  }

  return token
}

export function getShopifyStorefrontEndpoint(): string {
  return `https://${getShopifyStoreDomain()}/api/${SHOPIFY_API_VERSION}/graphql.json`
}
