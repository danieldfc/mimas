import { getRepository, Repository } from 'typeorm'
import ICreateOrderDTO, {
  ICreateOrderInProduct
} from '../../../dtos/ICreateOrderDTO'
import { Order } from '../entities/Order'
import { Product } from '../entities/Product'
import IOrdersRepository from './IOrdersRepository'

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>

  private productRepository: Repository<Product>

  constructor() {
    this.ormRepository = getRepository(Order)
    this.productRepository = getRepository(Product)
  }

  public async create({
    title,
    description,
    workmanship,
    products
  }: ICreateOrderDTO): Promise<Order> {
    const productsVerified = await this.getProducts(products)
    const priceProducts = this.getPriceTotalProduct(productsVerified)
    const order = this.ormRepository.create({
      finalPrice: workmanship + priceProducts,
      title,
      description,
      postToProducts: productsVerified
    })
    await this.save(order)

    return order
  }

  private async getProducts(
    products: ICreateOrderInProduct[]
  ): Promise<Product[]> {
    const idsProducts = products.map(product => product.productId)
    return this.productRepository.findByIds(idsProducts)
  }

  private getPriceTotalProduct(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price, 0)
  }

  public findById(id: string): Promise<Order | undefined> {
    return this.ormRepository.findOne(id)
  }

  async save(order: Order): Promise<void> {
    await this.ormRepository.save(order)
  }
}
