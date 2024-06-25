import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    exclude: [
      './e2e/**',
    ],
    include: [
      './tests/**/*.test.ts',
    ],
    testTransformMode: {
      ssr: [
        './tests/**/*.test.ts',
      ],
    },
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
  },
})
