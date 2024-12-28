import * as iana from 'windows-iana';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import { 
	TokenCredentialAuthenticationProvider
} from '@microsoft/microsoft-graph-client/lib/src/authentication/azureTokenCredentials/TokenCredentialAuthenticationProvider.js';
import type { Calendar, Event, User } from '@microsoft/microsoft-graph-types';
import { ResponseCode } from '../responses.ts';
import type { Response } from 'express';
import type { ExpressError } from '../types.ts';

class MsGraphClient {
	private userId = null;
	private client = null;

	constructor() {
		this.userId = process.env.MS_USERNAME;

		const microsoftCredentials = new ClientSecretCredential(
			process.env.MS_TENANT_ID,
			process.env.MS_CLIENT_ID,
			process.env.MS_CLIENT_SECRET
		);

		this.client = Client.initWithMiddleware({
			authProvider: new TokenCredentialAuthenticationProvider(microsoftCredentials, {
				scopes: ['https://graph.microsoft.com/.default']
			})
		});
	}

	async getUserDetails(): Promise<User> {
		return await this.client
			.api(`/users/${this.userId}`)
			.select('displayName,mail,mailboxSettings,userPrincipalName')
			.get();
	}

	async getCalendars(): Promise<Calendar[]> {
		return await this.client
			.api(`/users/${this.userId}/calendars`)
			.get();
	}

	async getCalendarEvents(calendarId: string, weeks: number): Promise<Event[]> {
		function getEndDate() {
			const date = new Date();
			date.setDate(date.getDate() + (weeks * 7));

			return date;
		}

		// Get user data for timezone
		const user = await this.getUserDetails();
		const timezoneName = user.mailboxSettings.timeZone;
		const timezone = iana.findIana(timezoneName)[0];
		const now = new Date().toISOString();
		const end = getEndDate().toISOString();

		return await this.client
			.api(`/users/${this.userId}/calendars/${calendarId}/calendarView`)
			.header('Prefer', `outlook.timezone="${timezone}"`)
			.select('subject,isAllDay,start,end,location,type,categories,seriesMasterId')
			.query({
				startDateTime: encodeURIComponent(now),
				endDateTime: encodeURIComponent(end)
			})
			.orderby('start/dateTime')
			.top(100)
			.get();
	}

	handleError(error: ExpressError, response: Response): void {
		if(typeof error.statusCode === 'number' && error.statusCode >= 400) {
			response.status(error.statusCode).json(`${error.message}`);
		}
		else if(!error.statusCode) {
			response.status(500).json(`${error.message}`);
		}
		else {
			response.status(ResponseCode[error.code]).json(`${error.message}`);
		}
	}
}

export default MsGraphClient;