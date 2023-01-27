import { ITeam } from '../interfaces';
import Team from '../database/models/Team';

export default class TeamService {
  constructor(private _team = Team) {
    this._team = _team;
  }

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._team.findAll() as unknown;

    return teams as ITeam[];
  }

  public async getById(id: number): Promise<ITeam> {
    const team = await this._team.findByPk(id) as unknown;

    return team as ITeam;
  }
}
