import express from 'express';
import session from 'express-session';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { google } from 'googleapis';
import cors from 'cors';
import nodeCache from 'node-cache';
import { config } from 'dotenv';
config();

// Routes
// Note: Use CORS browser plugin if having CORS issues
import msAuthRouter from './msgraph/auth';
import googleAuthRouter from './gcal/auth';

// Set up server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware
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

// API routes
app.use('/msgraph', msAuthRouter);
app.use('/gcal', googleAuthRouter);

// Set up cache for logged-in user data
app.locals.cache = new nodeCache({ stdTTL: 28800 });
app.locals.cache.users = {};

// Create MSAL application object and store it in the cache
app.locals.cache.msalClient = new ConfidentialClientApplication({
	auth: {
		clientId: process.env.MS_OAUTH_CLIENT_ID,
		authority: process.env.MS_OAUTH_AUTHORITY,
		clientSecret: process.env.MS_OAUTH_CLIENT_SECRET
	},
	cache: app.locals.cache
});

// Create Google OAuth client and store it in the cache
app.locals.cache.googleClient = new google.auth.OAuth2(
	process.env.GOOGLE_OAUTH_CLIENT_ID,
	process.env.GOOGLE_OAUTH_CLIENT_SECRET,
	process.env.GOOGLE_OAUTH_REDIRECT_URI
);

// Start server
app.listen(4000, () => {
	console.log('Server running on port 4000');
});
