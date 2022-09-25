import { Product } from '@modules/orders/infra/typeorm/entities/Product'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        {
          title: 'Edredom de Berço',
          description: '1,45m comp. x 1m larg',
          price: 100
        },
        {
          title: 'Cabeceira com Zíper',
          description: '65cm larg. x 40cm alt',
          price: 100
        }
      ])
      .execute()
  }
}
