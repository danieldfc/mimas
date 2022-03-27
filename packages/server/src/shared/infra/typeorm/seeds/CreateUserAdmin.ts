import { hash } from 'bcrypt'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '@modules/users/infra/typeorm/entities/User'

export default class CreateUserAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
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
