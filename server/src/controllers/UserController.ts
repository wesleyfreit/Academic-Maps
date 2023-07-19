import { Request, Response } from 'express';
import User from '../models/User';
import { Neo } from './NeoController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const neo = new Neo();

type iUser = {
  username: string;
  password: string;
};

export class UserController {
  public async signUp(req: Request, res: Response) {
    const { username, password } = <iUser>req.body;
    try {
      const usernameCheck = await User.findOne({ username }).collation({
        locale: 'pt',
        strength: 2,
      });
      if (usernameCheck) {
        return res.sendStatus(409);
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = { username, password: hash };
      const user = await User.create(newUser);
      await neo.saveUser(user.id);
      return res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  public async singIn(req: Request, res: Response) {
    const { username, password } = <iUser>req.body;
    const jwtSecret = process.env.JWTSECRET as string;
    try {
      if (username) {
        const user = await User.findOne({ username }).collation({
          locale: 'pt',
          strength: 2,
        });
        if (user) {
          const check = await bcrypt.compare(password, user.password as string);
          if (check) {
            const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
              expiresIn: 3600,
            });
            const tokenBearer = `Bearer ${token}`;
            return res.json({ token: tokenBearer });
          } else {
            return res.sendStatus(401);
          }
        } else {
          return res.sendStatus(404);
        }
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
