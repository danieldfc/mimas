import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldWorkmanship1673214190644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'workmanship',
        type: 'float',
        isNullable: true
      })
    )
    const ordersMetadado = await queryRunner.query(`
      SELECT * FROM orders
    `)

    for (let i = 0; i < ordersMetadado.length; i++) {
      const { id, finalPrice, metadado } = ordersMetadado[i]

      const totalProdutos = metadado.reduce((acc: any, dado: any) => {
        acc += dado.price * dado.qtd
        return acc
      }, 0)
      const workmanship =
        parseFloat(finalPrice.replace('$', '')) - totalProdutos

      await queryRunner.query(`
        UPDATE orders SET workmanship = ${workmanship} WHERE id = '${id}'
      `)
    }

    await queryRunner.changeColumn(
      'orders',
      'workmanship',
      new TableColumn({
        name: 'workmanship',
        type: 'float'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'workmanship')
  }
}
