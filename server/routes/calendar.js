const router = require('express-promise-router')();
const graph = require('../graph.js');
const addDays = require('date-fns/addDays');
const formatISO = require('date-fns/formatISO');
const startOfWeek = require('date-fns/startOfWeek');
const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const iana = require('windows-iana');

router.get('/', async function (req, res) {
	if (!req.session.userId) {
		res.status(401).send('Unauthorised');
	}
	else {
		// Get the user
		const user = req.app.locals.users[req.session.userId];

		if(!user) {
			res.status(404).send('User not found');
		}
		else {
			// Initialise response object to add things into
			let response = {};

			/*
			// Convert user's Windows time zone (e.g. "Pacific Standard Time") to IANA format ("America/Los_Angeles")
			const timeZoneId = iana.findIana(user.timeZone)[0];
			console.log(`Time zone: ${timeZoneId.valueOf()}`);

			// Calculate the start and end of the current week
			// Get midnight on the start of the current week in the user's timezone,
			// but in UTC. For example, for Pacific Standard Time, the time value would be 07:00:00Z
			const weekStart = zonedTimeToUtc(startOfWeek(new Date()), timeZoneId.valueOf());
			const weekEnd = addDays(weekStart, 7);
			console.log(`Start: ${formatISO(weekStart)}`);

			try {
				// Get calendars
				response['calendars'] = await graph.getCalendars(req.app.locals.msalClient, req.session.userId);

				// Get the events
				const events = await graph.getCalendarView(
					req.app.locals.msalClient,
					req.session.userId,
					formatISO(weekStart),
					formatISO(weekEnd),
					user.timeZone);

				res.send(response);

			}
			catch (err) {
				req.flash('error_msg', {
					message: 'Could not fetch events',
					debug: JSON.stringify(err, Object.getOwnPropertyNames(err))
				});
			} */

			req.resolve(response);

		}
	}
});

module.exports = router;