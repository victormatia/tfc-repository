import { ILogin, IUser } from '../interfaces';
import User from '../database/models/User';
import JWT from '../auth/JWT';

export default class LoginService {
  constructor(private _user = User) {}

  public async validateLogin(userInfos: ILogin) {
    const user = await this.getUser(userInfos.email);

    if (!user) {
      return { error: {
        message: 'Incorrect email or password',
      } };
    }

    const jwt = new JWT();
    const token = jwt.createToken(user);
    return { token };
  }

  private async getUser(email: string): Promise<IUser> {
    const user = await this._user.findOne({ where: { email } }) as unknown;

    return user as IUser;
  }
}
