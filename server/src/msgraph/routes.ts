import Router from 'express-promise-router';
import graph from './graph.js';
const router = Router();
import pick from 'lodash/pick';
import { CustomResponse, ResponseCode } from '../responses';

/**
 * Get user summary
 */
router.get('/me', async function(req, res) {
	try {
		if(!req?.query?.userId) {
			throw new CustomResponse.Unauthorized('User ID is missing from the request');
		}
		if(req?.query?.userId !== req?.session?.msgraph?.userId) {
			throw new CustomResponse.Unauthorized('User ID does not match the session');
		}
		if(!req?.session?.msgraph?.userId) {
			throw new CustomResponse.Unauthorized('User ID is missing from the session');
		}
		const user = await graph.getUserDetails(req.app.locals.cache.msalClient, req.session.msgraph?.userId);
		const profile = {
			...pick(user, ['id', 'displayName']),
			email: user.mail,
			timeZone: user.mailboxSettings.timeZone
		};

		res.status(200).json(profile);
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

		res.status(200).json(calendars);
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

		res.status(200).json(events);
	}
	catch(error) {
		res.status(ResponseCode[error.name]).json(error.message);
	}

});


export default router;
