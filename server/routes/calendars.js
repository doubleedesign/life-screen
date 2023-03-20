import Router from 'express-promise-router';
import graph from '../graph.js';
const router = Router();

router.get('/', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	const calendars = await graph.getCalendars(req.app.locals.cache.msalClient, userId);

	res.status(200).send(calendars);

});

export default router;
