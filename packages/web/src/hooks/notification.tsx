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
  read(id: string): Promise<void>
  readAll(): Promise<void>
}

const NotificationContext = createContext<NotificationProviderData>(
  {} as NotificationProviderData
)

interface NotificationProviderProps {
  children: React.ReactNode
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    async function getNotifications() {
      const todayResponse = await api.get('/orders/notifications/today')
      const response = await api.get('/notifications')
      if (!response || !todayResponse) {
        throw new Error('Erro ao buscar as notificações')
      }
      setNotifications([...response.data.notifications])
      return response.data.notifications as Notification[]
    }
    getNotifications()
  }, [])

  const readAll = useCallback(async () => {
    const response = await api.put('/notifications')

    if (!response) {
      throw new Error('Erro ao buscar ao ler todas as notificações')
    }

    setNotifications(oldNotifications => {
      oldNotifications.forEach(oldNotification => {
        oldNotification.isReaded = true
      })
      return [...oldNotifications]
    })
  }, [])

  const read = useCallback(
    async (id: string) => {
      const notificationIndex = notifications.findIndex(
        notification => notification.id === id
      )
      if (notificationIndex < 0) return

      const response = await api.patch(`/notifications/${id}`)

      if (!response) {
        throw new Error('Erro ao ler a notificação')
      }

      setNotifications(oldNotifications => {
        oldNotifications[notificationIndex] = {
          ...oldNotifications[notificationIndex],
          isReaded: true
        }

        return oldNotifications
      })
    },
    [notifications]
  )

  return (
    <NotificationContext.Provider value={{ notifications, readAll, read }}>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotification(): NotificationProviderData {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }

  return context
}

export { useNotification, NotificationProvider }
