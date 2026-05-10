import tailwindcss from '@tailwindcss/vite'
import { createResolver } from 'nuxt/kit'
import { defaultSeo } from './app/utils/seo'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  experimental: {
    viewTransition: true,
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/sanity',
    '@nuxtjs/seo',
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
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'nl',
        name: 'Nederlands',
        language: 'nl-BE',
        file: 'nl.json',
      },
      {
        code: 'en',
        name: 'English',
        language: 'en-GB',
        file: 'en.json',
      },
    ],
  },

  shadcn: { prefix: '' },

  image: {
    quality: 90,
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
      dataset: process.env.NUXT_SANITY_DATASET ?? '',
    },
  },

  icon: {
    customCollections: [
      {
        prefix: 'meester',
        dir: resolve('./app/assets/vectors'),
      },
    ],
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL,
    name: defaultSeo.name,
    description: defaultSeo.description,
    trailingSlash: false,
    indexable: true,
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: defaultSeo.name,
      description: defaultSeo.description,
      logo: defaultSeo.logo,
      email: defaultSeo.email,
      telephone: defaultSeo.telephone,
      contactPoint: {
        telephone: defaultSeo.telephone,
        contactType: 'Customer Service',
        email: defaultSeo.email,
        availableLanguage: ['Dutch', 'English'],
      },
      sameAs: [],
      address: {
        addressCountry: 'Belgium',
        addressLocality: 'Kaggevinne',
        postalCode: '3293',
        streetAddress: 'Smodderpotstraat 15',
      },
    },
  },

  ogImage: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@nuxtjs/sanity',
        '@sanity/client',
        '@sanity/image-url',
        '@portabletext/vue',
        'class-variance-authority',
        'reka-ui',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
})
