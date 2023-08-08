import { Router } from 'express';
import { EventController } from './controllers/EventController';
import { UserController } from './controllers/UserController';
import { Neo } from './controllers/NeoController';
import userAuth from './middlewares/userAuth';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const router = Router();
const eventController = new EventController();
const userController = new UserController();
const neo = new Neo();

router.get('/', (req, res) => res.redirect('/events'));

router.get('/events', eventController.listEvents);
router.get('/events/:id', userAuth, eventController.findEvent);
router.post('/events', userAuth, eventController.saveEvent);
router.put('/events/:id', userAuth, eventController.updateEvent);
router.delete('/events/:id', userAuth, eventController.deleteEvent);

router.post('/signup', userController.signUp);
router.post('/signin', userController.singIn);
router.get('/user', userAuth, userController.getUser);

router.get('/subscribe/:id', userAuth, neo.subscribe);
router.get('/subscribed/:id', userAuth, neo.findSubscribeds);

export default router;
