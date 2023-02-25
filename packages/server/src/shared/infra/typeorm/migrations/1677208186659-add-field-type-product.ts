import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldTypeProduct1677208186659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['meters', 'grams'],
        default: `'meters'`
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'type')
  }
}
