import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import startOfWeek from 'date-fns/startOfWeek';
import Router from 'express-promise-router';
import graph from '../graph.js';
import iana from 'windows-iana';
const router = Router();

router.get('/', async function (req, res) {
	const userId = Object.keys(req.app.locals.cache.users)[0];

	if(!userId) {
		res.status(404).send('User not found');
		return false;
	}

	const timezone = req.app.locals.cache.users[userId]['timeZone'];

	// Initialise response object to add things into
	let response = {};

	// Convert user's Windows time zone (e.g. "Pacific Standard Time") to IANA format ("America/Los_Angeles")
	const timeZoneId = iana.findIana(timezone);

	// Calculate the start and end of the current week
	// Get midnight on the start of the current week in the user's timezone,
	// but in UTC. For example, for Pacific Standard Time, the time value would be 07:00:00Z
	const weekStart = zonedTimeToUtc(startOfWeek(new Date()), timeZoneId.valueOf());
	const weekEnd = addDays(weekStart, 7);

	// Get calendars
	const calendars = await graph.getCalendars(req.app.locals.cache.msalClient, userId);

	// Get events
	const events = graph.getCalendarView(
		req.app.locals.cache.msalClient,
		userId,
		formatISO(weekStart),
		formatISO(weekEnd),
		timezone);

	console.log(events);

	res.status(200).send(calendars);

});

export default router;
