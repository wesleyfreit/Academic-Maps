import { Router } from "express";
import { EventController } from "./controllers/EventController";

const router = Router();

const eventController = new EventController();

router.get("/events", eventController.listEvents);
router.get("/events/:content", eventController.searchByContent);
router.post("/event", eventController.saveEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

export default router;
