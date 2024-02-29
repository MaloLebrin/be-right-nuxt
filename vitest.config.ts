import { defineVitestConfig } from 'nuxt-vitest/config'

const config = {
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
} as any
export default defineVitestConfig({
  // test: { environment: 'nuxt' },
  ...config,
})
