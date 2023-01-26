import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controller/LoginController';

const route = Router();

route.post('/', LoginMiddleware.validateFields, LoginController.post);
route.get('/validate', LoginMiddleware.validateToken, LoginController.get);

export default route;
