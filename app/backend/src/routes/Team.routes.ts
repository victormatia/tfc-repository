import { Router } from 'express';
import TeamController from '../controller/TeamController';

const route = Router();

route.get('/', TeamController.getAll);

export default route;
