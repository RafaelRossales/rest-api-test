import { EntityRepository, Repository } from "typeorm";
import UserRolesAux from "../entities/UserRolesAux";

@EntityRepository(UserRolesAux)
class UserRolesAuxRespository extends Repository<UserRolesAux>{

  public async findByName(name:string):Promise<UserRolesAux | undefined>{

    const role = await this.findOne({
      where:{
        name
      }
    });

    return role;
  }

  public async findById(role_id:number):Promise<UserRolesAux | undefined>{

    const role = await this.findOne({
      where:{
        role_id
      }
    });

    return role;
  }

  public async findByUserId(user_id:number):Promise<UserRolesAux | undefined>{

    const role = await this.findOne({
      where:{
        user_id
      }
    });

    return role;
  }
}


export default UserRolesAuxRespository;
