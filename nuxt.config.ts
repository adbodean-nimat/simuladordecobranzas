// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
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
  compatibilityDate: '2024-04-03',
  devtools: { 
    enabled: true 
  },
  googleFonts: {
    families: {
      Inter: '200..700'
    }
  },
  modules: [
    '@nuxt/ui',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'v-gsap-nuxt',
    'nuxt-security',
    '@nuxtjs/google-fonts'
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
  },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
  },
  build: {
    transpile: ['gsap'],
  },
  vite: {
    ssr: {
      external: ["@prisma/client"]
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    }
  }
})