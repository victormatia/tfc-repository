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

  public postMatch: RequestHandler = async (req, res) => {
    const { body } = req;

    const { result, error } = await this._service.postMatch(body);

    if (error) return res.status(error.code).json({ message: error.message });

    res.status(201).json(result);
  };

  public finishMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { message } = await this._service.finishMatch(+id);
    return res.status(200).json({ message });
  };
}
