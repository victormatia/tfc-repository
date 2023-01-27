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
}
