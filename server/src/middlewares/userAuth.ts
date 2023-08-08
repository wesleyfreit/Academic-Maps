import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '') as string;
  const secret = process.env.JWTSECRET as string;

  try {
    jwt.verify(token, secret);
    const decode = jwt.decode(token) as JwtPayload;
    req.id = decode.id;
    return next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default userAuth;
