import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/sanity',
    'motion-v/nuxt',
  ],

  css: ['~/assets/css/tailwind.css'],

  imports: { dirs: ['~/types/*.ts'] },

  runtimeConfig: {
    public: {
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
    },
  },

  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2025-10-20',
    token: process.env.NUXT_SANITY_API_READ_TOKEN,
    ignoreBrowserTokenWarning: true,
    visualEditing: {
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
    },
  },

  i18n: {
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },

  shadcn: { prefix: '' },

  image: {
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
      dataset: process.env.NUXT_SANITY_DATASET ?? '',
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@nuxtjs/sanity',
        '@sanity/client',
        '@portabletext/vue',
        'class-variance-authority',
        'reka-ui',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
})
