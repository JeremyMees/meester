import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    'nuxt-studio',
  ],

  i18n: {
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },

  studio: {
    route: '/admin',
    dev: true,
    repository: {
      provider: 'github',
      owner: 'JeremyMees',
      repo: 'meester',
      branch: 'main',
    },
  },

  shadcn: { prefix: '' },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
  },
})
