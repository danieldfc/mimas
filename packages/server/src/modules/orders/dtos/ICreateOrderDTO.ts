import { Client } from '@modules/clients/infra/typeorm/entities/Client'

export interface IMetadadoProduct {
  productId: string
  qtd: number
}

export interface IProductMerged {
  id: string
  title: string
  description: string
  price: number
  qtd: number
}

export default interface ICreateOrderDTO {
  title: string
  description: string
  workmanship: number
  priceProducts: number
  client: Client
  deliveryAt: Date | null
  metadado: IProductMerged[]
}
