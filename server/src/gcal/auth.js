import Router from 'express-promise-router';
const router = Router();
import { google } from 'googleapis';
import chalk from 'chalk';

router.get('/login', async function(req, res) {
	try {
		const url = req.app.locals.cache.googleClient.generateAuthUrl({
			scope: process.env.GOOGLE_OAUTH_SCOPES
		});

		res.redirect(url);
	}
	catch (error) {
		res.status(error.status).json({
			status: error.status,
			message: `${error.statusText}: ${error.response.data.error_description} (${error.response.data.error})`
		});
	}
});


router.get('/callback', async function (req, res) {
	try {
		const  { tokens } = await req.app.locals.cache.googleClient.getToken(req.query.code);

		if(tokens) {
			req.app.locals.cache.googleClient.setCredentials(tokens);
			const gcal = google.calendar({ version: 'v3', auth: req.app.locals.cache.googleClient });
			const calendarList = await gcal.calendarList.list();
			const calendars = calendarList.data.items;
			const settings = await gcal.settings.list();

			const userId = calendars.find(calendar => calendar.primary).id;
			req.session.gcal = {
				userId: userId,
				displayName: userId,
				email: userId,
				timeZone: String(Object.values(settings).find(setting => setting.id === 'timezone')?.value),
				tokens: tokens
			};

			res.status(200).json({
				status: 200,
				message: 'Login successful'
			});
		}
		else {
			throw new Error({
				status: 500,
				statusText: 'Internal server error',
				response :{
					data: {
						error: 'Unknown',
						error_description: 'Unknown problem getting tokens'
					}
				}
			});
		}

		req.app.locals.cache.googleClient.on('tokens', (tokens) => {
			// Remove in production
			console.log(tokens);
		});
	}
	catch(error) {
		console.log(chalk.red(`${error.name}: ${error.message}`));

		res.status(error.status).json({
			status: error.status,
			message: `${error.statusText}: ${error.response.data.error_description} (${error.response.data.error})`
		});
	}
});


router.get('/logout', async function(req, res) {
	try {
		// Revoke credentials in Google APIs client
		await req.app.locals.cache.googleClient.revokeCredentials();

		// Clear from the session
		req.session.gcal = undefined;

		res.status(200).json({
			status: 200,
			message: 'Logged out of Google account'
		});
	}
	catch(error) {
		console.error(error);

		res.status(error.status).json({
			status: error.status,
			message: `${error.statusText}: ${error.response.data.error_description} (${error.response.data.error})`
		});
	}
});

export default router;
