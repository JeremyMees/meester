import type { ButtonVariants } from '~/components/ui/button'

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

type RichBlock = {
  _type: 'block'
  _key: string
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  listItem?: 'bullet' | 'number'
  markDefs?: Array<{ href?: string; _type: 'link'; _key: string }>
  level?: number
}

export type PortableTextValue =
  | Array<RichBlock | ButtonLinkBlock | InlineLinkBlock>
  | null
  | undefined

export type SanityIcon = { _type: 'icon'; name?: string }

export interface ButtonLinkBlock {
  _type: 'buttonLink'
  _key?: string
  label?: string
  link?: SanityLink | null
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  icon?: SanityIcon
}

export interface InlineLinkBlock {
  _type: 'inlineLink'
  _key?: string
  label?: string
  link?: SanityLink | null
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
