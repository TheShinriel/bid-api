export type User = {
	id: number
	pseudo: string
}

export type Product = {
	id: number
	ownerId: number
	imageUrl: string
	name: string
	description: string
}

export type Auction = {
	id: number
	sellerId: number

	productId: Product
	streamUrl: string

	openedAt: Date
	closedAT: Date

	bids: Bid[]
	startPrice: number
}

export type Bid = {
	id: number
	bidderId: number
	auctionId: number

	price: number
	when: Date
}
