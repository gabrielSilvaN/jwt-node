import { Router } from 'express';
import jwt from 'jsonwebtoken';

import verifyJWT from './middlewares/verifyJWT';

import authConfig from './config/auth';

const routes = Router();

routes.get('/users', verifyJWT, (request, response) => {

  // exibe o id e nome do usuário logado
  console.log(request.user)

  const users = [
    { nome: 'Manon Woodcock' },
    { nome: 'Arwel Roberson' },
    { nome: 'Saanvi Dalby' },
    { nome: 'Abid Hogan' },
    { nome: 'Izzy Alcock' }
  ]

  return response.json(users);
});

routes.post('/auth', (request, response) => {

  const { user, password } = request.body;

  if (user === 'gabriel' && password === '123') {

    const id = 1;

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ id, user }, secret , {
      expiresIn
    });

    return response.json({ auth: true, token});

  }

  return response.send('erro ao autenticar usuário...');
})

export default routes;
