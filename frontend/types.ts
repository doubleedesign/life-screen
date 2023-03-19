export type User = {
	id: string;
	displayName: string;
	mail: string;
	userPrincipalName: string;
	mailboxSettings: {
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
}
