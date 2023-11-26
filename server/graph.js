import graph from '@microsoft/microsoft-graph-client';
import * as iana from 'windows-iana';

const graphFunctions = {
	getUserDetails: async function (msalClient, userId) {
		const client = getAuthenticatedClient(msalClient, userId);

		return await client
			.api('/me')
			.select('displayName,mail,mailboxSettings,userPrincipalName')
			.get();
	},

	getCalendars: async function (msalClient, userId) {
		const client = getAuthenticatedClient(msalClient, userId);

		return await client
			.api('/me/calendars')
			.get();
	},

	getCalendarEvents: async function (msalClient, userId, calendarId, weeks) {
		const client = getAuthenticatedClient(msalClient, userId);
		function getEndDate() {
			const date = new Date();
			date.setDate(date.getDate() + (weeks * 7));

			return date;
		}

		// Get user data for timezone and figure out start and end date
		const user = await this.getUserDetails(msalClient, userId);
		const timezoneName = user.mailboxSettings.timeZone;
		const timezone = iana.findIana(timezoneName)[0];
		const now = new Date().toISOString();
		const end = getEndDate().toISOString();

		return await client
			.api(`/me/calendars/${calendarId}/calendarView`)
			.header('Prefer', `outlook.timezone="${timezone}"`)
			.select('subject,isAllDay,start,end,location,type,categories,seriesMasterId')
			.query({
				startDateTime: encodeURIComponent(now),
				endDateTime: encodeURIComponent(end)
			})
			.orderby('start/dateTime')
			.top(100)
			.get();
	},
};

function getAuthenticatedClient(msalClient, userId) {
	if (!msalClient || !userId) {
		throw new Error(`Invalid MSAL state. Client: ${msalClient ? 'present' : 'missing'}, User ID: ${userId ? 'present' : 'missing'}`);
	}

	// Initialize Graph client
	return graph.Client.init({
		// Implement an auth provider that gets a token
		// from the app's MSAL instance
		authProvider: async (done) => {
			try {
				// Get the user's account
				const account = await msalClient.getTokenCache().getAccountByHomeId(userId);

				if (account) {
					// Attempt to get the token silently
					// This method uses the token cache and refreshes expired tokens as needed
					const response = await msalClient.acquireTokenSilent({
						scopes: process.env.MS_OAUTH_SCOPES.split(','),
						redirectUri: process.env.OAUTH_REDIRECT_URI,
						account: account
					});

					// First param to callback is the error,
					// Set to null in success case
					done(null, response.accessToken);
				}
			}
			catch (err) {
				console.error('Error in getAuthenticatedClient');
				//console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
				done(err, null);
			}
		}
	});
}

export default graphFunctions;
