export type HasuraGraphQlError = {
	message: string
	extensions?: {
		code: number
		optionalField1: string
	}
}

export type HasuraGraphQlActionInput = {
	action: {
		name: string
	}
	input: {
		[key: string]: string
	}
	session_variables: {
		[key: string]: string
	}
	request_query: string
}

export type HasuraGraphQlActionOutput = {
	[key: string]: any
}
