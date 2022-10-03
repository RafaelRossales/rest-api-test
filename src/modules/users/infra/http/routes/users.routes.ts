import { celebrate, Joi, Segments } from "celebrate"; // Validação dos campos
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from '@shared/infra/http/middleware/isAuthenticated'
import verifyRoles from '@shared/infra/http/middleware/verifyRoles'


const usersRouter = Router();
const usersController = new UsersController();


usersRouter.get('/',isAuthenticated,verifyRoles('root'),usersController.index);

usersRouter.get('/',usersController.index);

usersRouter.post(
  '/',
    celebrate({
      [Segments.BODY]:{
        name:Joi.string().min(5).required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        role:Joi.string().required()
      }
    }),
    usersController.create
  );


  export default usersRouter;
