import React from 'react'

import { AuthProvider } from './auth'
import { ClientProvider } from './client'
import { ToastProvider } from './toast'

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ClientProvider>{children}</ClientProvider>
    </ToastProvider>
  </AuthProvider>
)

export default AppProvider
