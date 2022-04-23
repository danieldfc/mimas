import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createOrdersInClients1650725946568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_clients',
        columns: [
          {
            name: 'order_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'client_id',
            type: 'uuid',
            isPrimary: true
          }
        ],
        foreignKeys: [
          {
            name: 'OrderClient',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['order_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'ClientOrder',
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_clients')
  }
}
