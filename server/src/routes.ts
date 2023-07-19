import { Router } from 'express';
import { EventController } from './controllers/EventController';
import { UserController } from './controllers/UserController';
import { Neo } from './controllers/NeoController';

const router = Router();

const eventController = new EventController();
const userController = new UserController();
const neo = new Neo();

router.get('/events', eventController.listEvents);
router.get('/events/:id', eventController.findEvent);
router.post('/events', eventController.saveEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

router.post('/signup', userController.signUp);
router.post('/signin', userController.singIn);

router.get('/subscribe/:id', neo.subscribe);
router.get('/subscribed/:id', neo.findSubscribeds);

export default router;
