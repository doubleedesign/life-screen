export type User = {
	userId: string | null;
	displayName?: string;
	email?: string;
	timeZone?: string;
}

export type Message = {
	key: string;
	code: number;
	message: string;
}

export type FormattedResponse = {
	ok: boolean;
	code: number;
	statusText: string;
	content?: User | Pick<Message, 'message'>;
}
