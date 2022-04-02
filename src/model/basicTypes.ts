type User = {
	id: number
	pseudo: string
}

type Product = {
	id: number
	ownerId: number
	imageUrl: string
	name: string
	description: string
}

type Auction = {
	id: number
	sellerId: number

	productId: Product
	streamUrl: string

	openedAt: Date
	closedAT: Date

	bids: Bid[]
	startPrice: number
}

type Bid = {
	id: number
	bidderId: number
	auctionId: number

	price: number
	when: Date
}
