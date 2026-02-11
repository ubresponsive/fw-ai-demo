'use client'

import { createContext, useContext } from 'react'

export type AppShellContextValue = {
  userName: string
  userEmail: string
  sidebarCollapsed: boolean
}

export const AppShellContext = createContext<AppShellContextValue>({
  userName: '',
  userEmail: '',
  sidebarCollapsed: false,
})

export function useAppShell() {
  return useContext(AppShellContext)
}
