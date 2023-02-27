import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldTypePixSupplier1677459779183
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'type_pix',
        type: 'enum',
        enum: ['cpf_cnpj', 'phone', 'email', 'random'],
        default: `'random'`,
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('suppliers', 'type_pix')
  }
}
