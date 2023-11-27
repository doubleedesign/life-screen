import NodeCache from 'node-cache';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { OAuth2Client, Credentials } from 'google-auth-library';

export type MyCache = NodeCache & {
	msalClient: ConfidentialClientApplication;
	googleClient: OAuth2Client
};

type User = {
	userId: string;
	displayName: string;
	email: string;
	timeZone: string;
}

export type MSGraphUser = User & {
	token: string;
}

export type GCalUser = User & {
	tokens: Credentials;
}
