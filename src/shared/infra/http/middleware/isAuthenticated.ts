import { NextFunction, Request,Response }  from 'express';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

interface IUser{
  id:string
}

/**
 *@interface
 */
interface ITokenPayload{
    iat:number,
    exp:number,
    sub:string,
    user:IUser
}

export default function isAuthenticated(
    request:Request,
    response:Response,
    next:NextFunction
):void{
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('JWT Token is missing')
    }

    const [,token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token,authConfig.jwt.secret);

        const { user } = decodedToken as ITokenPayload;

        request.user = {
            id:user.id
        }

        return next();
    } catch (error) {

        throw new AppError('Invalid JWtT Token.');
    }
}



