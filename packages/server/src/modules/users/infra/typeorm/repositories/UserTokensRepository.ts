import { Repository, getRepository } from 'typeorm'

import IUserTokensRepository from './IUserTokensRepository'
import { UserToken } from '../entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/users/dtos'

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  public async generate({
    userId,
    refreshToken,
    expiresDate
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
      refreshToken,
      expiresDate
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({ where: { token } })
  }

  public async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({ where: { userId, refreshToken } })
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
