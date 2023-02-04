import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IHanked, IMatch, ITeam } from '../interfaces';
import createHankedHomeTeamsArr from './utils/LeaderboardHome';
import createHankedAwayTeamsArr from './utils/LeaderboardAway';
import createHankedTeamsArr from './utils/LeaderrboardGeneral';

const sortArr = (a: IHanked, b: IHanked) => b.totalPoints - a.totalPoints
|| b.totalVictories - a.totalVictories
|| b.goalsBalance - a.goalsBalance
|| b.goalsFavor - a.goalsFavor
|| b.goalsOwn - a.goalsOwn;

export default class LeaderBoardService {
  constructor(private _match = Match, private _team = Team) {
    this._match = _match;
  }

  public async hankHomeTeams(): Promise<IHanked[]> {
    const finishedMtaches = await this._match.findAll({ where: { inProgress: false },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown;

    const teams = await this._team.findAll() as unknown;

    const arrHankedTeams = createHankedHomeTeamsArr(teams as ITeam[], finishedMtaches as IMatch[]);

    return arrHankedTeams
      .sort(sortArr);
  }

  public async hankAwayTeams(): Promise<IHanked[]> {
    const finishedMtaches = await this._match.findAll({ where: { inProgress: false },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown;

    const teams = await this._team.findAll() as unknown;

    const arrHankedTeams = createHankedAwayTeamsArr(teams as ITeam[], finishedMtaches as IMatch[]);

    return arrHankedTeams
      .sort(sortArr);
  }

  public async hankTeams(): Promise<IHanked[]> {
    const finishedMtaches = await this._match.findAll({ where: { inProgress: false },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown;

    const teams = await this._team.findAll() as unknown;

    const arrHankedTeams = createHankedTeamsArr(teams as ITeam[], finishedMtaches as IMatch[]);

    return arrHankedTeams
      .sort(sortArr);
  }
}
