export type ExpressError = Error & {
	statusCode?: number;
	code?: string;
	statusText?: string;
};