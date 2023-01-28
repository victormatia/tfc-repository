import { Router } from 'express';
import MatchController from '../controller/MatchController';

const route = Router();

route.get('/', new MatchController().getAll);
route.get('/?inProgress', new MatchController().getAll);

export default route;
