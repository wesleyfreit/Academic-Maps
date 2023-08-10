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

  public singIn = async (req: Request, res: Response) => {
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
            const token = jwt.sign({ id: user.id }, jwtSecret, {
              expiresIn: 3600,
            });
            await this.checkUsers(); //validar os usuários no banco neo4j
            const tokenBearer = `Bearer ${token}`;
            return res.json({ token: tokenBearer, user: { username: user.username } });
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
  };

  public async getUser(req: Request, res: Response) {
    try {
      const id = req.id;
      const user = await User.findById(id);
      if (user) {
        return res.json({ username: user.username });
      } else return res.sendStatus(404);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  public checkUsers = async () => {
    const users = await User.find({}, { _id: true, __v: false });
    if (users.length > 0) {
      users.forEach(async (user) => {
        const exists = await neo.findUser(user.id);
        if (exists != 1) {
          await neo.saveUser(user.id);
        }
      });
    }
  };
}
