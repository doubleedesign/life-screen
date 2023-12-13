import Router from 'express-promise-router';
import { ResponseCode } from '../responses';
import { calendar } from 'googleapis/build/src/apis/calendar';
import chalk from 'chalk';
const router = Router();


/**
 * Get user summary
 */
router.get('/', async function(req, res) {
	try {
		res.status(ResponseCode.NotImplemented).json('Feature not yet implemented');
	}
	catch(error) {
		res.redirect('/gcal/auth/login');
	}
});


/**
 * Get all the user's calendars
 */
router.get('/calendars', async function (req, res) {

	try {
		const gcal = calendar({ version: 'v3', auth: req.app.locals.cache.googleClient });
		const calendarList = await gcal.calendarList.list();

		res.status(ResponseCode.SuccessFound).json(calendarList);
	}
	catch(error) {
		console.log(chalk.red(error));
		res.status(ResponseCode[error.name]).json(error.message);
	}
});


/**
 * Get upcoming events from a specific calendar by its ID
 */
router.get('/:calendarId', async function (req, res) {
	res.status(ResponseCode.NotImplemented).json('Feature not yet implemented');
});


export default router;
