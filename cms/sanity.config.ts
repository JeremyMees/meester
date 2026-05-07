import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'
import { iconify } from 'sanity-plugin-iconify'
import { media } from 'sanity-plugin-media'
import { linkField } from 'sanity-plugin-link-field'
import { pageDocumentTypes } from './schemaTypes/page'

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
    linkField({
      linkableSchemaTypes: pageDocumentTypes.map(page => page.type),
      referenceFilterOptions: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
