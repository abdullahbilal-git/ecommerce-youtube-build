'use client'

import { visionTool } from '@sanity/vision' 
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { debugSecrets } from "@sanity/preview-url-secret/sanity-plugin-debug-secrets"

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  visualEditing: true,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        preview: "/",
        previewMode: {
          enable: "/draft-mode/enable",
          disable: "/draft-mode/disable",
        },
      },
    }),
    debugSecrets(), // 👈 correct way
  ],
})
