import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldTelSecundarySupplier1677459566524
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'phone_secondary',
        type: 'varchar',
        length: '25',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('suppliers', 'phone_secondary')
  }
}
