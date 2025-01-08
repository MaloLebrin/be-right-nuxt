export default defineNuxtConfig({
  typescript: {
    // typeCheck: true,
    strict: true,
  },

  devtools: {
    enabled: import.meta.env.DEV,
  },
  eslint: {
    config: {
      standalone: false // <---
    }
  },
  experimental: {
    componentIslands: true,
  },

  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    '/login': { prerender: true },
    // Products page generated on demand, revalidates in background, cached until API response changes
    // '/products': { swr: true },
    // Product pages generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
    // '/products/**': { swr: 3600 },
    // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    // '/blog': { isr: 3600 },
    // Blog post page generated on demand once until next deployment, cached on CDN
    // '/blog/**': { isr: true },
    // Admin dashboard renders only on client-side
    '/blog/**': { prerender: true },
    '/admin/**': { ssr: false },
    '/addresse/**': { ssr: false },
    '/answer/**': { ssr: false },
    '/destinataire/**': { ssr: false },
    '/evenement/**': { ssr: false },
    '/groupe/**': { ssr: false },
    '/mon-compte/**': { ssr: false },
    '/notifications/**': { ssr: false },
    '/paiements/**': { ssr: false },
    // Products page generated on demand, revalidates in background, cached until API response changes
    // '/products': { swr: true },
    // Product pages generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
    // '/products/**': { swr: 3600 },
    // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    // '/blog': { isr: 3600 },
    // Blog post page generated on demand once until next deployment, cached on CDN
    // '/blog/**': { isr: true },
    // Admin dashboard renders only on client-side
    // Add cors headers on API routes
    // '/api/**': { cors: true },
    // Redirects legacy urls
    // '/old-page': { redirect: '/new-page' }
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '76x76', href: 'apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon-16x16.png' },
      ],
    },
    layoutTransition: {
      mode: 'out-in',
      name: 'layout',
    },
  },

  image: {
    dir: 'public',
    provider: 'netlify',
    domains: [
      'https://images.unsplash.com',
      'https://source.unsplash.com',
      'https://be-right.co/',
    ],
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://be-right.co/',
      siteName: 'Be Right',
      siteDescription: 'Révolutionnez votre gestion des droits à l\'image',
      language: 'fr',
    },
  },

  extends: [

  ],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-vitest',
    '@pinia-plugin-persistedstate/nuxt',
    // 'nuxt-schema-org',
    ['nuxt-purgecss', {
      // attention purgeCss enlève le style de vcalendar
      enabled: false, // Always enable purgecss
      // safelist: [
      //   ...(Object.keys(colors).reduce((acc: string[], name) => {
      //     acc.push(`bg-${name}-50`)
      //     acc.push(`bg-${name}-100`)
      //     acc.push(`text-${name}-500`)
      //     acc.push(`text-${name}-700`)
      //     acc.push(`border-${name}-500`)
      //     acc.push(`border-${name}-700`)
      //     return acc
      //   }, [])),
      //   'bg-gray-800',
      //   'text-white',
      // ],
    }],
    'dayjs-nuxt',
    '@nuxt/image',
    '@unlok-co/nuxt-stripe',
    '@nuxt/eslint',
    '@nuxt/content',
  ],

  stripe: {
    server: {
      key: process.env.STRIPE_PRIVATE_KEY,
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  dayjs: {
    locales: ['en', 'fr'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'fr',
    defaultTimezone: 'Paris/France',
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },

  build: {
    transpile: [
      'v-calendar',
    ],
  },

  plugins: [
    '~/plugins/global.ts',
    '~/plugins/toast.ts',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@heroicons/vue/**',
        '@headlessui/vue',
        '@vueuse/components',
        'yup',
        'vee-validate',
        '@vueuse/integrations/useJwt',
        '@vueuse/core',
        '@unhead/vue',
        'vue-signature-pad',
      ],
    },
  },

  compatibilityDate: '2025-01-03',
})
