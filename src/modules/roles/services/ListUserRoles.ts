'use strict'
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import UserRoles from "../infra/typeorm/entities/UsersRoles";
import UserRolesRespository from "../infra/typeorm/repositories/UserRolesRepository";


class ListUserRoles{

  async execute():Promise<UserRoles[]>{

    const userRolesRepository = getCustomRepository(UserRolesRespository);

    const roles = userRolesRepository.find();

    return roles;
  }
}


export default ListUserRoles;
