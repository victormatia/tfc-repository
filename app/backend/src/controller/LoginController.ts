import { Request, RequestHandler, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  public static post: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const login = new LoginService();
    const { error, token } = await login.validateLogin({ email, password });

    if (error) return res.status(401).json({ message: error.message });

    res.status(200).json({ token });
  };
}
