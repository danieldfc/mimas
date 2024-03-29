import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import ToastContainer from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastProviderData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContaxt = createContext<ToastProviderData>({} as ToastProviderData)

interface ToastProviderProps {
  children: React.ReactNode
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, description, title }: Omit<ToastMessage, 'id'>) => {
      const id = uuid()

      const toast = {
        id,
        type,
        title,
        description
      }

      setMessages(oldMessages => [...oldMessages, toast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContaxt.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContaxt.Provider>
  )
}

function useToast(): ToastProviderData {
  const context = useContext(ToastContaxt)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { useToast, ToastProvider }
