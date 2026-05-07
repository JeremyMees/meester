import { defineField, defineType } from 'sanity'
import { BoltIcon } from '@sanity/icons'
import { requiredLinkField } from 'sanity-plugin-link-field'

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
      name: 'link',
      type: 'link',
      validation: rule => rule.custom(field => requiredLinkField(field)),
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      validation: rule => rule.required(),
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
