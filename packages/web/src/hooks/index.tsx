import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { AuthProvider } from './auth'
import { ClientProvider } from './client'
import { SupplierProvider } from './supplier'
import { ToastProvider } from './toast'

type AppProviderProps = {
  children: any
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <ToastProvider>
          <ClientProvider>
            <SupplierProvider>{children}</SupplierProvider>
          </ClientProvider>
        </ToastProvider>
      </AuthProvider>
    </CookiesProvider>
  )
}
