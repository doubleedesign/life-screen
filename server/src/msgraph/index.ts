import auth from './auth';
import routes from './routes';
import Router from 'express-promise-router';
const router = Router();

router.use('/auth', auth);
router.use('/', routes);

export default router;
