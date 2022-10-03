'use strict'

import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";


/**
 * @description - Serviço de listagem de usuários
 */
class ListUserService{

  public async execute():Promise<User[]>{

    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
