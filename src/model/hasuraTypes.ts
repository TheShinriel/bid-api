type HasuraGraphQlError = {
	message: string
	extensions?: {
		code: number
		optionalField1: string
	}
}

type HasuraGraphQlActionInput = {
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

type HasuraGraphQlActionOutput = {
	[key: string]: any
}
