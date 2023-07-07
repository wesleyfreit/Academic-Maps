import { Router } from "express";
import { EventController } from "./controllers/EventController";
import { UserController } from "./controllers/UserController";

const router = Router();

const eventController = new EventController();
const userController = new UserController();

router.get("/events", eventController.listEvents);
router.get("/events/:id", eventController.findEvent);
router.post("/events", eventController.saveEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

router.post("/signup", userController.signUp);
router.post("/signin", userController.singIn);

export default router;
