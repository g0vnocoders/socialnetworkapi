import { AuthController } from './../controllers/AuthController';
import { Response, Request, Router } from 'express';

let router = Router();

/* GET 200 OK */
router.get('/', async function(req: Request, res: Response) {
    const controller = new AuthController();
    const response = await controller.login(req.body);
    return res.send(response);
});

export default router;