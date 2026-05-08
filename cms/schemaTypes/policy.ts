import { defineField, defineType } from 'sanity'
import { BillIcon } from '@sanity/icons'
import { isUniqueOtherThanLanguage } from '../utils/validator'
import { portableComponents } from './portable-blocks'

export const policyType = defineType({
  name: 'policy',
  title: 'Policies',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: rule =>
        rule.required() &&
        rule.custom(value => {
          return value && value.current?.startsWith('/policies/')
            ? true
            : 'Slug must start with /policies/'
        }),
    }),
    defineField({
      name: 'documentTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'effectiveDate',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'revisedDate',
      type: 'date',
    }),
    defineField({
      name: 'version',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      documentTitle: 'documentTitle',
      language: 'language',
    },
    prepare(selection) {
      const { documentTitle, language } = selection

      return {
        title: `${documentTitle ?? 'No title'} (${language})`,
        subtitle: 'Policy page',
      }
    },
  },
})
