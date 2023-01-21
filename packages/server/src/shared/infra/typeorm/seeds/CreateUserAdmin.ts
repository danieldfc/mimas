import { hash } from 'bcryptjs'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '@modules/users/infra/typeorm/entities/User'

export default class CreateUserAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const userRepository = connection.getRepository(User)
    const userAdminIsExists = await userRepository.findOne({
      where: { email: 'dacia@bordados.com' }
    })

    if (!userAdminIsExists) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Dacia Felizardo',
            nick: 'daciafelizardo',
            admin: true,
            email: 'dacia@bordados.com',
            password: await hash('123456', 10)
          }
        ])
        .execute()
    }
  }
}
