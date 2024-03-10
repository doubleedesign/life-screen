import express from 'express';
import session from 'express-session';
import listEndpoints from 'express-list-endpoints';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { google } from 'googleapis';
import { User, MyCache } from './types';
import cors from 'cors';
import nodeCache from 'node-cache';
import msGraphRouter from './msgraph';
import googleRouter from './gcal';
//import lifxRouter from './lifx';
import { config } from 'dotenv';
config();

declare module 'express-session' {
	interface SessionData {
		msgraph: User | undefined;
		gcal: User | undefined
	}
}

// Set up Express
const app = express();
app.use(cors({
	origin: 'https://localhost:3000',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware for user-level stuff
// NOTE: Uses default in-memory session store, which is not suitable for production
// See https://www.npmjs.com/package/express-session
app.use(session({
	secret: 'THIS_CAN_BE_ANYTHING_LOCALLY',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false, // Set to true if using HTTPS i.e. in production
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
app.use('/msgraph', msGraphRouter);
app.use('/gcal', googleRouter);
//app.use('/lifx', lifxRouter);

// Session info - for dev only
app.get('/', (req, res) => {
	res.status(200).json(req.session);
});


// Start server
app.listen(3001, () => {
	console.log('Server running on port 3001');
	//console.log(listEndpoints(app));
});


