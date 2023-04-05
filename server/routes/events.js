import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import startOfWeek from 'date-fns/startOfWeek';
import Router from 'express-promise-router';
import graph from '../graph.js';
import iana from 'windows-iana';
const router = Router();

router.get('/:calendarId', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];
	console.log(req.params.calendarId);

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	const timezone = req.app.locals.cache.users[userId]['timeZone'];

	// Initialise response object to add things into
	let response = {};

	// Convert user's Windows time zone (e.g. "Pacific Standard Time") to IANA format ("America/Los_Angeles")
	const timezoneId = iana.findIana(timezone);

	// Calculate the start and end of the current week
	// Get midnight on the start of the current week in the user's timezone,
	// but in UTC. For example, for Pacific Standard Time, the time value would be 07:00:00Z
	const weekStart = zonedTimeToUtc(startOfWeek(new Date()), timezoneId.valueOf()[0]);
	const weekEnd = addDays(weekStart, 7);

	// Get events from the calendar specified by ID in the request
	// GET https://graph.microsoft.com/v1.0/me/calendars/{id}/events
	// https://learn.microsoft.com/en-us/graph/outlook-get-shared-events-calendars
	//const events = await graph.getCalendarEvents(req.app.locals.cache.msalClient, userId, req.params.calendarId);

	//console.log(events);

	res.status(200).send(response);

});

export default router;
