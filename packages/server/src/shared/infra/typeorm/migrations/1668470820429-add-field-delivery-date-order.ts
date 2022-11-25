import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldDeliveryDateOrder1668470820429
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'delivery_at',
        type: 'timestamptz',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'delivery_at')
  }
}
