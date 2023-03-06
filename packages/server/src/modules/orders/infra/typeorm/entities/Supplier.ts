import { TypePix } from '@shared/utils'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './Product'

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 100, unique: true })
  email: string

  @Column({ length: 25 })
  phone: string

  @Column({
    length: 25,
    name: 'phone_secondary',
    nullable: true,
    type: 'varchar'
  })
  phoneSecondary: string

  @Column({ length: 255 })
  address: string

  @Column({
    type: 'enum',
    enumName: 'suppliers_type_pix_enum',
    default: 'random',
    name: 'type_pix',
    nullable: true
  })
  typePix: TypePix

  @Column({ name: 'key_pix', length: 100, nullable: true })
  keyPix: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Product, product => product.supplier)
  products: Product[]
}
