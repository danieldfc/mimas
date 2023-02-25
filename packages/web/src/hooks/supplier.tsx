import { api } from '../services/api'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { Product } from '../interfaces/Product'

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
  supplierSelected?: Supplier
  addSupplier(supplier: Omit<Supplier, 'id'>): Promise<void>
  updateSupplier(id: string, supplier: Partial<Supplier>): Promise<void>
  deleteSupplier(id: string): Promise<void>
  selectSupplierId(id?: string): void
}

const SupplierContext = createContext<SupplierProviderData>(
  {} as SupplierProviderData
)

const SupplierProvider: React.FC = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [supplierSelected, setSupplierSelected] = useState<
    Supplier | undefined
  >()

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

  const updateSupplier = useCallback(
    async (id: string, { name, phone, email, address }: Partial<Supplier>) => {
      const supplierIndex = suppliers.findIndex(s => s.id === id)
      if (supplierIndex < 0) return

      const supplier = {
        name,
        phone,
        email,
        address
      }

      const response = await api.put(`/suppliers/${id}`, supplier)

      setSuppliers(suppliers.map(sup => (sup.id === id ? response.data : sup)))

      if (supplierSelected) {
        setSupplierSelected(response.data)
      }
    },
    [suppliers, supplierSelected]
  )

  const deleteSupplier = useCallback(
    async (id: string) => {
      const supplierIndex = suppliers.findIndex(s => s.id === id)
      if (supplierIndex < 0) return

      await api.delete(`/suppliers/${id}`)

      setSuppliers(oldSuppliers =>
        oldSuppliers.filter(supplier => supplier.id !== id)
      )
    },
    [suppliers]
  )

  const selectSupplierId = useCallback(
    (id: string) => {
      const supplierIndex = suppliers.findIndex(s => s.id === id)
      if (supplierIndex < 0) setSupplierSelected(undefined)
      else setSupplierSelected(suppliers[supplierIndex])
    },
    [suppliers]
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
    <SupplierContext.Provider
      value={{
        addSupplier,
        suppliers,
        updateSupplier,
        deleteSupplier,
        selectSupplierId,
        supplierSelected
      }}
    >
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
