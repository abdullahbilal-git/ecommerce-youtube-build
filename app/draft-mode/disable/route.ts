import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
  const dm = await draftMode() // await is required
  dm.disable()

  return redirect("/") // must return redirect
}
