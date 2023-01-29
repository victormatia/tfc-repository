import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IError, IMatch } from '../interfaces';

export default class MatchService {
  constructor(
    private _match = Match,
    private _team = Team,
  ) {
    this._match = _match;
    this._team = _team;
  }

  public async getAllMatches(): Promise<IMatch[]> {
    const matches = await this._match.findAll({
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown;

    return matches as IMatch[];
  }

  public async getAllMatchesByProgress(progress: boolean): Promise<IMatch[]> {
    const matches = await this._match.findAll({ where: { inProgress: progress },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown;

    return matches as IMatch[];
  }

  public async postMatch(match: IMatch): Promise<{ result?: IMatch, error?: IError }> {
    const { homeTeamId, awayTeamId } = match;
    const areValidTeams = await this.validateTeams([homeTeamId, awayTeamId]);

    if (!areValidTeams) {
      return { error: {
        code: 404,
        message: 'There is no team with such id!',
      } };
    }

    if (homeTeamId === awayTeamId) {
      return { error: {
        code: 422,
        message: 'It is not possible to create a match with two equal teams',
      } };
    }

    const addedMatch = await this._match.create({ ...match, inProgress: true }) as unknown;

    return { result: addedMatch as IMatch };
  }

  public async finishMatch(id: number) {
    const updateProgress = await this._match.update({ inProgress: false }, { where: { id } });

    if (updateProgress[0]) {
      return { message: 'Finished' };
    }

    return { message: 'the match already was finished' };
  }

  public async updateGoals(
    id: number,
    goals: {
      homeTeamGoals: number,
      awayTeamGoals: number,
    },
  ) {
    const updatedMatch = await this._match.update(goals, { where: { id } });

    return { result: updatedMatch };
  }

  private async validateTeams(teamsId: number[]) {
    const teams = await Promise.all(teamsId.map(async (id) => {
      const team = await this._team.findByPk(id);
      return team;
    }));

    const areValidTeams = teams.every((team) => team);

    return areValidTeams;
  }
}
