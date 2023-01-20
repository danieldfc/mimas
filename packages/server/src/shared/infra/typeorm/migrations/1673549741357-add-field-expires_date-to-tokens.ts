import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldExpiresDateToTokens1673549741357
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_tokens',
      new TableColumn({
        name: 'expires_date',
        type: 'timestamp'
      })
    )

    await queryRunner.changeColumn(
      'user_tokens',
      'token',
      new TableColumn({
        name: 'refresh_token',
        type: 'varchar'
      })
    )

    await queryRunner.dropColumn('user_tokens', 'updated_at')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_tokens',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      })
    )
    await queryRunner.changeColumn(
      'user_tokens',
      'refresh_token',
      new TableColumn({
        name: 'token',
        type: 'uuid'
      })
    )
    await queryRunner.dropColumn('user_tokens', 'expires_date')
  }
}
