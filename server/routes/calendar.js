const router = require('express-promise-router').default();
const graph = require('../graph.js');
const addDays = require('date-fns/addDays');
const formatISO = require('date-fns/formatISO');
const startOfWeek = require('date-fns/startOfWeek');
const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const iana = require('windows-iana');

router.get('/', async function (req, res) {
	const user = req.query.user;

	if(!user) {
		res.status(404).send('User not found');
	}

	else {
		// Initialise response object to add things into
		let response = {};

		// Convert user's Windows time zone (e.g. "Pacific Standard Time") to IANA format ("America/Los_Angeles")
		//const timeZoneId = iana.findIana(user.mailboxSettings.timeZone)[0];

		// Calculate the start and end of the current week
		// Get midnight on the start of the current week in the user's timezone,
		// but in UTC. For example, for Pacific Standard Time, the time value would be 07:00:00Z
		//const weekStart = zonedTimeToUtc(startOfWeek(new Date()), timeZoneId.valueOf());
		//const weekEnd = addDays(weekStart, 7);
		//console.log(`Start: ${formatISO(weekStart)}`);

		try {
			// Get calendars
			const calendars = await graph.getCalendars(req.app.locals.msalClient, user.id);

			// Get the events
			/*
			const events = await graph.getCalendarView(
				req.app.locals.msalClient,
				user.id,
				formatISO(weekStart),
				formatISO(weekEnd),
				user.timeZone); */

			console.log('CALENDARS HERE');
			console.log(calendars);

			res.status(200).send(calendars);
		}
		catch (err) {
			req.flash('error_msg', {
				message: 'Could not fetch events',
				debug: JSON.stringify(err, Object.getOwnPropertyNames(err))
			});

			res.status(400).send('Something went wrong');
		}

		res.status(500).send('Something went wrong');
	}

});

module.exports = router;