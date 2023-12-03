enum ResponseCodes {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	TIMEOUT = 408,
	INTERNAL_ERROR = 500,
	NOT_IMPLEMENTED = 501
}

export const ResponseCode = {
	SuccessFound: ResponseCodes.OK,
	SuccessCreated: ResponseCodes.CREATED,
	InternalError: ResponseCodes.INTERNAL_ERROR,
	RangeError: ResponseCodes.BAD_REQUEST,
	TypeError: ResponseCodes.BAD_REQUEST,
	SyntaxError: ResponseCodes.BAD_REQUEST,
	NotFoundError: ResponseCodes.NOT_FOUND,
	TimeoutError: ResponseCodes.TIMEOUT,
	NotImplemented: ResponseCodes.NOT_IMPLEMENTED,
	NodeError: ResponseCodes.INTERNAL_ERROR
};

export class NotFoundError extends Error {
	name: string;

	constructor(props) {
		super(props);
		this.message = props;
		this.name = 'NotFoundError';
	}
}
