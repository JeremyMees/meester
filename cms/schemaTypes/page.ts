import { defineField, defineType } from 'sanity'
import { isUniqueOtherThanLanguage } from '../utils/validator'
import { DocumentIcon } from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'documentTitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'documentTitle',
      },
      validation: rule =>
        rule.required() &&
        rule.custom(value => {
          return value && value.current?.startsWith('/')
            ? true
            : 'Slug must start with /'
        }),
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
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
        subtitle: 'Page component',
      }
    },
  },
})

export const pageDocumentTypes = [{ type: 'page' }, { type: 'policy' }]
