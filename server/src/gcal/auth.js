import Router from 'express-promise-router';
const router = Router();
import { google } from 'googleapis';
import { CustomResponse, ResponseCode } from '../responses.js';

router.get('/login', async function(req, res) {
	try {
		const authUrl = req.app.locals.cache.googleClient.generateAuthUrl({
			scope: process.env.GOOGLE_OAUTH_SCOPES
		});

		res.redirect(authUrl);
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
			const userId = calendars.find(calendar => calendar.primary).id;
			const settings = await gcal.settings.list();

			// Add the user object to the session
			req.session.gcal = {
				userId: userId,
				displayName: userId,
				email: userId,
				timeZone: String(Object.values(settings).find(setting => setting.id === 'timezone')?.value),
				token: tokens.access_token
			};

			// Save the session
			req.session.save((err) => err && console.error(err));

			// Redirect to front-end with auth data in URL fragment
			res.redirect(`${process.env.FRONTEND_URL}/gcal#token=${encodeURIComponent(tokens.access_token)}&userId=${encodeURIComponent(userId)}`);
		}
		else {
			throw new Error({
				status: 500,
				statusText: 'Internal server error',
				errorMessage: 'Unknown problem getting tokens from Google API client'
			});
		}

		// req.app.locals.cache.googleClient.on('tokens', (tokens) => {
		// 	// Remove in production
		// 	console.log(tokens);
		// });
	}
	catch(error) {
		res.status(error.status ?? 500).json({
			status: error.status ?? 500,
			message: `Error completing Google authentication: ${error?.errorMessage}`,
		});
	}
});


router.get('/logout', async function(req, res) {
	try {
		if(req?.session?.gcal?.userId) {

			// Revoke credentials in Google APIs client
			await req.app.locals.cache.googleClient.revokeCredentials();

			// Clear from the session
			req.session.gcal = undefined;

			res.status(200).json({
				ok: true,
				statusText: 'OK',
				code: ResponseCode.SuccessFound,
				content: 'Logged out of Google account'
			});
		}
		else {
			throw new CustomResponse.NotFoundError('Cannot find user in session, so cannot log them out');
		}
	}
	catch(error) {
		console.error(error);

		res.status((error.status || error.code) ?? 500).json({
			status: (error.status || error.code) ?? 500,
			message: `Error logging out of Google account: ${error?.errorMessage}`,
		});
	}
});

export default router;
