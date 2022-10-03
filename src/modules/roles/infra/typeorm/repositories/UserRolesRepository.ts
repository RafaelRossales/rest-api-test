import { EntityRepository, Repository } from "typeorm";
import UserRoles from "../entities/UsersRoles";

@EntityRepository(UserRoles)
class UserRolesRespository extends Repository<UserRoles>{

  public async findByName(name:string):Promise<UserRoles | undefined>{

    const role = await this.findOne({
      where:{
        name
      }
    });

    return role;
  }

  public async findById(id:number):Promise<UserRoles | undefined>{

    const role = await this.findOne({
      where:{
        id
      }
    });

    return role;
  }
}


export default UserRolesRespository;
