import type { SitemapUrlInput } from '#sitemap/types'

const HREFLANG: Record<string, string> = {
  nl: 'nl-BE',
  en: 'en-GB',
}

export function toPath(slug: string, language: string): string {
  return language === 'nl' ? slug : `/${language}${slug}`
}

export function buildUrls(docs: TranslationDoc[]): SitemapUrlInput[] {
  return docs.map(doc => {
    const loc = toPath(doc.slug, doc.language)

    const alternatives = docs.map(d => ({
      hreflang: HREFLANG[d.language] ?? d.language,
      href: toPath(d.slug, d.language),
    }))

    const defaultDoc = docs.find(d => d.language === 'nl') ?? docs[0]

    if (defaultDoc) {
      alternatives.push({
        hreflang: 'x-default',
        href: toPath(defaultDoc.slug, defaultDoc.language),
      })
    }

    return { loc, alternatives }
  })
}
