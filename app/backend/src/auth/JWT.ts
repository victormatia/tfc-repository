import jwt = require('jsonwebtoken');
import { IDecoded, IUser } from '../interfaces';

export default class JWT {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET as string;
  }

  public createToken = (userInfos: IUser): string => {
    const token = jwt.sign({ userInfos }, this._secret, { expiresIn: '1d', algorithm: 'HS256' });
    return token;
  };

  public verifyToken = (token: string): IDecoded => {
    const decoded = jwt.verify(token, this._secret);
    return decoded as IDecoded;
  };
}
