import { Router } from "express";
import { EventController } from "./controllers/EventController";

const router = Router();

const eventController = new EventController();

router.get("/events", eventController.list);
router.get("/events/:content", eventController.searchByContent);
router.post("/event", eventController.save);
router.put("/events/:id", eventController.update);

export default router;
