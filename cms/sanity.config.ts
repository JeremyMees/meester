import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'
import { iconify } from 'sanity-plugin-iconify'
import { media } from 'sanity-plugin-media'

const locales = [
  { id: 'nl', title: '🇧🇪' },
  { id: 'en', title: '🇬🇧' },
]

export default defineConfig({
  name: 'default',
  title: 'mees(ter)',

  projectId: '08xftl8w',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: locales,
      schemaTypes: schemaTypes.map(type => type.name),
    }),
    iconify({
      collections: ['tabler'],
    }),
    media({
      locales: locales,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
