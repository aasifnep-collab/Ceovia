import { cache } from 'react'
import {
  getShopifyStorefrontEndpoint,
  getShopifyStorefrontToken,
} from './config'
import { CEOVIA_VARIANT_GIDS } from './variants'

export type CeoviaOfferKey = '60day' | '90day'

export type CeoviaOffer = {
  key: CeoviaOfferKey
  variantId: string
  title: string
  badge: string | null
  summary: string
  detail: string
  priceAmount: number
  priceCurrency: string
  priceDisplay: string
  availableForSale: boolean
}

type VariantNode = {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
}

type VariantQueryResponse = {
  nodes: Array<VariantNode | null>
}

const OFFER_DISPLAY: Record<CeoviaOfferKey, { badge: string | null; summary: string; detail: string }> = {
  '60day': {
    badge: null,
    summary: 'Foundational Program',
    detail: 'A shorter starting path for customers who want to begin the CEOVIA routine before committing to the full 90-day protocol.',
  },
  '90day': {
    badge: 'Recommended',
    summary: 'Recommended Full Protocol',
    detail: 'The complete CEOVIA 90-day system for uninterrupted use across the full intended protocol window.',
  },
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const getCeoviaOffers = cache(async (): Promise<CeoviaOffer[]> => {
  const endpoint = getShopifyStorefrontEndpoint()
  const token = getShopifyStorefrontToken()
  const variantIds = [CEOVIA_VARIANT_GIDS['60day'], CEOVIA_VARIANT_GIDS['90day']]

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: `
        query CeoviaOffers($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on ProductVariant {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      `,
      variables: { ids: variantIds },
    }),
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`Unable to load CEOVIA Shopify offers: HTTP ${response.status}`)
  }

  const payload = await response.json() as { data?: VariantQueryResponse; errors?: Array<{ message: string }> }

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(' | '))
  }

  const nodes = payload.data?.nodes ?? []
  const offerMap = new Map<string, VariantNode>()

  for (const node of nodes) {
    if (node) offerMap.set(node.id, node)
  }

  const orderedKeys: CeoviaOfferKey[] = ['60day', '90day']

  return orderedKeys.map((key) => {
    const variantId = CEOVIA_VARIANT_GIDS[key]
    const node = offerMap.get(variantId)

    if (!node) {
      throw new Error(`Missing Shopify variant data for CEOVIA offer "${key}"`)
    }

    const priceAmount = Number(node.price.amount)

    return {
      key,
      variantId,
      title: node.title,
      badge: OFFER_DISPLAY[key].badge,
      summary: OFFER_DISPLAY[key].summary,
      detail: OFFER_DISPLAY[key].detail,
      priceAmount,
      priceCurrency: node.price.currencyCode,
      priceDisplay: formatMoney(priceAmount, node.price.currencyCode),
      availableForSale: node.availableForSale,
    }
  })
})
