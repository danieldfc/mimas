import IFindOrdersDTO from '@modules/orders/dtos/IFindOrdersDTO'
import { FindOneOptions, Repository, getRepository } from 'typeorm'
import ICreateOrderDTO from '../../../dtos/ICreateOrderDTO'
import { Order } from '../entities/Order'
import IOrdersRepository from './IOrdersRepository'

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
