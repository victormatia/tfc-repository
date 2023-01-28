import { RequestHandler } from 'express';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(private _service = new MatchService()) {
    this._service = _service;
  }

  public getAll: RequestHandler = async (_req, res) => {
    const allMatches = await this._service.getAllMatches();

    res.status(200).json(allMatches);
  };
}
