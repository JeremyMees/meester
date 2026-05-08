import type { ButtonLink } from '~/types/sanity'

export const BLOCK_TYPES = [
  'hero',
  'marquee',
  'projectOverview',
  'servicesGrid',
] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export const PAGE_BUILDER_TYPES = ['page'] as const

export type PageBuilderType = (typeof PAGE_BUILDER_TYPES)[number]

export interface BlockMeta {
  documentId: string
  documentType: string
}

export type PortableTextValue = Hero['title']

export interface LinkButton extends Omit<ButtonLink, 'link'> {
  link: SanityLink | null
}

export interface ImageAsset {
  hotspot?: SanityImageHotspot | null
  crop?: SanityImageCrop | null
  assetRef: string | null
  url: string | null
  altText: string
  title: string
  description: string
}

export interface SanityLink {
  type?: string | null
  url?: string | null
  blank?: boolean | null
  parameters?: string | null
  anchor?: string | null
}

export interface ProjectOverviewItem {
  _id: string
  title: string | null
  description: string | null
  link: SanityLink | null
  thumbnail: ImageAsset | null
}

export interface TestimonialSliderItem {
  _id: string
  name: string | null
  client: string | null
  description: string | null
}
