import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import { IProductMerged } from '@modules/orders/dtos/ICreateOrderDTO'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export enum StatusOrder {
  OPEN = 'open',
  FINISH = 'finish',
  CANCEL = 'cancel'
}

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

  @Column({
    name: 'delivery_at',
    nullable: true,
    type: 'timestamptz'
  })
  deliveryAt: Date | null

  @Column({ type: 'json' })
  metadado: IProductMerged[]

  @Column({ type: 'enum', enumName: 'orders_status_enum' })
  status: StatusOrder

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
