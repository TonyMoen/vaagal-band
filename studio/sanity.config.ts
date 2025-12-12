import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {defaultDocumentNode} from './src/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'vaagal-app',

  projectId: 'h4lkrp1v',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
