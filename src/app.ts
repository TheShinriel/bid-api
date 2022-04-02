import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) =>
	res.send('Hello World from app.ts!')
)

// TODO: Open auction
app.get('/openAuction', (req: Request, res: Response) => {
	return res.json({
		openedAt: new Date(),
	})
})

// TODO: Close auction after 1minute
app.get('/closeAuction', (req: Request, res: Response) => {
	return res.json({
		closedAt: new Date(),
		// TODO: Check if there is a winner
	})
})

// TODO: Validate bid, that is greather than last bid price
app.get('/validateBid', (req: Request, res: Response) => {
	return true
})

export default app
