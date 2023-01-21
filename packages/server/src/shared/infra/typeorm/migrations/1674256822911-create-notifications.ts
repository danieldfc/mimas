import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateNotifications1674256822911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_id',
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
            length: '255',
            isNullable: true
          },
          {
            name: 'url',
            type: 'varchar',
            length: '150',
            isNullable: true
          },
          {
            name: 'is_readed',
            type: 'boolean',
            isNullable: true,
            default: false
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
            name: 'NotificationUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications')
  }
}
