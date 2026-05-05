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
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'title',
      },
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
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { title, language } = selection

      return {
        title: `${title ?? 'No title'} (${language})`,
        subtitle: 'Page component',
      }
    },
  },
})

export const pageDocumentTypes = [{ type: 'page' }]
