import { AuthController } from './../controllers/AuthController';
import { UserController } from '../controllers/UserController';
import { PostsController } from '../controllers/PostsController';
import { Response, Request, Router } from 'express';

let router = Router();

/* GET 200 OK */
router.get('/', async function(req: Request, res: Response) {
    //redirect to swagger
    res.redirect('/swagger');
});

export default router;