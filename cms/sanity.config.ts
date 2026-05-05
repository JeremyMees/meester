import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'
import { iconify } from 'sanity-plugin-iconify'

export default defineConfig({
  name: 'default',
  title: 'mees(ter)',

  projectId: '08xftl8w',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'nl', title: 'Nederlands' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: schemaTypes.map(type => type.name),
    }),
    iconify({
      collections: ['tabler'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
