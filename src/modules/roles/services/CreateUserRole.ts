'use strict'
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import UserRoles from "../infra/typeorm/entities/UsersRoles";
import UserRolesRespository from "../infra/typeorm/repositories/UserRolesRepository";


/**
 * @description
 * @interface
 */
interface IRequest{
  name:string,
}

class CreateUserRole{

  async execute({name}:IRequest):Promise<UserRoles>{

    const userRolesRepository = getCustomRepository(UserRolesRespository);

    const roleExists = await userRolesRepository.findByName(name);

    if(roleExists) throw new AppError('This role already exists!');

    const role = userRolesRepository.create({
      name
    });

    await  userRolesRepository.save(role);

    return role;
  }
}


export default CreateUserRole;
