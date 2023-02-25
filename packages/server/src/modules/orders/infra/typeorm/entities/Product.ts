import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Supplier } from './Supplier'

export enum ProductType {
  METERS = 'meters',
  GRAMS = 'grams'
}

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

  @Column({ type: 'enum', enumName: 'products_type_enum' })
  type: ProductType

  @Column({ type: 'double precision', name: 'maximum_amount' })
  maximumAmount: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Supplier, supplier => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier
}
