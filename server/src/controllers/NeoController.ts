import neo4j from "neo4j-driver";
import User from "../models/User";
import Event from "../models/Event";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import driver from "../../database/neo4j";

export class Neo {
  public async saveUser(id: number) {
    const session = driver.session();
    try {
      const result: any = await session.run("CREATE (:User{id:$id})", { id });
      console.log(result.summary.counters._stats?.nodesCreated);
    } catch (error) {
      console.log(error);
    } finally {
      await session.close();
    }
  }

  public async saveEvent(id: number) {
    const session = driver.session();
    try {
      const result: any = await session.run("CREATE (:Event{id:$id})", { id });
      console.log(result.summary.counters._stats.nodesCreated);
    } catch (error) {
      console.log(error);
    } finally {
      await session.close();
    }
  }

  public async subscribe(req: Request, res: Response) {
    const session = driver.session();
    try {
      const id = req.params.id as string;
      const authorization = req.get("authorization") as string;

      const [, token] = authorization.split(" ");
      const user = (await jwt.decode(token, process.env.JWTSECRET as any)) as {
        id: string;
        username: string;
      } | null;
      if (user) {
        const result: any = await session.run(
          "MATCH (u:User{id:$idUser}) OPTIONAL MATCH (e:Event{id:$idEvent}) CREATE (u)-[:Subscribed]->(e)",
          {
            idUser: user.id,
            idEvent: id,
          }
        );
        console.log(result.summary.counters._stats.relationshipsCreated);
      } else return res.sendStatus(404);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    } finally {
      await session.close();
    }
  }

  public async findSubscribeds(req: Request, res: Response) {
    const id = req.params.id as string;
    const session = driver.session();
    try {
      const result: any = await session.run(
        "MATCH (e1:Event)<-[:Subscribed]-(u:User)-[s:Subscribed]->(e2:Event) WHERE e1.id = $idEvent RETURN e2.id as events, count(e2) as quantity ORDER BY quantity desc",
        {
          idEvent: id,
        }
      );
      return res.json(result.records);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    } finally {
      await session.close();
    }
  }

  public close() {
    driver.close();
  }
}
