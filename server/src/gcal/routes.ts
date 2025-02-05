import Router from 'express-promise-router';
import { ResponseCode } from '../responses.ts';
import { calendar } from 'googleapis/build/src/apis/calendar';
import chalk from 'chalk';
const router = Router();
import pick from 'lodash/pick.js';

/**
 * Get user summary
 */
router.get('/me', async function(req, res) {
	try {
		const user = req.session.gcal;
		res.status(200).json(pick(user, ['id', 'displayName', 'email', 'timeZone']));
	}
	catch(error) {
		res.status(ResponseCode[error.name]).json(`${error.message}. Please try logging in again.`);
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
