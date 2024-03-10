import NodeCache from 'node-cache';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { OAuth2Client } from 'google-auth-library';

export type MyCache = NodeCache & {
	msalClient: ConfidentialClientApplication;
	googleClient: OAuth2Client
};

export type User = {
	userId: string;
	displayName: string;
	email: string;
	timeZone: string;
	token: string;
}
