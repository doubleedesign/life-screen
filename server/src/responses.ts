// TODO: Refactor this file to somewhere common because both server and frontend are using it
enum ResponseCodes {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	TIMEOUT = 408,
	INTERNAL_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	UNKNOWN_ERROR = 502
}

export const ResponseCode = {
	Unauthorized: ResponseCodes.UNAUTHORIZED,
	Forbidden: ResponseCodes.FORBIDDEN,
	SuccessFound: ResponseCodes.OK,
	SuccessCreated: ResponseCodes.CREATED,
	InternalError: ResponseCodes.INTERNAL_ERROR,
	RangeError: ResponseCodes.BAD_REQUEST,
	TypeError: ResponseCodes.BAD_REQUEST,
	SyntaxError: ResponseCodes.BAD_REQUEST,
	NotFoundError: ResponseCodes.NOT_FOUND,
	TimeoutError: ResponseCodes.TIMEOUT,
	NotImplemented: ResponseCodes.NOT_IMPLEMENTED,
	NodeError: ResponseCodes.INTERNAL_ERROR,
	Error: ResponseCodes.UNKNOWN_ERROR
};

export const ResponseMessage = {
	NotFound: {
		Lights: 'No lights found, maybe you need to run setup again'
	}
};

// TODO: Replace usages with CustomResponses.NotFoundError
export class NotFoundError extends Error {
	name: string;

	constructor(props: string) {
		super(props);
		this.message = props;
		this.name = 'NotFoundError';
	}
}

type ResponseClasses = {
	[key in keyof typeof ResponseCode]: typeof Error;
}

function generateResponseClasses(): ResponseClasses {
	const responseClasses: ResponseClasses = {} as ResponseClasses;
	Object.entries(ResponseCode).forEach(([key, value]) => {
		responseClasses[key] = class extends Error {
			name: string;
			code: number;

			constructor(message: string) {
				super(message);
				this.message = message;
				this.name = key;
				this.code = value;
			}
		};
	});

	return responseClasses;
}
export const CustomResponse: ResponseClasses = generateResponseClasses();
