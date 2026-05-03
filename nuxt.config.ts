export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },

  vite: {
    optimizeDeps: {
      include: [],
    },
  },
})
