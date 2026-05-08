export interface TranslationDoc {
  _id: string
  slug: string
  language: string
}

export interface TranslationGroup {
  translations: TranslationDoc[]
}
