import { Request, Response } from 'express'

import { executeGraphqlQuery } from 'src/utils/graphqlClient'

const AUCTION_QUERY = `
query ($auctionId: Int!) {
	Auction_by_pk(id: auctionId) {
		Bids(order_by: {when: desc}, limit: 1) {
		 	price
		}
		openedAt
		created_at
	}
  }
}
`

// Request Handler
export default async (req: Request, res: Response): Promise<Response> => {
	// get request input
	const { auctionId, price } = req.body.input

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

	const { openedAt, closedAt, Bids: bids } = auctionQueryData
	const now = new Date()

	if (closedAt && new Date(closedAt) > new Date()) {
		return res.status(400).json({
			message: 'Auction already closed',
		})
	}
	if (!openedAt || new Date(openedAt) > now) {
		return res.status(400).json({
			message: 'Auction is not opened',
		})
	}

	if (!bids || bids.length === 0) {
		// success
		return res.json({
			validate: true, // TODO: Check what to return
		})
	}

	const lastPrice = bids[0].price

	if (price > lastPrice) {
		// success
		return res.json({
			validate: true, // TODO: Check what to return
		})
	}

	return res.status(400).json({
		message: 'Bid price must be greater than last bid price',
	})
}
