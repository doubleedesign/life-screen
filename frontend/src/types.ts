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
	colors: { // set in this app
		primary: string;
		secondary: string;
	}
}

type CalendarDate = {
	dateTime: Date;
	timeZone: string;
}

export type CalendarEvent = {
	what: string;
	when: { start: CalendarDate, end?: CalendarDate };
	where: {
		displayName: string;
		locationType: string;
		address: object,
		coordinates: object
	}
	type: 'singleInstance' | 'occurrence' | 'exception';
	categories: string[];
	calendar_id: string
}
