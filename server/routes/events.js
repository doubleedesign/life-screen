import Router from 'express-promise-router';
import graph from '../graph.js';
const router = Router();

router.get('/:calendarId', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	// Initialise response object to add things into
	let response = {};

	// Get events from the calendar specified by ID in the request
	// GET https://graph.microsoft.com/v1.0/me/calendars/{id}/events
	// https://learn.microsoft.com/en-us/graph/outlook-get-shared-events-calendars
	const events = await graph.getCalendarEvents(req.app.locals.cache.msalClient, userId, req.params.calendarId);

	// TODO: Compile events data into the desired response format

	res.status(200).send(response);

});

export default router;
