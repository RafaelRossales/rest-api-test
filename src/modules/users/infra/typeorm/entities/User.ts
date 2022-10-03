import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude,Expose } from 'class-transformer'


/**
 * @ignore
 */
@Entity('users')
class User {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column()
  @Exclude()
  password:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}

export default User;
