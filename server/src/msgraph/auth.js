import graph from './graph.js';
import Router from 'express-promise-router';
const router = Router();

router.get('/login', async function (req, res) {
	const scopes = process.env.MS_OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
	const urlParameters = {
		scopes: scopes.split(','),
		redirectUri: process.env.MS_OAUTH_REDIRECT_URI
	};

	try {
		const authUrl = await req.app.locals.cache.msalClient.getAuthCodeUrl(urlParameters);
		res.redirect(authUrl);
	}
	catch (error) {
		console.error(error);

		res.status(error.status).json({
			status: error.status,
			message: 'Error getting auth URL'
		});
	}
});


router.get('/callback', async function (req, res) {
	const scopes = process.env.MS_OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
	const tokenRequest = {
		code: req.query.code,
		scopes: scopes.split(','),
		redirectUri: process.env.MS_OAUTH_REDIRECT_URI
	};

	try {
		if(req.session) {
			const response = await req.app.locals.cache.msalClient.acquireTokenByCode(tokenRequest);

			// Get user object
			const user = await graph.getUserDetails(req.app.locals.cache.msalClient, response.account.homeAccountId);

			// Add the user object to the session
			req.session.msgraph = {
				userId: response.account.homeAccountId,
				displayName: user.displayName,
				email: user.userPrincipalName,
				timeZone: user.mailboxSettings.timeZone,
				token: response.accessToken
			};

			// Save the session
			req.session.save((err) => err && console.error(err));

			// Redirect to front-end with auth data in URL fragment
			res.redirect(`${process.env.FRONTEND_URL}/msgraph#token=${encodeURIComponent(response.accessToken)}&userId=${encodeURIComponent(response.account.homeAccountId)}`);
		}
		else {
			throw new Error({
				status: 400,
				errorCode: 'bad_request',
				errorMessage: 'Session does not exist'
			});
		}
	}
	catch (error) {
		console.error(error);

		res.status(error.status ?? 500).json({
			status: error.status ?? 500,
			message: `Error completing Microsoft authentication (${error?.errorCode}). ${error?.errorMessage}`,
		});
	}
});


router.get('/logout', async function (req, res) {
	try {
		if (req?.session?.msgraph?.userId) {
			// Look up the user's account in the cache
			const accounts = await req.app.locals.cache.msalClient.getTokenCache().getAllAccounts();
			const userAccount = accounts.find(a => a.homeAccountId === req.session.msgraph.userId);

			// Remove the account
			if (userAccount) {
				await req.app.locals.cache.msalClient.getTokenCache().removeAccount(userAccount);
			}

			// Clear from the session
			req.session.msgraph = undefined;

			res.redirect(`${process.env.FRONTEND_URL}/msgraph/logout`);
		}
		else {
			res.status(404).json({
				status: 404,
				message: 'Cannot find user in session, so cannot log them out'
			});
		}
	}
	catch(error) {
		console.error(error);

		res.status(error.status ?? 500).json({
			status: error.status ?? 500,
			message: `Error logging out of Microsoft account (${error?.errorCode}). ${error?.errorMessage}`,
		});
	}

	// Destroy the user's session
	// TODO: Use this elsewhere as part of a "log out of everything" option
	// req.session.destroy(function () {
	// 	res.redirect(process.env.FRONTEND_URL);
	// });
});

export default router;
