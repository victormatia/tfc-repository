import { RequestHandler } from 'express';
import JWT from '../auth/JWT';

export default class LoginMiddleware {
  public static validateFields: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  };

  public static validateToken: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
      const jwt = new JWT();
      const { userInfos } = jwt.verifyToken(authorization);

      req.body.user = userInfos;

      return next();
    }

    res.status(400).json({ message: 'authorization field not found' });
  };
}
