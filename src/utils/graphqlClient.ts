import fetch from 'node-fetch'
import { HasuraGraphQlError } from 'src/model'

export type GraphqlResponse = { data: any; errors: HasuraGraphQlError }

// execute the parent mutation in Hasura
export const executeGraphqlQuery = async (
	variables: { [key: string]: any },
	query: string
): Promise<GraphqlResponse> => {
	const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables,
		}),
	})
	return (await fetchResponse.json()) as GraphqlResponse
}
