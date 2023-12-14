import Router from 'express-promise-router';
import graph from './graph.js';
const router = Router();
import pick from 'lodash/pick';
import { ResponseCode } from '../responses';

/**
 * Get user summary
 */
router.get('/', async function(req, res) {
	try {
		const user = await graph.getUserDetails(req.app.locals.cache.msalClient, req.session.msgraph.userId);
		res.status(200).json(pick(user, ['id', 'displayName', 'email']));
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
		const calendars = await graph.getCalendars(req.app.locals.cache.msalClient, req.session.msgraph.userId);

		res.status(200).send(calendars);
	}
	catch(error) {
		res.status(ResponseCode[error.name]).json(error.message);
	}
});


/**
 * Get upcoming events from a specific calendar by its ID
 */
router.get('/:calendarId', async function (req, res) {

	try {
		// Get upcoming events from the calendar specified by ID in the request
		const response = await graph.getCalendarEvents(req.app.locals.cache.msalClient, req.session.msgraph.userId, req.params.calendarId, req.query.weeks);

		// Compile events data into the desired response format
		// Note: To retrieve more fields, edit the getCalendarEvents function
		const events = response.value.map((event) => {

			return {
				what: event.subject,
				when: event.isAllDay ? { start: event.start } : { start: event.start, end: event.end },
				where: event.location,
				type: event.type,
				categories: event.categories,
				calendarId: req.params.calendarId,
				seriesMasterId: event.seriesMasterId || ''
			};
		});

		res.status(200).send(events);
	}
	catch(error) {
		res.status(ResponseCode[error.name]).json(error.message);
	}

});


export default router;
