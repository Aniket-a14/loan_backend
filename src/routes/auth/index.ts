import { Router } from 'express';
import { register } from './register';
import { login } from './login';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
