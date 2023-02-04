import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderboardController';

const route = Router();

route.get('/', new LeaderBoardController().get);
route.get('/home', new LeaderBoardController().getHome);
route.get('/away', new LeaderBoardController().getAway);

export default route;
