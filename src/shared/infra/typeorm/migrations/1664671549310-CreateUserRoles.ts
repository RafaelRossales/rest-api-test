import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUserRoles1664671549310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(new Table({
        name:'roles',
        columns:[
            {
              name:'id',
              type:'int',
              isPrimary:true,
              isGenerated: true,
              generationStrategy:'increment',
            },
            {
              name:'name',
              type:'varchar',
            },
            {
              name:'created_at',
              type:'timestamp',
              default:'now()'
            },
            {
              name:'updated_at',
              type:'timestamp',
              default:'now()'
            }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('roles')
    }

}
