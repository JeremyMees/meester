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

const projectOverviewType = defineType({
  name: 'projectOverview',
  title: 'Project overview',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'projects',
      type: 'array',
      description: 'Select between 2 and 10 projects to show in the overview',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            filter: ({ document }) => ({
              filter: 'language == $language',
              params: { language: document?.language },
            }),
          },
        },
      ],
      validation: rule => rule.required() && rule.min(2) && rule.max(10),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Project overview',
      }
    },
  },
})

const servicesGridType = defineType({
  name: 'servicesGrid',
  title: 'Services Grid',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'preTitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: rule => rule.required() && rule.min(3) && rule.max(6),
            }),
          ],
        },
      ],
      validation: rule => rule.max(3),
    }),
  ],
})

const processStepsType = defineType({
  name: 'processSteps',
  title: 'Process Steps',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'preTitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              validation: rule => rule.required(),
            }),
          ],
        },
      ],
      validation: rule => rule.max(4),
    }),
    defineField({
      name: 'excludeStepLabels',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

const testimonialSliderType = defineType({
  name: 'testimonialSlider',
  title: 'Testimonial Slider',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'preTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      description: 'Select between 2 and 10 testimonials to show in the slider',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
          options: {
            filter: ({ document }) => ({
              filter: 'language == $language',
              params: { language: document?.language },
            }),
          },
        },
      ],
      validation: rule => rule.required() && rule.min(2) && rule.max(10),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonial Slider',
      }
    },
  },
})

const contactFormType = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'email',
      type: 'object',
      fields: [
        defineField({
          name: 'preTitle',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'email',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'location',
      type: 'object',
      fields: [
        defineField({
          name: 'preTitle',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'location',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
      }
    },
  },
})

export const blockTypes = [
  heroType,
  marqueeType,
  projectOverviewType,
  servicesGridType,
  processStepsType,
  testimonialSliderType,
  contactFormType,
]
