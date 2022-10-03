'use strict'

import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User";
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import UserRolesRespository from '../../roles/infra/typeorm/repositories/UserRolesRepository';
import UserRolesRepositoryAux from '../../roles/infra/typeorm/repositories/UserRolesAuxRepository';


/**
 * @description - Dados informados pelo usuário
 * @interface
 */
interface IRequest{
  name:string,
  email:string,
  password:string,
  role:number
}

/**
 * @description - Serviço de criação de produtos
 */
class CreateUserService{

  public async execute({name,email,password,role}:IRequest):Promise<User>{

    const usersRepository =  getCustomRepository(UsersRepository);

    const userRolesRepository = getCustomRepository(UserRolesRespository);

    const userRolesAuxRepository = getCustomRepository(UserRolesRepositoryAux);

    const emailExists = await usersRepository.findByEmail( email );

    const roleExits = await userRolesRepository.findById(role);

    if(emailExists) throw new AppError('This email address already exists!');

    if(!roleExits) throw new AppError('Role does not exists');

    const encryptPassword = await hash(password,8);

    const user = usersRepository.create({
      name,
      email,
      password:encryptPassword
    });

    await usersRepository.save(user);

    let userId = user.id;

    let roleId= roleExits.id;

    const userRole = await userRolesAuxRepository.create({
      user_id:userId,
      role_id:roleId
    });

    await userRolesAuxRepository.save(userRole);

    return user;
  }
}


export default CreateUserService;
