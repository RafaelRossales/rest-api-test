import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserRoles1664676436253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable( new Table({
        name:"user_roles",
        columns:[
          {
            name:'role_id',
            type:'int',
            isPrimary:true
          },
          {
            name:'user_id',
            type:'int',
            isPrimary:true
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
        ],
        foreignKeys:[{
            name:'roleId',
            referencedTableName:'roles',
            referencedColumnNames:['id'],
            columnNames:['role_id'],
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
          },
          {
            name:'userId',
            referencedTableName:'users',
            referencedColumnNames:['id'],
            columnNames:['user_id'],
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
          }]
      }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_roles')
    }

}
