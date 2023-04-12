import Router from 'express-promise-router';
import graph from '../graph.js';
const router = Router();

router.get('/:calendar_id', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	// Get upcoming events from the calendar specified by ID in the request
	const response = await graph.getCalendarEvents(req.app.locals.cache.msalClient, userId, req.params.calendar_id, req.query.weeks);

	// Compile events data into the desired response format
	// Note: To retrieve more fields, edit the getCalendarEvents function
	// TODO: This gets the next 3 weeks, update to get option from front-end to load more/less
	const events = response.value.map((event) => {

		console.log(events);

		return {
			what: event.subject,
			when: event.isAllDay ? { start: event.start } : { start: event.start, end: event.end },
			where: event.location,
			type: event.type,
			categories: event.categories,
			calendar_id: req.params.calendar_id
		};
	});

	res.status(200).send(events);

});

export default router;
