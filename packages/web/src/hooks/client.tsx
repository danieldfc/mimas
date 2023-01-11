import api from '@mimas/axios-config'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
}

interface ClientProviderData {
  clients: Client[]
  addClient(client: Omit<Client, 'id'>): Promise<void>
  updateClient(id: string, client: Omit<Client, 'id'>): Promise<void>
  deleteClient(id: string): Promise<void>
}

const ClientContaxt = createContext<ClientProviderData>(
  {} as ClientProviderData
)

const ClientProvider: React.FC = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([])

  const addClient = useCallback(
    async ({ name, phone, email, address }: Omit<Client, 'id'>) => {
      const client = {
        name,
        phone,
        email,
        address
      }

      const response = await api.post('/clients', client)

      setClients(oldClients => [...oldClients, response.data.client])
    },
    []
  )

  const updateClient = useCallback(
    async (id: string, { name, phone, email, address }: Omit<Client, 'id'>) => {
      const clientIndex = clients.findIndex(cli => cli.id === id)
      if (clientIndex < 0) return

      const client = {
        name,
        phone,
        email,
        address
      }

      const response = await api.put(`/clients/${id}`, client)

      setClients(oldClients => {
        oldClients[clientIndex] = {
          ...oldClients[clientIndex],
          ...response.data.client
        }

        return oldClients
      })
    },
    [clients]
  )

  const deleteClient = useCallback(
    async (id: string) => {
      const clientIndex = clients.findIndex(cli => cli.id === id)
      if (clientIndex < 0) return

      await api.delete(`/clients/${id}`)

      setClients(cli => cli.filter(c => c.id !== id))
    },
    [clients]
  )

  useEffect(() => {
    async function getClients() {
      const response = await api.get('/clients')
      setClients([...response.data.clients])
      return response.data.clients as Client[]
    }
    getClients()
  }, [])

  return (
    <ClientContaxt.Provider
      value={{ addClient, clients, updateClient, deleteClient }}
    >
      {children}
    </ClientContaxt.Provider>
  )
}

function useClient(): ClientProviderData {
  const context = useContext(ClientContaxt)

  if (!context) {
    throw new Error('useToast must be used within a ClientProvider')
  }

  return context
}

export { useClient, ClientProvider }
