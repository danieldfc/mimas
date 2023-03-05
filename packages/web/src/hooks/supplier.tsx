import { api } from '../services/api'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { Product } from '../interfaces/Product'

export enum TypePix {
  CPF_CNPJ = 'cpf_cnpj',
  PHONE = 'phone',
  EMAIL = 'email',
  RANDOM = 'random'
}

export type Supplier = {
  id: string
  name: string
  email: string
  address: string
  phone: string
  phoneSecondary: string | null
  typePix: TypePix | null
  keyPix: string | null
  products: Product[]
}

interface SupplierProviderData {
  suppliers: Supplier[]
  supplierSelected?: Supplier
  addSupplier(supplier: Omit<Supplier, 'id'>): Promise<void>
  updateSupplier(id: string, supplier: Partial<Supplier>): Promise<void>
  deleteSupplier(id: string): Promise<void>
  selectSupplierId(id?: string): void
  updateSupplierAmountProducts(products: Product[]): void
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
      email,
      phone,
      address,
      phoneSecondary,
      keyPix,
      typePix,
      products = []
    }: Omit<Supplier, 'id'>) => {
      const response = await api.post('/suppliers', {
        name,
        email,
        phone,
        address,
        phoneSecondary,
        keyPix,
        typePix
      })

      if (!response) {
        throw new Error('Erro no cadastro de um novo fornecedor')
      }

      setSuppliers(oldSuppliers => [
        ...oldSuppliers,
        { ...response.data, products }
      ])
    },
    []
  )

  const updateSupplier = useCallback(
    async (id: string, supplier: Partial<Supplier>) => {
      const supplierIndex = suppliers.findIndex(s => s.id === id)
      if (supplierIndex < 0) return

      const response = await api.put(`/suppliers/${id}`, supplier)

      if (!response) {
        throw new Error('Erro ao atualizar o fornecedor')
      }

      setSuppliers(suppliers.map(sup => (sup.id === id ? response.data : sup)))

      if (supplierSelected) {
        setSupplierSelected(response.data)
      }
    },
    [suppliers, supplierSelected]
  )

  const updateSupplierAmountProducts = useCallback(
    (products: Product[]) => {
      setSuppliers(oldSuppliers =>
        oldSuppliers.map(supplier => {
          const product = products.find(p => p.supplierId === supplier.id)

          if (product) {
            const productSupplierIndex = supplier.products.findIndex(
              p => p.id === product.id
            )
            if (productSupplierIndex >= 0) {
              supplier.products[productSupplierIndex].maximumAmount -=
                product.qtd
              if (supplierSelected?.id === supplier.id) {
                setSupplierSelected({
                  ...supplierSelected,
                  products: supplier.products
                })
              }
            }
          }

          return supplier
        })
      )
    },
    [supplierSelected]
  )

  const deleteSupplier = useCallback(
    async (id: string) => {
      const supplierIndex = suppliers.findIndex(s => s.id === id)
      if (supplierIndex < 0) return

      const response = await api.delete(`/suppliers/${id}`)

      if (!response) {
        throw new Error('Erro ao deletar o fornecedor')
      }

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
        supplierSelected,
        updateSupplierAmountProducts
      }}
    >
      {children}
    </SupplierContext.Provider>
  )
}

function useSupplier(): SupplierProviderData {
  const context = useContext(SupplierContext)

  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider')
  }

  return context
}

export { useSupplier, SupplierProvider }
