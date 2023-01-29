import jwt = require('jsonwebtoken');
import { IDecoded, IError, IUser } from '../interfaces';

export default class JWT {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET as string;
  }

  public createToken = (userInfos: IUser): string => {
    const token = jwt.sign({ userInfos }, this._secret, { expiresIn: '1d', algorithm: 'HS256' });
    return token;
  };

  public verifyToken = (token: string): { decoded?: IDecoded, error?: IError } => {
    try {
      const decoded = jwt.verify(token, this._secret) as IDecoded;
      return { decoded };
    } catch (e) {
      return { error: {
        code: 401,
        message: 'Token must be a valid token',
      } };
    }
  };
}
