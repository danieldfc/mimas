import { TypePix } from '@shared/utils'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250 })
  name: string

  @Column({ length: 255, nullable: true })
  email: string

  @Column({ length: 25 })
  phone: string

  @Column({
    type: 'enum',
    enumName: 'employee_type_pix_enum',
    default: 'random',
    name: 'type_pix'
  })
  typePix: TypePix

  @Column({ name: 'key_pix', length: 100 })
  keyPix: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
