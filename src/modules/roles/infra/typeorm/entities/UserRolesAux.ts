import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, PrimaryColumn,UpdateDateColumn } from "typeorm";


@Entity('user_roles')
class UserRolesAux{

  @PrimaryColumn()
  role_id:number;

  @Column()
  user_id:number;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default UserRolesAux;
