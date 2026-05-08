import { blockTypes } from './blocks'
import { portableBlockTypes } from './portable-blocks'
import { pageBuilderType } from './page-builder'
import { pageType } from './page'
import { projectType } from './project'
import { testimonialType } from './testimonial'
import { policyType } from './policy'
import { seoType } from './seo'
import { globalConfigTypes } from './global-config'

export const schemaTypes = [
  ...globalConfigTypes,
  ...blockTypes,
  ...portableBlockTypes,
  pageBuilderType,
  pageType,
  projectType,
  testimonialType,
  policyType,
  seoType,
]
