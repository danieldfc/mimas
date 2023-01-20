import { hash } from 'bcryptjs'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '@modules/users/infra/typeorm/entities/User'

export default class CreateUserAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const userRepository = connection.getRepository(User)
    const userAdminIsExists = userRepository.findOne({
      where: { email: 'daniel.david772@gmail.com' }
    })

    if (!userAdminIsExists) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Daniel Felizardo',
            nick: 'danielfelizardo',
            admin: true,
            email: 'daniel.david772@gmail.com',
            password: await hash('123456', 10)
          }
        ])
        .execute()
    }
  }
}
