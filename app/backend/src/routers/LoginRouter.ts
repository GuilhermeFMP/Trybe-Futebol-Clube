import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middlewares/validateLogin';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';

const loginRouter = Router();

loginRouter.post(
  '/',
  validateLogin,
  validateFieldsLogin,
  (req, res) => LoginController.login(req, res),
);

export default loginRouter;
