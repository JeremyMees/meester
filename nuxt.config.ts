import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
  ],

  i18n: {
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },

  shadcn: {
    prefix: '',
  },

  vite: {
    plugins: [
      // @ts-expect-error - Type 'Plugin<any>[]' is not assignable to type 'PluginOption'
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [],
    },
  },
})
