import api from '@mimas/axios-config'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { Product } from '../pages/CreateOrder'

export type Supplier = {
  id: string
  name: string
  email: string
  address: string
  phone: string
  products: Product[]
}

interface SupplierProviderData {
  suppliers: Supplier[]
  addSupplier(supplier: Omit<Supplier, 'id'>): Promise<void>
}

const SupplierContext = createContext<SupplierProviderData>(
  {} as SupplierProviderData
)

const SupplierProvider: React.FC = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const addSupplier = useCallback(
    async ({
      name,
      phone,
      email,
      address,
      products = []
    }: Omit<Supplier, 'id'>) => {
      const supplier = {
        name,
        phone,
        email,
        address
      }

      const response = await api.post('/suppliers', supplier)

      setSuppliers(oldSuppliers => [
        ...oldSuppliers,
        { ...response.data, products }
      ])
    },
    []
  )

  useEffect(() => {
    async function getSuppliers() {
      const response = await api.get('/suppliers')
      setSuppliers(response.data.suppliers)
      return response.data.suppliers as Supplier[]
    }
    getSuppliers()
  }, [])

  return (
    <SupplierContext.Provider value={{ addSupplier, suppliers }}>
      {children}
    </SupplierContext.Provider>
  )
}

function useSupplier(): SupplierProviderData {
  const context = useContext(SupplierContext)

  if (!context) {
    throw new Error('useToast must be used within a SupplierProvider')
  }

  return context
}

export { useSupplier, SupplierProvider }
