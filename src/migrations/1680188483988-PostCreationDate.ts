import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PostCreationDate1658701645714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post_entity',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamptz',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('post_entity', 'createdAt');
  }
}
