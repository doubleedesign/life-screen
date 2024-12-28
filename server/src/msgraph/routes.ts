import Router from 'express-promise-router';
const router = Router();
import pick from 'lodash/pick.js';

/**
 * Get user summary
 */
router.get('/me', async function(req, res) {
	try {
		const user = await req.app.locals.msGraph.getUserDetails();
		const profile = {
			...pick(user, ['id', 'displayName']),
			email: user.mail,
			timeZone: user.mailboxSettings.timeZone
		};

		res.status(200).json(profile);
	}
	catch(error) {
		req.app.locals.msGraph.handleError(error, res);
	}
});


/**
 * Get all the user's calendars
 */
router.get('/calendars', async function (req, res) {
	try {
		const calendars = await req.app.locals.msGraph.getCalendars(req.app.locals.microsoftClient, process.env.MS_USERNAME);

		res.status(200).json(calendars);
	}
	catch(error) {
		req.app.locals.msGraph.handleError(error, res);
	}
});


/**
 * Get upcoming events from a specific calendar by its ID
 */
router.get('/:calendarId', async function (req, res) {
	try {
		// Get upcoming events from the calendar specified by ID in the request
		const weeks = req.query.weeks ? parseInt(req.query.weeks as string) : 1; // TODO: Proper validation
		const response = await req.app.locals.msGraph.getCalendarEvents(req.params.calendarId, weeks);

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
		req.app.locals.msGraph.handleError(error, res);
	}
});


export default router;
