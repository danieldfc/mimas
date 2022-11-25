import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldStatusOrder1669340957315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'status',
        type: 'enum',
        default: `'open'`,
        enum: [`open`, `finish`, `cancel`]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'status')
  }
}
