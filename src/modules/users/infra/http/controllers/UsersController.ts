import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import ListUserService from "../../../services/ListUserService";

export default class UsersController{

  /**
   *
   * @param request
   * @param response
   * @returns User
   */
  public async index(request:Request,response:Response):Promise<Response>{

    const lisUsers = new ListUserService();

    console.log(request)

    const users = await lisUsers.execute();

    return response.json(users);
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async create(request:Request,response:Response):Promise<Response>{
    const { name, email, password, role} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      role
    });

    return response.json(user);
  }
}
