import { createClient } from '@sanity/client'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
  const client = createClient({
    projectId: process.env.NUXT_SANITY_PROJECT_ID!,
    dataset: process.env.NUXT_SANITY_DATASET!,
    apiVersion: process.env.NUXT_SANITY_API_VERSION ?? '2025-10-20',
    token: process.env.NUXT_SANITY_API_READ_TOKEN,
    useCdn: false,
  })

  const groups = await client.fetch<TranslationGroup[]>(metadataQuery)

  const urls: SitemapUrlInput[] = []
  const linkedIds = new Set<string>()

  for (const { translations } of groups) {
    if (!translations.length) continue

    for (const doc of translations) {
      linkedIds.add(doc._id)
    }

    urls.push(...buildUrls(translations))
  }

  const unlinked = await client.fetch<TranslationDoc[]>(unlinkedQuery, {
    linkedIds: [...linkedIds],
  })

  for (const doc of unlinked) {
    urls.push(...buildUrls([doc]))
  }

  return urls
})
