const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');
const cors = require('cors');
const nodeCache = require('node-cache');
require('dotenv').config();

// Start server
const app = express();
app.use(cors()); // Note: Use CORS browser plugin if having CORS issues

// Routes
const indexRouter = require('./routes');
const profileRouter = require('./routes/me');
const authRouter = require('./routes/auth');
const calendarRouter = require('./routes/calendars');

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
			loggerCallback(loglevel, message, containsPii) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: msal.LogLevel.Verbose,
		}
	}
};

// Create msal application object and store it in the cache
app.locals.cache.msalClient = new msal.ConfidentialClientApplication(msalConfig);

app.locals.cache.test = 'test';

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

module.exports = app;
