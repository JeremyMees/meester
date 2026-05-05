import { defineField, defineType } from 'sanity'
import { BoltIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
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
        subtitle: 'Project',
      }
    },
  },
})
