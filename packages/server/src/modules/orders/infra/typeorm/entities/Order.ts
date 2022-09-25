import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ProductOrder } from './ProductOrder'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  title!: string

  @Column({ type: 'money' })
  finalPrice!: number

  @Column({ length: 255 })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => ProductOrder, orderProducts => orderProducts.order)
  orderProducts: ProductOrder[]

  @ManyToMany(() => Client, { eager: true })
  @JoinTable({
    name: 'orders_clients',
    inverseJoinColumn: {
      name: 'client_id',
      referencedColumnName: 'id'
    },
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id'
    }
  })
  clients: Client[]
}
