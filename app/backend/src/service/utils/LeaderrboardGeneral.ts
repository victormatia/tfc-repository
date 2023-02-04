import { IMatch, ITeam, IHanked } from '../../interfaces';

const returnStatusTeam = (goalsTeam1: number, goalsTeam2: number) => {
  if (goalsTeam1 > goalsTeam2) return 1;
  if (goalsTeam1 < goalsTeam2) return -1;
  return 0;
};

const calculateTotalPoints = (teamName: string, matches: IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        const result = returnStatusTeam(homeTeamGoals, awayTeamGoals);
        if (result === 1) totalPoints += 3;
        else if (result === 0) totalPoints += 1; break;
      }
      case awayTeam?.teamName: {
        const result = returnStatusTeam(awayTeamGoals, homeTeamGoals);
        if (result === 1) totalPoints += 3;
        else if (result === 0) totalPoints += 1; break;
      }
      default: break;
    }
  });

  return totalPoints;
};

const calculateTotalGames = (teamName: string, matches: IMatch[]) => {
  let totalGames = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, awayTeam } = match;
    switch (teamName) {
      case homeTeam?.teamName: totalGames += 1; break;
      case awayTeam?.teamName: totalGames += 1; break;
      default: break;
    }
  });

  return totalGames;
};

const calulateVictories = (teamName: string, matches: IMatch[]) => {
  let victories = 0; let draws = 0; let losses = 0;
  matches.forEach((match: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        const result = returnStatusTeam(homeTeamGoals, awayTeamGoals);
        if (result === 1) victories += 1;
        else if (result === 0) draws += 1;
        else losses += 1; break;
      }
      case awayTeam?.teamName: {
        const result = returnStatusTeam(awayTeamGoals, homeTeamGoals);
        if (result === 1) victories += 1;
        else if (result === 0) draws += 1;
        else losses += 1; break;
      } default: break;
    }
  }); return { victories, draws, losses };
};

const calculateGoalsStats = (teamName: string, matches: IMatch[]) => {
  let goalsOwn = 0; let goalsFavor = 0; let goalsBalance = 0;

  matches.forEach((match: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    switch (teamName) {
      case homeTeam?.teamName: {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals; break;
      }
      case awayTeam?.teamName: {
        goalsFavor += awayTeamGoals;
        goalsOwn += homeTeamGoals; break;
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

export default createHankedTeamsArr;
