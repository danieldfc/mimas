import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEmployee1678051519677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '25'
          },
          {
            name: 'type_pix',
            type: 'enum',
            enum: ['cpf_cnpj', 'phone', 'email', 'random'],
            default: `'random'`,
            isNullable: true
          },
          {
            name: 'key_pix',
            type: 'varchar',
            length: '100',
            isNullable: true
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
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees')
  }
}
