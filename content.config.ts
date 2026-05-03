import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
    }),
    content_nl: defineCollection({
      type: 'page',
      source: {
        include: 'nl/**',
        prefix: '',
      },
    }),
  },
})
