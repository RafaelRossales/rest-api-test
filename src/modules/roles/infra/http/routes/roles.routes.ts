import { celebrate, Joi, Segments } from "celebrate"; // Validação dos campos
import { Router } from "express";
import UserRolesController from "../controllers/UserRolesController";

const userRolesRouter = Router();
const userRolesController = new UserRolesController;

userRolesRouter.get('/',userRolesController.index);

userRolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]:{
      name:Joi.string().required()
    }
  }),
  userRolesController.create
)

export default userRolesRouter;
