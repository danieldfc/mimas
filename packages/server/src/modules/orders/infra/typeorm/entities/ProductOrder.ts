import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity('products_orders')
export class ProductOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'qtd_product' })
  qtdProduct!: number

  @Column({ name: 'product_id' })
  productId!: number

  @Column({ name: 'order_id' })
  orderId!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Order, order => order.postToProducts)
  order!: Order

  @ManyToOne(() => Product, product => product.postToProducts)
  product!: Product
}
