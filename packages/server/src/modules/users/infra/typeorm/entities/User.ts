import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Exclude } from 'class-transformer'
import { UserToken } from './UserToken'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  admin: boolean

  @Column({ length: 250 })
  name: string

  @Column({ length: 50 })
  nick: string

  @Column({ length: 100, unique: true })
  email: string

  @Exclude()
  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => UserToken, userToken => userToken.user)
  userTokens: UserToken[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[]
}
