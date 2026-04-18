/**
 * Next.js instrumentation hook — runs once at server startup.
 *
 * The NEXT_RUNTIME guard ensures this only executes in the
 * Node.js server environment, not in Edge runtime or browser
 * bundles. Dynamic import keeps config-check.ts out of
 * client-side module graphs entirely.
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateShopifyConfig } = await import(
      './src/lib/shopify/config-check'
    )
    validateShopifyConfig()
  }
}
