import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addFieldMaximumAmountProduct1677209279137
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'maximum_amount',
        type: 'double precision',
        default: 0
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'maximum_amount')
  }
}
