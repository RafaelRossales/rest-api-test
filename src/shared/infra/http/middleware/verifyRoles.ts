import { NextFunction, Request,Response }  from 'express';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

interface IUser{
  id:string;
  role:string;
}

interface ITokenPayload{
  iat:number,
  exp:number,
  sub:string,
  user:IUser
}

export default function verifyRoles(role:string){
  return (
    request:Request,
    response:Response,
    next:NextFunction
  ) =>{
    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('JWT Token is missing');
    }

  const [,token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token,authConfig.jwt.secret);

    const { user } = decodedToken as ITokenPayload;

    const userRole = user.role;

    if(userRole!=role) throw new AppError('Access denied.');

      return next();

  } catch (error) {
      throw new AppError('Invalid JWtT Token.');
  }

  }
}
