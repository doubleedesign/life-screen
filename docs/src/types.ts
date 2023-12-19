export type Tag = {
	name: string;
	description?: string;
	externalDocs?: {
		url: string
	}
}

export type Operation = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type Parameter = {
	name: string;
	description: string;
	in: string;
	required: boolean;
	schema?: {
		[key: string]: unknown
	}
}

export type Responses = {
	[code: number]: {
		description: string;
	}
}

export type Endpoint = {
	operation: Operation;
	path: string;
	summary: string;
	tags: string[];
	parameters: Parameter[];
	responses: Responses
}

export type Spec = {
	info: {
		title: string;
		description: string;
		version?: string;
	}
	openapi: string;
	servers: { url: string }[];
	tags: Tag[];
	paths: {
		[path: string]: {
			[key in Operation]: Pick<Endpoint, 'summary' | 'tags' | 'parameters' | 'responses'>
		}
	}
}
