// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'adadsadsasd'
    }
  },
  prisma: {
    autoSetupPrisma: true
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-security',
    '@prisma/nuxt',
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
            darkModeSelector: '.dark',
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
  },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
  },
  build: {
    transpile: ['fs']
  }
})