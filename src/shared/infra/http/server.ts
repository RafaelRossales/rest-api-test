import 'reflect-metadata';
import 'dotenv/config'
import express, { NextFunction, Request, response, Response } from 'express'
import 'express-async-errors'; // trata exceções de uma promessa
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination'
import routes from './routes'
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm/'


//Permite que o node acesser certificados nao autorizados
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors()); // Celebrate

//Middleware // resposavel por interceptar os erros
// app.use(
//   (
//     error:Error,
//     request:Request,
//     reponse:Response,
//     next:NextFunction
//   ) => {

//     if(Error instanceof  AppError){
//       return response.status(error.statusCode).json({
//         status:'error',
//         message:error.message
//       });
//     }

//     return response.status(500).json({
//       status:'error',
//       message:'Internal server error'
//     })
// });

app.listen(8081,() => {
  console.log('Server started on port 8081! ')
})
