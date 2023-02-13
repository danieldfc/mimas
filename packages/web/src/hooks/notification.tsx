import { api } from '../services/api'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

export interface Notification {
  id: string
  userId: string
  title: string
  description: string
  url: string | null
  isReaded: boolean
  createdAt: string
  updatedAt: string
}

interface NotificationProviderData {
  notifications: Notification[]
  readAllNotifications(): Promise<void>
}

const NotificationContext = createContext<NotificationProviderData>(
  {} as NotificationProviderData
)

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    async function getNotifications() {
      const response = await api.get('/notifications')
      setNotifications([...response.data.notifications])
      return response.data.notifications as Notification[]
    }
    getNotifications()
  }, [])

  const readAllNotifications = useCallback(async () => {
    await api.put('/notifications')
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notifications, readAllNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

function useNotification(): NotificationProviderData {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useToast must be used within a NotificationProvider')
  }

  return context
}

export { useNotification, NotificationProvider }
