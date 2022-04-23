import api from '@mimas/axios-config'
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect
} from 'react'

export interface Client {
  id?: string
  name: string
  phone: string
  email?: string
  address?: string
}

interface ClientProviderData {
  clients: Client[]
  addClient(client: Omit<Client, 'id'>): Promise<void>
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

  useEffect(() => {
    async function getClients() {
      const response = await api.get('/clients')
      setClients(response.data.clients)
      return response.data.clients as Client[]
    }
    getClients()
  }, [clients])

  return (
    <ClientContaxt.Provider value={{ addClient, clients }}>
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
