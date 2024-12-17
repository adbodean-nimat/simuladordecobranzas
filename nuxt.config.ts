// https://nuxt.com/docs/api/configuration/nuxt-config
<<<<<<< HEAD
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  routeRules:{
    '/': { prerender: true },
    '/login': { prerender: true }
  },
  runtimeConfig: {
    public: {
      apiToken: 'adadsadsasdfada',
      apiBase: 'adadsadsasd',
      apiLogin: 'adadsadsasdada',
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
=======
export default defineNuxtConfig({
>>>>>>> df1469f0 (Initial commit)
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
<<<<<<< HEAD
    '@nuxt/fonts',
    'nuxt-security',
    '@prisma/nuxt',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'v-gsap-nuxt'
  ],
  experimental: {
    cookieStore: true
  },
  primevue: {
    autoImport: false,
    composables: {
      exclude: ['useToast']
    },
    components: {
      include: ['Select', 'DataTable', 'Tag', 'Column', 'Toolbar', 'Badge']
    },
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        }
      }
  }
=======
    '@nuxtjs/i18n',
    'nuxt-security',
    '@prisma/nuxt',
    '@vueuse/nuxt'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  i18n: {
    locales: [{code: 'es', iso: 'es-AR'}],
    defaultLocale: 'es',
    lazy: true
>>>>>>> df1469f0 (Initial commit)
  },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
<<<<<<< HEAD
  },
  prisma:{
    autoSetupPrisma: true
  },
  build: {
    transpile: ['gsap'],
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    }
=======
>>>>>>> df1469f0 (Initial commit)
  }
})