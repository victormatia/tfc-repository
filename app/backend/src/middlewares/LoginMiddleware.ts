import { Request, Response, NextFunction, RequestHandler } from 'express';

export default class LoginMiddleware {
  public static validateFields: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  };
}
