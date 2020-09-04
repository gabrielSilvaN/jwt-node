import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  id: number;
}
export default function verifyJWT(request: Request, response: Response, next: NextFunction) {

  var token = request.headers['x-access-token'];

  if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { id } = decoded as TokenPayload;

    request.user = {
      id
    }

    return next();

  } catch {
    console.log('erro');
    return response.json({auth: false, message: 'Token is invalid or expired'});
  }

}
