import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProduct1648932096117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'supplier_id',
            type: 'uuid'
          },
          {
            name: 'title',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'price',
            type: 'money'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'ProductSupplier',
            referencedTableName: 'suppliers',
            referencedColumnNames: ['id'],
            columnNames: ['supplier_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
