import Router from 'express-promise-router';
const router = Router();

router.get('/auth/login', async function(req, res) {
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


router.get('/auth/callback', async function (req, res) {
	try {
		const  { tokens } = await req.app.locals.cache.googleClient.getToken(req.query.code);

		if(tokens) {
			req.app.locals.cache.googleClient.setCredentials(tokens);
			req.session.gcal = {
				// TODO: More user data e.g., name
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
		console.error(error);

		res.status(error.status).json({
			status: error.status,
			message: `${error.statusText}: ${error.response.data.error_description} (${error.response.data.error})`
		});
	}
});


router.get('/auth/logout', async function(req, res) {
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
