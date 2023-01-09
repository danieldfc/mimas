import { Supplier } from '../hooks/supplier'

export type Product = {
  id: string
  title: string
  description: string
  price: string
  supplierId: string
  supplier: Supplier

  add: boolean
  qtd: number
}
