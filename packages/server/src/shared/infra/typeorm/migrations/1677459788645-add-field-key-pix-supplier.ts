import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addFieldKeyPixSupplier1677459788645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'key_pix',
        type: 'varchar',
        length: '100',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('suppliers', 'key_pix')
  }
}
