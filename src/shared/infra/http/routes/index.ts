import { Router } from "express";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import userRolesRouter from "@modules/roles/infra/http/routes/roles.routes";

const routes = Router();

routes.use('/sessions',sessionsRouter);
routes.use('/users',usersRouter);
routes.use('/roles',userRolesRouter);



export default routes;
