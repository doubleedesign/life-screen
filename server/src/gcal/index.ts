import auth from './auth.js';
import routes from './routes.ts';
import Router from 'express-promise-router';
const router = Router();

router.use('/auth', auth);
router.use('/', routes);

export default router;
