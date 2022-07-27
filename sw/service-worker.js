import { configureServiceWorker } from 'react-storefront/sw'
import { Prefetcher } from '@layer0/prefetch/sw'

new Prefetcher().route()

const maxAgeSeconds = 60 * 60 // 1 hour

configureServiceWorker({
  api: [
    { path: '/api/p/[productId]', maxAgeSeconds },
    { path: '/api/s/[...categorySlug]', maxAgeSeconds },
    { path: '/api', maxAgeSeconds },
  ],
})
