import { defineField, defineType } from 'sanity'
import { ConfettiIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: ConfettiIcon,
  fields: [
    defineField({
      name: 'client',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
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
      client: 'client',
      language: 'language',
    },
    prepare(selection) {
      const { client, language } = selection

      return {
        title: `${client ?? 'No client'} (${language})`,
        subtitle: 'Testimonial',
      }
    },
  },
})
