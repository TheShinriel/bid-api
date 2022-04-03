import { Request, Response } from 'express'

import { executeGraphqlQuery } from 'src/utils/graphqlClient'

const AUCTION_QUERY = `
query ($auctionId: Int!) {
    Auction_by_pk(id: auctionId) {
        openedAt
        closedAt
        User {
            id
        }
    }
  }
}
`

const HASURA_OPERATION = `
mutation updateAuction($auctionId: Int!, $openedAt: timestamptz!, $closedAt: timestamptz!) {
    update_Auction_by_pk(pk_columns: {id: auctionId}, _set: {openedAt: openedAt, closedAt: closedAt}) {
        openedAt
        closedAt
    }
}
`

// Request Handler
export default async (req: Request, res: Response): Promise<Response> => {
	// get request input
	const { auctionId } = req.body.input

	const userId = req.body.session_variables['x-hasura-user-id']

	// run some business logic
	// fetch current data
	const { data: queryData, errors: queryErrors } = await executeGraphqlQuery(
		{ auctionId },
		AUCTION_QUERY
	)

	if (queryErrors) {
		throw new Error('Error during query to get context')
	}

	const auctionQueryData = queryData.Auction_by_pk
	if (!auctionQueryData) {
		return res.status(400).json({
			message: 'Invalid auction',
		})
	}

	const {
		openedAt,
		closedAt,
		User: { id: ownerId },
	} = auctionQueryData
	const now = new Date()

	if (ownerId != userId) {
		return res.status(400).json({
			message: 'Auction is not owned by you',
		})
	}
	if (closedAt && new Date(closedAt) > new Date()) {
		return res.status(400).json({
			message: 'Auction already closed',
		})
	}
	if (openedAt) {
		return res.status(400).json({
			message: 'Auction already opened',
		})
	}

	// execute the Hasura operation
	const { data, errors } = await executeGraphqlQuery(
		{
			auctionId,
			openedAt: new Date(),
			closedAt: new Date(now.getTime() + 60000),
		},
		HASURA_OPERATION
	)

	// if Hasura operation errors, then throw error
	if (errors) {
		return res.status(400).json({
			message: errors.message,
		})
	}

	// success
	return res.json({
		...data.update_Auction_by_pk,
	})
}
