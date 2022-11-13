import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ProductOrder } from './ProductOrder'
import { Supplier } from './Supplier'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'supplier_id' })
  supplierId: string

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

  @ManyToOne(() => Supplier, supplier => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier
}
