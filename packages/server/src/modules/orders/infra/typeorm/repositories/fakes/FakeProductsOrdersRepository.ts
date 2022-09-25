import ICreateProductOrderDTO from '@modules/orders/dtos/ICreateProductOrderDTO'
import { v4 as uuidV4 } from 'uuid'
import { ProductOrder } from '../../entities/ProductOrder'
import IProductsOrdersRepository from '../IProductsOrdersRepository'

export default class FakeProductsOrdersRepository
  implements IProductsOrdersRepository
{
  private productsOrders: ProductOrder[] = []

  public async create({
    order,
    product,
    qtdProduct
  }: ICreateProductOrderDTO): Promise<ProductOrder> {
    const productOrder = new ProductOrder()

    Object.assign(productOrder, {
      id: uuidV4(),
      qtdProduct,
      product,
      order
    })

    this.productsOrders.push(productOrder)

    return productOrder
  }

  async save(productOrder: ProductOrder): Promise<void> {
    const findIndex = this.productsOrders.findIndex(
      findOrder => findOrder.id === productOrder.id
    )

    this.productsOrders[findIndex] = productOrder
  }
}
