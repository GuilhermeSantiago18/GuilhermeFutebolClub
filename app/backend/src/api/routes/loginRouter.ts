import { Router, Request, Response } from 'express';
import tokenMiddleware from '../middleware/tokenMiddleware';
import UserController from '../controller/loginController';
import validateUser from '../middleware/validateUser';

const userController = new UserController();

const loginRoutes = Router();

loginRoutes.post('/login', validateUser, (req: Request, res: Response) =>
  userController.login(req, res));

loginRoutes.get('/login/role', tokenMiddleware, UserController.userRole);

export default loginRoutes;
