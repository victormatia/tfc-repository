import { RequestHandler } from 'express';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(private _service = new MatchService()) {
    this._service = _service;
  }

  public getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    let allMatches = [];

    if (inProgress) {
      allMatches = await this._service.getAllMatchesByProgress(inProgress === 'true');
    } else {
      allMatches = await this._service.getAllMatches();
    }

    res.status(200).json(allMatches);
  };
}
