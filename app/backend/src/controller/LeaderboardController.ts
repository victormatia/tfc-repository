import { RequestHandler } from 'express';
import LeaderBoardService from '../service/LeaderboardService';

export default class LeaderBoardController {
  constructor(
    private _service = new LeaderBoardService(),
  ) { this._service = _service; }

  public getHome: RequestHandler = async (_req, res) => {
    const hankedTeams = await this._service.hankHomeTeams();

    res.status(200).json(hankedTeams);
  };

  public getAway: RequestHandler = async (_req, res) => {
    const hankedTeams = await this._service.hankAwayTeams();

    res.status(200).json(hankedTeams);
  };

  public get: RequestHandler = async (_req, res) => {
    const hankedTeams = await this._service.hankTeams();

    res.status(200).json(hankedTeams);
  };
}
