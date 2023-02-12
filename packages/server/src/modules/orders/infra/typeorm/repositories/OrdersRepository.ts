import { FindOneOptions, Repository, getRepository } from 'typeorm'

import IFindOrdersDTO from '@modules/orders/dtos/IFindOrdersDTO'
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import {
  Order,
  StatusOrder
} from '@modules/orders/infra/typeorm/entities/Order'
import IOrdersRepository from './IOrdersRepository'
import { padStart } from '@shared/utils/StringUtil'

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = getRepository(Order)
  }

  public async create({
    title,
    description,
    workmanship,
    priceProducts,
    clients,
    deliveryAt,
    metadado
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      finalPrice: workmanship + priceProducts,
      workmanship,
      title,
      description,
      clients,
      metadado,
      deliveryAt
    })

    await this.save(order)

    return order
  }

  public async findAll(options?: IFindOrdersDTO): Promise<Order[]> {
    return this.ormRepository.find({
      take: options?.first || 10,
      skip: options?.offset || 0,
      relations: ['clients']
    })
  }

  public async fetchAllOpenOrdersScheduledForToday(): Promise<Order[]> {
    const now = new Date()
    const month = padStart(String(now.getMonth() + 1), 2, '0')
    const day = padStart(String(now.getDate()), 2, '0')
    const dataComplete = `${now.getFullYear()}-${month}-${day}`

    const idsOrders: Array<{ id: string }> =
      await this.ormRepository.manager.query(
        `
        SELECT id FROM orders WHERE status = $1 AND created_at::date = $2
      `,
        [StatusOrder.OPEN, dataComplete]
      )

    return this.ormRepository.findByIds(idsOrders.map(i => i.id))
  }

  public findById(
    id: string,
    options: FindOneOptions<Order> = {}
  ): Promise<Order | undefined> {
    return this.ormRepository.findOne(id, options)
  }

  async save(order: Order): Promise<void> {
    await this.ormRepository.save(order)
  }
}
