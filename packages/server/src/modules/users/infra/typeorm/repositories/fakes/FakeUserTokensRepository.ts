import { v4 as uuid } from 'uuid'
import IUserTokensRepository from '../IUserTokensRepository'
import { UserToken } from '../../entities/UserToken'

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(findToken => findToken.token === token)
  }
}

export default FakeUserTokensRepository
