export interface IUser extends ILogin {
  id: number,
  username: string
  role: string,
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IDecoded {
  userInfos: IUser,
  iat?: number,
  exp?: number,
}

export interface ITeam {
  id: number,
  teamName: string,
}

export interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeam?: {
    teamName: string,
  }
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeam?: {
    teamName: string,
  }
  awayTeamGoals: number,
  inProgress: boolean;
}

export interface IError {
  code: number,
  message: string,
}

export interface IHanked {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
