import { v4 as uuid } from 'uuid'
import IUserTokensRepository from '../IUserTokensRepository'
import { UserToken } from '../../entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/users/dtos'

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate({
    userId,
    refreshToken,
    expiresDate
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      refreshToken,
      userId,
      expiresDate,
      createdAt: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(findToken => findToken.refreshToken === token)
  }

  public async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.userTokens.find(
      userToken =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    )
  }

  public async destroy(id: string): Promise<void> {
    const findIndexUserToken = this.userTokens.findIndex(
      userToken => userToken.id === id
    )
    if (findIndexUserToken >= 0) {
      this.userTokens.splice(findIndexUserToken, 1)
    }
  }
}

export default FakeUserTokensRepository
