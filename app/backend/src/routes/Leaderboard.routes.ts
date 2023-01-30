import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderboardController';

const route = Router();

// route.get('/', new LeaderBoardController().get);
route.get('/home', new LeaderBoardController().get);
// route.get('/away', new LeaderBoardController().get);

export default route;
