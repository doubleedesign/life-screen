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
				email: user.mail || user.userPrincipalName,
				timeZone: user.mailboxSettings.timeZone,
				token: response.accessToken
			};

			res.cookie('msgraph', JSON.stringify(response.accessToken), { maxAge: 900000, httpOnly: true });

			res.redirect(process.env.FRONTEND_URL);
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

			res.status(200).json({
				status: 200,
				message: 'Logged out of Microsoft account'
			});
		}
		else {
			throw new Error({
				status: 404,
				errorCode: 'not_found',
				errorMessage: 'Cannot find user in session, so cannot log them out'
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
