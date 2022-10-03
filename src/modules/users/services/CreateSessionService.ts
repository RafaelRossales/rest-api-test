'use strict'

import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../../users/infra/typeorm/repositories/UsersRepository";
import { getManager } from 'typeorm';

/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  email:string,
  password:string
}

/**
 *
 */
interface IResponse{
  user:User;
  token:string
}

/**
 * @description - Serviço de inicialização de seção
 */
class CreateSessionsService{

  public async execute({email,password}:IRequest):Promise<IResponse>{

    const usersRepository =  getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail( email );

    if(!user) throw new AppError('Invalid email or password.',401);

    const query = `
      SELECT
      roles.name
      from users
      inner join user_roles on (users.id = user_roles.user_id)
      inner join roles on (roles.id = user_roles.role_id) where users.id=?;`

    const role  = await getManager().query(query,[user.id]);

    if(!role) throw new AppError('Internal Error.');

    const passwordConfirm = await compare(password,user.password);

    if(!passwordConfirm) throw new AppError('Invalid email or password.',401);

    const [RowDataPacket] = role;

    const { name } = RowDataPacket;

    const token = sign(
    {
      user:{
        id:(user.id).toString(),
        role:name
      }
    },authConfig.jwt.secret,
    {
      expiresIn:authConfig.jwt.expiresIn
    })


    return {user,token};
  }
}


export default CreateSessionsService;
