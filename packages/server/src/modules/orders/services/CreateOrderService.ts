import { inject, injectable } from 'tsyringe'
import { In } from 'typeorm'

import { env } from '@config/env'

import { AppError } from '@shared/errors/AppError'

import {
  IMetadadoProduct,
  IProductMerged
} from '@modules/orders/dtos/ICreateOrderDTO'

import { Order } from '@modules/orders/infra/typeorm/entities/Order'

import IOrdersRepository from '@modules/orders/infra/typeorm/repositories/IOrdersRepository'
import IProductsRepository from '@modules/orders/infra/typeorm/repositories/IProductsRepository'
import IClientsRepository from '@modules/clients/infra/typeorm/repositories/IClientsRepository'
import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'

interface IRequest {
  title: string
  description: string
  workmanship: number
  metadado: IMetadadoProduct[]
  clientsId: string[]
  deliveryAt: Date | null
  userId: string
}

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({
    userId,
    description,
    metadado,
    title,
    workmanship,
    clientsId,
    deliveryAt
  }: IRequest): Promise<Order> {
    const clients = await this.clientsRepository.findAll({
      where: { id: In(clientsId) }
    })

    if (!clients.length) {
      throw new AppError('Selecione pelo menos 1 cliente existente.', 404)
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

    await this.updateMaximumAmountProducts(productsVerified)

    const order = await this.ordersRepository.create({
      title,
      description,
      workmanship,
      priceProducts: priceProductsTotal,
      clients,
      deliveryAt,
      metadado: productsVerified
    })

    await this.notificationsRepository.create({
      userId,
      title: 'Pedido criado',
      description: `Um novo pedido chamado de '${order.title}' foi criado com sucesso.`,
      url: `${env.linkWeb}/orders/${order.id}`
    })

    return order
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

  private async updateMaximumAmountProducts(
    products: IProductMerged[]
  ): Promise<void> {
    await Promise.all(
      products.map(async p => {
        const product = await this.productsRepository.findById(p.id)

        if (product) {
          product.maximumAmount -= p.qtd
          if (product.maximumAmount < 0) product.maximumAmount = 0
          await this.productsRepository.save(product)
        }
      })
    )
  }
}
