import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyJWT(request: Request, response: Response, next: NextFunction) {

  var token = request.headers['x-access-token'];

  if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'f2455e6df61f8a175c33f144dca0f7ad', function (err, decoded) {
    if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    request.id = decoded.id;
    next();
  });
}
