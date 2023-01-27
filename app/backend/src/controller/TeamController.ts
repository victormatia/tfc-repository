import { RequestHandler } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  public static getAll: RequestHandler = async (_req, res) => {
    const team = new TeamService();

    const teams = await team.getAllTeams();

    res.status(200).json(teams);
  };
}
