import { RequestHandler } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  public static getAll: RequestHandler = async (_req, res) => {
    const team = new TeamService();

    const teams = await team.getAllTeams();

    res.status(200).json(teams);
  };

  public static getById: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const teamService = new TeamService();
    const team = await teamService.getById(+id);

    res.status(200).json(team);
  };
}
