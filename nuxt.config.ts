// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
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
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-security',
    '@prisma/nuxt',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
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
            darkModeSelector: '.dark',
        }
      }
  }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
  },
  prisma:{
    autoSetupPrisma: true
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    }
  }
})