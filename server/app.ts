import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import * as msal from '@azure/msal-node';
import cors from 'cors';
import nodeCache from 'node-cache';
import { config } from 'dotenv';
config();

// Routes
// Note: Use CORS browser plugin if having CORS issues
import indexRouter from './routes';
import profileRouter from './routes/me';
import authRouter from './routes/auth';
import calendarRouter from './routes/calendars';
import eventsRouter from './routes/events';

// Start server
const app = express();
app.use(cors());
// Set up cache for logged-in user data
app.locals.cache = new nodeCache({ stdTTL: 28800 });
app.locals.cache.users = {};

// MSAL config
const msalConfig = {
	auth: {
		clientId: process.env.OAUTH_CLIENT_ID,
		authority: process.env.OAUTH_AUTHORITY,
		clientSecret: process.env.OAUTH_CLIENT_SECRET
	},
	cache: app.locals.cache,
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: msal.LogLevel.Verbose,
		}
	}
};

// Create msal application object and store it in the cache
app.locals.cache.msalClient = new msal.ConfidentialClientApplication(msalConfig);

// Session middleware
// NOTE: Uses default in-memory session store, which is not suitable for production
// TODO: Do I really need this as well as the cache?
app.use(session({
	secret: 'THIS_CAN_BE_ANYTHING_LOCALLY', // https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp/issues/66
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false, // set this to true on production
	},
	unset: 'destroy'
}));
app.use(flash());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use('/', indexRouter);
app.use('/me', profileRouter);
app.use('/auth', authRouter);
app.use('/calendars', calendarRouter);
app.use('/events', eventsRouter);

app.listen(4000, () => {
	console.log('Server running on port 4000');
});
