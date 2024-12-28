import routes from './routes.ts';
import Router from 'express-promise-router';
const router = Router();

router.use('/', routes);

export default router;
