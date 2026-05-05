import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons'
import { portableComponents } from './portable-blocks'

const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'preTitleOne',
      type: 'string',
    }),
    defineField({
      name: 'preTitleTwo',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [{ type: 'buttonLink' }],
      validation: rule => rule.max(2),
    }),
  ],
})

const marqueeType = defineType({
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'string' }],
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Marquee',
      }
    },
  },
})

export const blockTypes = [heroType, marqueeType]
