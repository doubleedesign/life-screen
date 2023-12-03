import Router from 'express-promise-router';
import graph from './graph.js';
const router = Router();


/**
 * Get user summary
 */
router.get('/', async function(req, res) {
	const id = Object.keys(req.app.locals.cache.users)[0]; // a bit hacky? Assumes one user; TODO: Can I log in multiple?
	if(id) {
		const user = await graph.getUserDetails(req.app.locals.cache.msalClient, id);
		// console.log(req.app.locals.cache.msalClient.getTokenCache());
		res.status(200).json(user);
	}
	else {
		res.status(404).json('User not found or not authenticated');
	}
});


/**
 * Get all the user's calendars
 */
router.get('/calendars', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	const calendars = await graph.getCalendars(req.app.locals.cache.msalClient, userId);

	res.status(200).send(calendars);

});


/**
 * Get upcoming events from a specific calendar by its ID
 */
router.get('/:calendarId', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	// Get upcoming events from the calendar specified by ID in the request
	const response = await graph.getCalendarEvents(req.app.locals.cache.msalClient, userId, req.params.calendarId, req.query.weeks);

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

});

export default router;
