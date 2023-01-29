import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import MatchController from '../controller/MatchController';

const route = Router();

route.get('/', new MatchController().getAll);
route.get('/?inProgress', new MatchController().getAll);
route.post('/', LoginMiddleware.validateToken, new MatchController().postMatch);
route.patch('/:id/finish', LoginMiddleware.validateToken, new MatchController().finishMatch);

export default route;
