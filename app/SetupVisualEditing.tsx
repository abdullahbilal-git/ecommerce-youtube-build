"use client"

import { useEffect } from "react"
import { enableVisualEditing } from "@sanity/visual-editing"

export function SetupVisualEditing() {
  useEffect(() => {
    enableVisualEditing()
  }, [])
  return null
}
