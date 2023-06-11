import { Request, Response } from 'express';
import Event from '../models/Event';
import Redis from '../../database/redis';

type iEvent = {
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
  point: {
    type: String;
    coordinates: [number, number];
  };
};

export class EventController {
  public async saveEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
      try {
        await Event.create(body);
        return res.sendStatus(201);
      } catch (error) {
        return res.sendStatus(400);
      }
    } else return res.sendStatus(400);
  }

  public async listEvents(req: Request, res: Response) {
    const { value } = req.query;
    try {
      if (value) {
        const redisConsult = await Redis.get(`search-${value}`);
        if (redisConsult) return res.json(JSON.parse(redisConsult));
        const events = await Event.find(
          { $text: { $search: `%${value}%` } },
          { _id: true, __v: false },
        );
        if (events.length > 0) {
          await Redis.set(`search-${value}`, JSON.stringify(events), { EX: 3600 });
          return res.json(events);
        } else return res.sendStatus(204);
      }
      const redisConsult = await Redis.get('event-items');
      if (redisConsult) return res.json(JSON.parse(redisConsult));
      else {
        const events = await Event.find({}, { _id: true, __v: false }).sort({
          startDate: -1,
        });
        if (events.length > 0) {
          await Redis.set(`event-items`, JSON.stringify(events), { EX: 3600 });
          return res.json(events);
        }
        else return res.sendStatus(204);
      }
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  public async findEvent(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const redisConsult = await Redis.get(`id-${id}`);
      if (redisConsult) return res.json(JSON.parse(redisConsult));
      const event = await Event.findById(id);
      if (event) {
        await Redis.set(`id-${id}`, JSON.stringify(event), { EX: 3600 });
        return res.json(event);
      }
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  public async updateEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    const id = req.params.id;
    if (body.title != '' && body.point.coordinates[1] && body.point.coordinates[0]) {
      try {
        const event = await Event.findById(id);
        if (event) {
          const result = await Event.updateOne({ _id: id }, { ...body });
          if (result) {
            await Redis.del(id);
            return res.sendStatus(200);
          } else return res.sendStatus(400);
        } else return res.sendStatus(204);
      } catch (error) {
        return res.sendStatus(404);
      }
    } else return res.sendStatus(400);
  }

  public async deleteEvent(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const event = await Event.findById(id);
      if (event) {
        const result = await Event.deleteOne({ _id: id });
        if (result) {
          await Redis.del(id);
          return res.sendStatus(200);
        } else return res.sendStatus(400);
      } else return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}
