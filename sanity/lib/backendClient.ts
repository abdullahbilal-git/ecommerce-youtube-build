import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ❌ disable CDN, because writes require direct API
  token: process.env.SANITY_API_WRITE_TOKEN, // ✅ must be a valid write token
});
