import { Client } from '../hooks/client'

export type StatusOrder = 'finish' | 'cancel' | 'open'

export interface IProductMerged {
  id: string
  title: string
  description: string
  price: number
  qtd: number
}

export type Order = {
  id: string
  title: string
  finalPrice: string
  description: string
  deliveryAt: string
  clients: Client[]
  createdAt: Date
  status: StatusOrder
  metadado: IProductMerged[]
  workmanship: number
}
