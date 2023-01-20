import { ICreateUserTokenDTO } from '@modules/users/dtos'
import { UserToken } from '../entities/UserToken'

export default interface IUserTokensRepository {
  generate(data: ICreateUserTokenDTO): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>
  destroy(id: string): Promise<void>
}
