import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { type PluginOption } from 'vite'

export default defineNuxtConfig({
  devtools: {
    enabled: import.meta.env.DEV,
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
      siteDescription: 'Gérez enfin le droit à l\'image de vos clients facilement !',
      language: 'fr',
    },
  },

  extends: [
    'nuxt-seo-kit',
  ],

  typescript: {
    strict: true,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-vitest',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-typed-router',
    'nuxt-schema-org',
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
    '@tailvue/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
  ],

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

  plugins: ['~/plugins/global.ts'],

  vite: {
    plugins: [
      Components({
        resolvers: [
          HeadlessUiResolver({}),
          name => {
            if (name.includes('IconSolid')) {
              const realName = name.split('Solid')[0]
              return `@heroicons/vue/24/solid/esm/${realName}`
            }
            if (name.includes('IconOutline')) {
              const realName = name.split('Outline')[0]
              return `@heroicons/vue/24/outline/esm/${realName}`
            }
          },
        ],
        include: [/\.vue$/, /\.vue\?vue/],
        extensions: ['vue'],
      }),
      visualizer() as PluginOption,
    ],
  },
})
