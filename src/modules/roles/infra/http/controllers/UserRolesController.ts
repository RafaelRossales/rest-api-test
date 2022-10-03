import { Request, Response } from "express";
import CreateUserRole from "@modules/roles/services/CreateUserRole";
import ListUserRoles from "@modules/roles/services/ListUserRoles";

class UserRolesController{


  async index(request:Request,response:Response):Promise<Response>{

    const listOfRoles = new ListUserRoles();

    const roles = await listOfRoles.execute();

    return response.json(roles);

  }

  async create(request:Request,response:Response):Promise<Response>{

    const { name } = request.body;

    const createRole = new CreateUserRole();

    const role = await createRole.execute({
      name
    });

   return response.json(role);
  }
}


export default UserRolesController;
