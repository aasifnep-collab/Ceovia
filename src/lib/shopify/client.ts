import {
  getShopifyStorefrontEndpoint,
  getShopifyStorefrontToken,
} from './config'

// ── GraphQL mutation ─────────────────────────────────────────────────────────

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
      warnings {
        code
        message
        target
      }
    }
  }
`

// ── Response types ────────────────────────────────────────────────────────────

type ShopifyUserError = {
  field: string[] | null
  message: string
}

type ShopifyWarning = {
  code: string
  message: string
  target: string
}

type CartCreateData = {
  cartCreate: {
    cart: {
      id: string
      checkoutUrl: string
    } | null
    userErrors: ShopifyUserError[]
    warnings: ShopifyWarning[]
  }
}

type StorefrontResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

type CartLine = {
  merchandiseId: string
  quantity: number
  sellingPlanId?: string
}

// ── Internal fetch wrapper ────────────────────────────────────────────────────

async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<StorefrontResponse<T>> {
  const endpoint = getShopifyStorefrontEndpoint()
  const token = getShopifyStorefrontToken()

  const controller = new AbortController()
  const timeoutId  = setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    })

    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(
        `Shopify HTTP ${response.status}: ${responseText.slice(0, 400)}`
      )
    }

    try {
      const json = JSON.parse(responseText) as StorefrontResponse<T>
      return json
    } catch {
      throw new Error(`Shopify response was not valid JSON: ${responseText.slice(0, 400)}`)
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('checkout_timeout')
    }
    throw err instanceof Error
      ? err
      : new Error('Unknown network error while contacting Shopify.')
  } finally {
    clearTimeout(timeoutId)
  }
}

// ── Shared checkout builder ───────────────────────────────────────────────────

function formatUserErrors(errors: ShopifyUserError[]): string {
  return errors
    .map((error) => {
      const field = error.field?.length ? ` (${error.field.join('.')})` : ''
      return `${error.message}${field}`
    })
    .join(' | ')
}

async function buildCheckout(lines: CartLine[]): Promise<string> {
  const variables = { input: { lines } }

  const result = await storefrontFetch<CartCreateData>(
    CART_CREATE_MUTATION,
    variables
  )

  if (result.errors && result.errors.length > 0) {
    const graphQlMessage = result.errors.map((error) => error.message).join(' | ')
    console.error('buildCheckout: GraphQL errors:', result.errors)
    throw new Error(`Shopify GraphQL error: ${graphQlMessage}`)
  }

  const cartCreate = result.data?.cartCreate
  if (!cartCreate) {
    throw new Error('Missing cartCreate response from Shopify.')
  }

  if (cartCreate.warnings.length > 0) {
    console.warn('buildCheckout: Shopify warnings:', cartCreate.warnings)
  }

  if (cartCreate.userErrors.length > 0) {
    console.error('buildCheckout: Shopify userErrors:', cartCreate.userErrors)
    throw new Error(`Shopify user error: ${formatUserErrors(cartCreate.userErrors)}`)
  }

  const url = cartCreate.cart?.checkoutUrl
  if (!url || typeof url !== 'string' || !url.startsWith('https://')) {
    console.error('buildCheckout: invalid checkoutUrl:', url)
    throw new Error('Missing checkout URL')
  }

  return url
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Create a one-time purchase checkout for a single variant.
 * Returns the Shopify-hosted checkout URL.
 */
export async function createCheckout(
  variantId: string,
  quantity: number
): Promise<string> {
  return buildCheckout([{ merchandiseId: variantId, quantity }])
}

/**
 * Create a subscription checkout using a Shopify Selling Plan.
 * If sellingPlanId is not provided, falls back to a one-time checkout.
 * Returns the Shopify-hosted checkout URL.
 */
export async function createSubscriptionCheckout(
  variantId: string,
  sellingPlanId?: string
): Promise<string> {
  if (!sellingPlanId) {
    throw new Error('selling_plan_not_configured')
  }
  return buildCheckout([{ merchandiseId: variantId, quantity: 1, sellingPlanId }])
}
