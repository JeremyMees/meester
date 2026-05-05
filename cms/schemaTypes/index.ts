import { blockTypes } from './blocks'
import { portableBlockTypes } from './portable-blocks'
import { pageBuilderType } from './page-builder'
import { pageType } from './page'
import { seoType } from './seo'

export const schemaTypes = [
  ...blockTypes,
  ...portableBlockTypes,
  pageBuilderType,
  pageType,
  seoType,
]
