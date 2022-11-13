const graph = require('../graph');
const router = require('express-promise-router').default();

/* GET auth callback. */
router.get('/login', async function (req, res) {
	const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
	const urlParameters = {
		scopes: scopes.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI // /auth/callback
	};

	try {
		const authUrl = await req.app.locals.cache.msalClient.getAuthCodeUrl(urlParameters);
		res.redirect(authUrl);
	}
	catch (error) {
		console.error(`Error: ${error}`);
		req.flash('error_msg', {
			message: 'Error getting auth URL',
			debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
		});

		res.redirect('/');
	}
});


router.get('/callback', async function (req, res) {
	const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
	const tokenRequest = {
		code: req.query.code,
		scopes: scopes.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI
	};

	try {
		const response = await req.app.locals.cache.msalClient.acquireTokenByCode(tokenRequest);

		// Save the user's homeAccountId in their session
		// TODO: This might not be necessary given what's cached
		req.session.userId = response.account.homeAccountId;

		// Get user object
		const user = await graph.getUserDetails(req.app.locals.cache.msalClient, req.session.userId);

		// Add the user object to cached user storage
		req.app.locals.cache.users[req.session.userId] = {
			displayName: user.displayName,
			email: user.mail || user.userPrincipalName,
			timeZone: user.mailboxSettings.timeZone,
			token: response.accessToken
		};
	}
	catch (error) {
		req.flash('error', {
			message: 'Error completing authentication',
			debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
		});
	}

	//res.json(req.app.locals.cache.users[req.session.userId]);
	res.redirect('/');
});


router.get('/logout', async function (req, res) {
	if (req.session.userId) {
		// Look up the user's account in the cache
		const accounts = await req.app.locals.cache.msalClient.getTokenCache().getAllAccounts();
		const userAccount = accounts.find(a => a.homeAccountId === req.session.userId);

		// Remove the account
		if (userAccount) {
			await req.app.locals.cache.msalClient.getTokenCache().removeAccount(userAccount);
		}
	}

	// Destroy the user's session
	req.session.destroy(function () {
		res.redirect('http://localhost:3000');
	});
});

module.exports = router;