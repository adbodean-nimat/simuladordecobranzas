// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
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
  },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
  }
})