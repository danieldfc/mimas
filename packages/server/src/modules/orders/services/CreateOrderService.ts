import IClientsRepository from '@modules/clients/infra/typeorm/repositories/IClientsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { Order } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'
import IProductsOrdersRepository from '../infra/typeorm/repositories/IProductsOrdersRepository'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'

interface IProduct {
  productId: string
  qtd: number
}

interface IProductMerged {
  id: string
  price: number
  qtd: number
}

interface IRequest {
  title: string
  description: string
  workmanship: number
  products: IProduct[]
  clientId: string
}

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductsOrdersRepository')
    private productsOrdersRepository: IProductsOrdersRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    description,
    products,
    title,
    workmanship,
    clientId
  }: IRequest): Promise<Order> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    if (workmanship <= 0) {
      throw new AppError('Não informado preço de mão de obra')
    }

    if (!products.length) {
      throw new AppError('Não informado produtos.')
    }

    const productsVerified = await this.getProducts(products)
    const productsEntities = await this.productsRepository.findByIds(
      productsVerified.map(p => p.id)
    )
    const priceProductsTotal = this.getPriceTotalProduct(productsVerified)

    const order = await this.ordersRepository.create({
      title,
      description,
      workmanship,
      priceProducts: priceProductsTotal,
      client
    })

    for (const product of productsEntities) {
      const findProductVerified = productsVerified.find(
        p => p.id === product.id
      )
      if (findProductVerified) {
        this.productsOrdersRepository.create({
          order,
          product,
          qtdProduct: findProductVerified.qtd
        })
      }
    }

    return order
  }

  private async getProducts(products: IProduct[]): Promise<IProductMerged[]> {
    const productsVerified = await this.productsRepository.findByIds(
      products.map(p => p.productId)
    )

    return productsVerified.reduce((acc, product) => {
      const productFound = products.find(p => p.productId === product.id)
      if (productFound) {
        acc.push({
          id: product.id,
          price: parseInt(product.price.replace('$', '')),
          qtd: productFound.qtd
        })
      }
      return acc
    }, [] as IProductMerged[])
  }

  private getPriceTotalProduct(products: IProductMerged[]): number {
    return products.reduce(
      (acc, product) => acc + product.price * product.qtd,
      0
    )
  }
}
