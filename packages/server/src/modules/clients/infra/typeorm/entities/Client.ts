import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name!: string

  @Column({ length: 100, unique: true, nullable: true })
  email?: string

  @Column({ length: 25 })
  phone!: string

  @Column({ length: 255 })
  address?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
