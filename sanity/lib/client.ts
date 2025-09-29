import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // ✅ good for production fetches
  stega: {
    studioUrl:
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}/studio`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
})

// 👇 Authenticated client for previews (drafts)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // no CDN → always fresh
  token: process.env.SANITY_API_READ_TOKEN, // ✅ from .env.local
  perspective: "previewDrafts",
})
