import { Router } from 'express';
import jwt from 'jsonwebtoken';

import verifyJWT from './middlewares/verifyJWT';

const routes = Router();

routes.get('/users', verifyJWT, (request, response) => {

  const users = [
    { nome: 'Gabriel Silva' },
    { nome: 'Kaio Silva' },
    { nome: 'Rege Silva' },
    { nome: 'Jean Carlos' },
    { nome: 'Isabella Paes' }
  ]

  console.log(request.id)

  return response.json(users);
});

routes.post('/auth', (request, response) => {

  const { user, password } = request.body;

  if (user === 'gabriel' && password === '123') {

    const id = 1;

    const token = jwt.sign({ id }, 'f2455e6df61f8a175c33f144dca0f7ad', {
      expiresIn: 300
    });

    return response.json({ auth: true, token});

  }

  return response.send('erro ao autenticar usuário...');
})

export default routes;
