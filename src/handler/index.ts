import { Request, Response } from 'express'

import openAuction from './openAuction'
import validateBid from './validateBid'

export const handlers: {
	[key: string]: (req: Request, res: Response) => Promise<Response>
} = {
	openAuction,
	validateBid,
}
