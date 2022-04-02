type User = {
	id: number
	pseudo: string
}

type Product = {
	id: number
	imageUrls: string[]
}

type Auction = {
	sellerId: number
	maxBid: number

	product: Product
	streamUrl: string

	open: boolean
	openAt: Date

	bids: Bid[]
}

type Bid = {
	sellerId: number
	auctionId: number

	price: number
	when: Date
}

type Bidder = {
	userId: number
	auctionId: number
}
