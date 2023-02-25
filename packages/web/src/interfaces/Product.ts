import { Supplier } from '../hooks/supplier'

export enum ProductType {
  METERS = 'meters',
  GRAMS = 'grams'
}

export type Product = {
  id: string
  title: string
  description: string
  price: string
  type: ProductType
  maximumAmount: number
  supplierId: string
  supplier: Supplier

  add: boolean
  qtd: number
}
