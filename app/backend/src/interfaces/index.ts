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
