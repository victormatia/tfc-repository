import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(private _match = Match) {
    this._match = _match;
  }

  public async getAllMatches() {
    const matches = await this._match.findAll({
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public async getAllMatchesByProgress(progress: boolean) {
    const matches = await this._match.findAll({ where: { inProgress: progress },
      include: [
        { model: Team, association: 'homeTeam', attributes: ['teamName'] },
        { model: Team, association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}
