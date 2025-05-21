"use client"

import { useEffect, type ReactNode } from "react"
import { initializeAmplify } from "@/lib/amplify-utils"

interface AmplifyProviderProps {
  children: ReactNode
}

export function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    // Initialize Amplify when the component mounts
    initializeAmplify()
  }, [])

  return <>{children}</>
}
