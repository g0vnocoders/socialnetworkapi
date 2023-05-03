import { Response, Request, Router } from 'express';
import AuthController from '../controllers/AuthController';

let router = Router();

/* GET 200 OK */
router.get('/', async function(req: Request, res: Response) {
    const controller = new AuthController();
    const response = await controller.authorize(req.body);
    return res.send(response);
});

export default router;