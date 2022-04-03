import express, { Request, Response } from 'express'

import { handlers } from './handler'

const app = express()

app.get('/', (req: Request, res: Response) =>
	res.send('Hello World from app.ts!')
)

app.post('/:route', async (req, res) => {
	try {
		const handler = handlers[req.params.route]
		if (!handler) {
			return res.status(404).json({
				message: `not found`,
			})
		}
		return await handler(req, res)
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			message: `unexpected error occured`,
		})
	}
})

export default app
