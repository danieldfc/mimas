import React from 'react'

import { AuthProvider } from './auth'
import { ClientProvider } from './client'
import { SupplierProvider } from './supplier'
import { ToastProvider } from './toast'

type AppProviderProps = {
  children: any
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ClientProvider>
          <SupplierProvider>{children}</SupplierProvider>
        </ClientProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
