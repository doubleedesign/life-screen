import express from 'express';
import session from 'express-session';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { google } from 'googleapis';
import { GCalUser, MSGraphUser, MyCache } from './types';
import cors from 'cors';
import nodeCache from 'node-cache';
import msAuthRouter from './msgraph/auth.js';
import googleAuthRouter from './gcal/auth.js';
import lifxRouter from './lifx/routes';
import { config } from 'dotenv';
config();

declare module 'express-session' {
	interface SessionData {
		msgraph: MSGraphUser | undefined;
		gcal: GCalUser | undefined;
		lights: object
	}
}

// Set up server
// Note: Use CORS browser plugin if having CORS issues
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware for user-level stuff
// NOTE: Uses default in-memory session store, which is not suitable for production
// See https://www.npmjs.com/package/express-session
app.use(session({
	secret: 'THIS_CAN_BE_ANYTHING_LOCALLY',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false, // set this to true on production
	},
	unset: 'destroy'
}));

// Set up cache for application-level stuff
app.locals.cache = new nodeCache({ stdTTL: 28800 });
app.locals.cache = {
	...app.locals.cache,
	msalClient: new ConfidentialClientApplication({
		auth: {
			clientId: process.env.MS_OAUTH_CLIENT_ID,
			authority: process.env.MS_OAUTH_AUTHORITY,
			clientSecret: process.env.MS_OAUTH_CLIENT_SECRET
		},
		cache: app.locals.cache
	}),
	googleClient: new google.auth.OAuth2(
		process.env.GOOGLE_OAUTH_CLIENT_ID,
		process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		process.env.GOOGLE_OAUTH_REDIRECT_URI
	),
} as MyCache;

// API routes
app.use('/msgraph', msAuthRouter);
app.use('/gcal', googleAuthRouter);
app.use('/lifx', lifxRouter);


// Start server
app.listen(4000, () => {
	console.log('Server running on port 4000');
});
