type Tag = {
	name: string;
	description?: string;
	externalDocs?: {
		url: string
	}
}

type Operation = 'get' | 'post' | 'patch' | 'put' | 'delete';

type Parameter = {
	name: string;
	description: string;
	in: string;
	required: boolean;
	schema?: {
		[key: string]: unknown
	}
}

type Responses = {
	[code: number]: {
		description: string;
	}
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
			[key in Operation]: {
				summary: string;
				tags: Pick<Tag, 'name'>[];
				parameters: Parameter[];
				responses: Responses
			}
		}
	}
}
