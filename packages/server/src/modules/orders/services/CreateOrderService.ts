import IClientsRepository from '@modules/clients/infra/typeorm/repositories/IClientsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IMetadadoProduct, IProductMerged } from '../dtos/ICreateOrderDTO'

import { Order } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'

interface IRequest {
  title: string
  description: string
  workmanship: number
  metadado: IMetadadoProduct[]
  clientId: string
  deliveryAt: Date | null
}

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    description,
    metadado,
    title,
    workmanship,
    clientId,
    deliveryAt
  }: IRequest): Promise<Order> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    if (workmanship <= 0) {
      throw new AppError('Não informado preço de mão de obra')
    }

    if (!metadado.length) {
      throw new AppError('Não informado produtos.')
    }

    if (deliveryAt !== null) {
      this.verifyDeliveryDate(deliveryAt)
    }

    const productsVerified = await this.getProducts(metadado)
    const priceProductsTotal = this.getPriceTotalProducts(productsVerified)

    return this.ordersRepository.create({
      title,
      description,
      workmanship,
      priceProducts: priceProductsTotal,
      client,
      deliveryAt,
      metadado: productsVerified
    })
  }

  private verifyDeliveryDate(deliveryAt: Date): void {
    if (deliveryAt.getTime() <= new Date().getTime()) {
      throw new AppError(
        'Delivery date is recorded in the past, change it to greater than today'
      )
    }

    const hourUTC = deliveryAt.getUTCHours()
    const millisecondUTC = deliveryAt.getUTCMilliseconds()
    const secondUTC = deliveryAt.getUTCSeconds()
    const minuteUTC = deliveryAt.getUTCMinutes()
    const verifyZeroUTC =
      millisecondUTC === 0 && secondUTC === 0 && minuteUTC === 0
    const verifySixHour = hourUTC <= 6 && verifyZeroUTC
    const verifySeventeenHour = hourUTC >= 17 && verifyZeroUTC

    if (verifySixHour || verifySeventeenHour) {
      throw new AppError('Delivery date exceeds deadlines')
    }
  }

  private async getProducts(
    metadado: IMetadadoProduct[]
  ): Promise<IProductMerged[]> {
    const productsVerified = await this.productsRepository.findByIds(
      metadado.map(p => p.productId)
    )

    return productsVerified.reduce((acc, product) => {
      const productFound = metadado.find(p => p.productId === product.id)
      if (productFound) {
        acc.push({
          id: product.id,
          title: product.title,
          description: product.description,
          price: parseInt(product.price.replace('$', '')),
          qtd: productFound.qtd
        })
      }
      return acc
    }, [] as IProductMerged[])
  }

  private getPriceTotalProducts(products: IProductMerged[]): number {
    return products.reduce(
      (acc, product) => acc + product.price * product.qtd,
      0
    )
  }
}
