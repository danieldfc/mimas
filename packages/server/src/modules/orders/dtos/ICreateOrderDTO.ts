import { Client } from '@modules/clients/infra/typeorm/entities/Client'

export interface ICreateOrderInProduct {
  qtd: number
  productId: string
}

export default interface ICreateOrderDTO {
  title: string
  description: string
  workmanship: number
  priceProducts: number
  client: Client
}
