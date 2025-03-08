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
    port: 3000,
    https: {
      key: './_.nimat.com.ar.key',
      cert: './_.nimat.com.ar.crt'
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
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
    locales: [{code: 'es', iso: 'es-es'}],
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
    transpile: ['fs', 'gsap']
  },
  prisma:{
    autoSetupPrisma: true
  }
})