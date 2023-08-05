import Event from '../models/Event';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import driver from '../../database/neo4j';

interface result {
  _fields: Array<{
    low: number;
    _fields: [string];
  }>;
}

interface events {
  _id: string | undefined;
  title: string | undefined;
  quantity: number;
}
export class Neo {
  public async saveUser(id: number) {
    const session = driver.session();
    try {
      const result: any = await session.run('MERGE (:User{id:$id})', { id });
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
      const result: any = await session.run('MERGE (:Event{id:$id})', { id });
      console.log(result.summary.counters._stats.nodesCreated);
    } catch (error) {
      console.log(error);
    } finally {
      await session.close();
    }
  }

  public async findEvent(id: number) {
    const session = driver.session();
    try {
      const result: any = await session.run('MATCH (n:Event{id:$id}) RETURN n', { id });
      return result.records.length;
    } catch (error) {
      console.log(error);
    } finally {
      await session.close();
    }
  }

  public async findUser(id: number) {
    const session = driver.session();
    try {
      const result: any = await session.run('MATCH (n:User{id:$id}) RETURN n', { id });
      return result.records.length;
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
      const authorization = req.get('authorization') as string;

      const [, token] = authorization.split(' ');
      const user = (await jwt.decode(token, process.env.JWTSECRET as any)) as {
        id: string;
        username: string;
      } | null;
      if (user) {
        const result: any = await session.run(
          'MATCH (u:User{id:$idUser}) OPTIONAL MATCH (e:Event{id:$idEvent}) MERGE (u)-[:Subscribed]->(e)',
          {
            idUser: user.id,
            idEvent: id,
          },
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
        'MATCH (e1:Event)<-[:Subscribed]-(u:User)-[s:Subscribed]->(e2:Event) WHERE e1.id = $idEvent RETURN e2.id as events, count(e2) as quantity ORDER BY quantity desc LIMIT 3',
        {
          idEvent: id,
        },
      );
      const events: events[] = [];
      await Promise.all(
        result.records.map(async (e: result) => {
          const event = await Event.findById(e._fields[0]);
          events.push({
            _id: event?.id,
            title: event?.title,
            quantity: e._fields[1].low,
          });
        }),
      );
      console.log(events);
      return res.json(events);
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
