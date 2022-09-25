import React from 'react'

import { AuthProvider } from './auth'
import { ClientProvider } from './client'
import { ToastProvider } from './toast'

type AppProviderProps = {
  children: any
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ClientProvider>{children}</ClientProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
