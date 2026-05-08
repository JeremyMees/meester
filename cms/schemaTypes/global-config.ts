import { defineField, defineType } from 'sanity'
import {
  CogIcon,
  LinkIcon,
  EnvelopeIcon,
  PinIcon,
  FaceHappyIcon,
  CubeIcon,
} from '@sanity/icons'
import { requiredLinkField } from 'sanity-plugin-link-field'
import { portableComponents } from './portable-blocks'

const navigationLinkType = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: rule => rule.custom(field => requiredLinkField(field)),
    }),
  ],
})

const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      validation: rule => rule.required() && rule.min(1) && rule.max(5),
    }),
    defineField({
      name: 'cta',
      type: 'navigationLink',
      validation: rule => rule.required(),
    }),
  ],
})

const footerColumnEmailType = defineType({
  name: 'footerColumnEmail',
  title: 'Email',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
})

const footerColumnAddressType = defineType({
  name: 'footerColumnAddress',
  title: 'Address',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'address',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
})

const footerColumnSocialsType = defineType({
  name: 'footerColumnSocials',
  title: 'Socials',
  type: 'object',
  icon: FaceHappyIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'link',
              type: 'link',
            }),
          ],
        },
      ],
    }),
  ],
})

const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'columns',
      type: 'array',
      of: [
        { type: 'footerColumnEmail' },
        { type: 'footerColumnAddress' },
        { type: 'footerColumnSocials' },
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(3),
    }),
    defineField({
      name: 'policies',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      validation: rule => rule.required() && rule.min(1),
    }),
  ],
})

const configType = defineType({
  name: 'config',
  title: 'Global config',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'navigation',
      type: 'navigation',
      options: {
        collapsible: true,
      },
    }),
    defineField({
      name: 'footer',
      type: 'footer',
      options: {
        collapsible: true,
      },
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
      language: 'language',
    },
    prepare(selection) {
      const { language } = selection

      return {
        title: `Config (${language})`,
      }
    },
  },
})

export const globalConfigTypes = [
  navigationLinkType,
  navigationType,
  footerType,
  footerColumnEmailType,
  footerColumnAddressType,
  footerColumnSocialsType,
  configType,
]
