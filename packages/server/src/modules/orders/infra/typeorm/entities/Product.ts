import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ProductOrder } from './ProductOrder'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  title: string

  @Column({ length: 255 })
  description: string

  @Column({ type: 'money' })
  price: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => ProductOrder, orderProducts => orderProducts.product)
  orderProducts: ProductOrder[]
}
