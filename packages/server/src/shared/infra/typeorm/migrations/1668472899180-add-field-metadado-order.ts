import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldMetadadoOrder1668472899180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'metadado',
        type: 'json'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'metadado')
  }
}
