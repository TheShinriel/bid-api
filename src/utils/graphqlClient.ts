import fetch from 'node-fetch'
import 'dotenv/config'

import { HasuraGraphQlError } from 'src/model'
import { exit } from 'process'

export type GraphqlResponse = { data: any; errors: HasuraGraphQlError }

const { HASURA_GRAPHQL_URL, HASURA_GRAPHQL_ADMIN_SECRET } = process.env
if (!HASURA_GRAPHQL_URL) {
	console.error('HASURA_GRAPHQL_URL is not defined')
	exit(1)
}
if (!HASURA_GRAPHQL_ADMIN_SECRET) {
	console.error('HASURA_GRAPHQL_URL is not defined')
	exit(1)
}

// execute the parent mutation in Hasura
export const executeGraphqlQuery = async (
	variables: { [key: string]: any },
	query: string
): Promise<GraphqlResponse> => {
	const fetchResponse = await fetch(HASURA_GRAPHQL_URL, {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
		},
	})
	return (await fetchResponse.json()) as GraphqlResponse
}
