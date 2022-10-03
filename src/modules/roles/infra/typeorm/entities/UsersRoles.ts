import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('roles')
class UserRoles{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default UserRoles;
