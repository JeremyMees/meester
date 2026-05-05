import { defineField, defineType } from 'sanity'
import { CubeIcon } from '@sanity/icons'
import { pageDocumentTypes } from './page'

const buttonLinkType = defineType({
  name: 'buttonLink',
  title: 'Button Link',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'reference',
      to: pageDocumentTypes,
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          'default',
          'outline',
          'accent',
          'secondary',
          'ghost',
          'link',
          'destructive',
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'size',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { value: 'default', title: 'Default' },
          { value: 'sm', title: 'Small' },
          { value: 'lg', title: 'Large' },
          { value: 'xl', title: 'Extra Large' },
          { value: 'icon', title: 'Icon' },
          { value: 'icon-sm', title: 'Icon Small' },
          { value: 'icon-lg', title: 'Icon Large' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'icon',
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare(selection) {
      const { label } = selection

      return {
        title: label,
        subtitle: 'Button Link',
        icon: CubeIcon,
      }
    },
  },
})

export const portableComponents = [{ type: 'block' }, { type: 'buttonLink' }]

export const portableBlockTypes = [buttonLinkType]
