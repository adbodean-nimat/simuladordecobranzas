// https://nuxt.com/docs/api/configuration/nuxt-config
<<<<<<< HEAD
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
=======
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  runtimeConfig: {
    urlMount: ''
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
<<<<<<< HEAD
=======
export default defineNuxtConfig({
>>>>>>> df1469f0 (Initial commit)
=======
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
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
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-file-storage'
  ],
  experimental: {
    cookieStore: true
  },
  primevue: {
    composables: {
      exclude: ['useToast'],
    },
    options: {
      theme: {
          preset: Aura,
          options: {
            cssLayer: 'tailwind-base, primevue, tailwind-utilities',
            darkModeSelector:  '.dark',
        }
      }
  }
  },
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
=======
  },
  build: {
    transpile: ['fs']
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
  }
})