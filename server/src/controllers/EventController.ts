import { Request, Response } from "express";
import Event from "../models/Event";

type iEvent = {
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
  lng: number;
  lat: number;
};

export class EventController {
  public async saveEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    if (body.title != "" && body.lat != null && body.lng != null) {
      return res.status(400).json({ status: "invalid arguments" });
    } else {
      Event.create(body)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((err) => res.status(400).send(err));
    }
  }

  public async listEvents(req: Request, res: Response) {
    Event.find({}, { _id: true, __v: false })
      .sort({ startDate: -1 })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.status(400).send(err));
  }

  public async searchByContent(req: Request, res: Response) {
    Event.find(
      { $text: { $search: req.params.content } },
      { _id: true, __v: false }
    )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.status(400).send(err));
  }

  public async updateEvent(req: Request, res: Response) {
    const body = <iEvent>req.body;
    if (body.title != "" && body.lat != null && body.lng != null) {
      return res.status(400).json({ status: "invalid arguments" });
    } else {
      await Event.findById(req.params.id)
        .then((result) => {
          if (result) {
            result.set(req.body);
            result.save();
            res.status(200).send("Updated");
          }
        })
        .catch((e) => res.status(404).send("Event not found"));
    }
  }

  public async deleteEvent(req: Request, res: Response) {
    Event.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount > 0) res.status(200).send("Deleted");
        else res.status(404).send("Event not found");
      })
      .catch((err) => res.status(400).send(err));
  }
}
