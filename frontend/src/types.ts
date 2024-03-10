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
