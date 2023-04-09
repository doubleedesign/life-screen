import { theme } from './theme';

export type ThemeColor = keyof typeof theme.colors;

export type User = {
	id: string;
	displayName: string;
	mail: string;
	userPrincipalName: string;
	mailboxSettings?: {
		timeZone: string;
		dateFormat?: string;
		timeFormat?: string;
		workingHours: {
			daysOfWeek: string[],
			startTime: string;
			endTime: string;
		}
	};
	'@odata.context': string;
}

export type Calendar = {
	id: string;
	name: string;
	owner?: {
		name: string;
		address: string;
	}
	displayName?: string;
	logo?: string;
	sortPosition: number;
	hexColor: string; // from Outlook, so limited choices
	colors: {
		background: string; // set in this app
	}
}
