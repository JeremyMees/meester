import type { ButtonLink } from '~/types/sanity'

export const BLOCK_TYPES = ['hero'] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export const PAGE_BUILDER_TYPES = ['page'] as const

export type PageBuilderType = (typeof PAGE_BUILDER_TYPES)[number]

export interface BlockMeta {
  documentId: string
  documentType: string
}

export type PortableTextValue = Hero['title']

export interface LinkButtonWithSlug extends Omit<ButtonLink, 'link'> {
  link: string | null
}
