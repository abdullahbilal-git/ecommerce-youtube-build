import { previewClient } from "@/sanity/lib/client"
import { validatePreviewUrl } from "@sanity/preview-url-secret"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    previewClient,
    request.url
  )

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 })
  }

  // Await draftMode() because it returns a Promise
  const dm = await draftMode()
  dm.enable() // ✅ now no TypeScript error

  redirect(redirectTo)
}
