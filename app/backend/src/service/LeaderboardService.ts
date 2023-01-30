import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IHanked, IMatch, ITeam } from '../interfaces';

const returnStatusTeam = (goalsTeam1: number, goalsTeam2: number) => {
  if (goalsTeam1 > goalsTeam2) return 1;
  if (goalsTeam1 < goalsTeam2) return -1;
  return 0;
};

const calculateTotalPoints = (teamName: string, matches: IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        const result = returnStatusTeam(homeTeamGoals, awayTeamGoals);
        console.log(teamName, result);
        if (result === 1) totalPoints += 3;
        else if (result === 0) totalPoints += 1;
        break;
      }
      default: break;
    }
  });

  return totalPoints;
};

const calculateTotalGames = (teamName: string, matches: IMatch[]) => {
  let totalGames = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam } = match;
    switch (teamName) {
      case homeTeam?.teamName: totalGames += 1; break;
      default: break;
    }
  });

  return totalGames;
};

const calulateVictories = (teamName: string, matches: IMatch[]) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        const result = returnStatusTeam(homeTeamGoals, awayTeamGoals);
        if (result === 1) victories += 1;
        else if (result === 0) draws += 1;
        else losses += 1;
        break;
      }
      default: break;
    }
  });

  return { victories, draws, losses };
};

const calculateGoalsStats = (teamName: string, matches: IMatch[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals;
        break;
      }
      default: break;
    }
  });

  goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const calculateEfficiency = (points: number, games: number) => {
  const efficiency = ((points / (games * 3)) * 100);
  return efficiency.toFixed(2);
};

const createHankedTeamsArr = (teams: ITeam[], matches: IMatch[]) => (
  teams.reduce((acc: IHanked[], curr: ITeam) => {
    const teamResultsMatches = calulateVictories(curr.teamName, matches);
    const goals = calculateGoalsStats(curr.teamName, matches);
    const obj: IHanked = {
      name: curr.teamName,
      totalPoints: calculateTotalPoints(curr.teamName, matches),
      totalGames: calculateTotalGames(curr.teamName, matches),
      totalVictories: teamResultsMatches.victories,
      totalDraws: teamResultsMatches.draws,
      totalLosses: teamResultsMatches.losses,
      goalsFavor: goals.goalsFavor,
      goalsOwn: goals.goalsOwn,
      goalsBalance: goals.goalsBalance,
      efficiency: 0,
    };
    obj.efficiency = +calculateEfficiency(obj.totalPoints, obj.totalGames);
    acc.push(obj); return acc;
  }, [])
);

export default class LeaderBoardService {
  constructor(private _match = Match, private _team = Team) {
    this._match = _match;
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
      .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
  }
}
