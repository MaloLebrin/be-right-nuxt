import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    exclude: [
      './e2e/**',
    ],
    include: [
      './tests/**/*.test.ts',
    ],
    environment: 'happy-dom',
    testTransformMode: {
      ssr: [
        './tests/**/*.test.ts',
      ],
    },
  },
})
