import { getRepository, Repository } from 'typeorm'
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
    priceProducts
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      finalPrice: workmanship + priceProducts,
      title,
      description
    })

    await this.save(order)

    return order
  }

  public findById(id: string): Promise<Order | undefined> {
    return this.ormRepository.findOne(id)
  }

  async save(order: Order): Promise<void> {
    await this.ormRepository.save(order)
  }
}
