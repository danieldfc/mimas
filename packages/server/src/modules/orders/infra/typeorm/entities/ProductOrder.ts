import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  qtdProduct: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product, product => product.orderProducts, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product
}
