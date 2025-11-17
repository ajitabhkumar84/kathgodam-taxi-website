import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Kathgodam Taxi Website',

<<<<<<< HEAD
  projectId: '2o6xnbku',
  dataset: 'production',
=======
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
>>>>>>> claude/design-templates-sanity-01E8CezEreNJKNHH91gruqZd

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
