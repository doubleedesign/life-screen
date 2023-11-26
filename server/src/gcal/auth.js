import Router from 'express-promise-router';
const router = Router();

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

router.get('/auth/callback', async function (req, res) {
	try {
		const { tokens } = await req.app.locals.cache.googleClient.getToken(req.query.code);
		req.app.locals.cache.googleClient.setCredentials(tokens);

		if(tokens) {
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

router.get('/logout', async function(req, res) {

});

export default router;
