class Card {
	constructor(suit, rank) {
		this.suit = suit
		this.rank = rank
		this.value = this.assignValue(rank)
	}

	assignValue(rank) {
		if (rank === 'Ace') return [1, 11] // Ace can be 1 or 11
		if (['Jack', 'Queen', 'King'].includes(rank)) return 10
		if (!isNaN(Number(rank))) return Number(rank)
		return 0 // For Jokers or unexpected values
	}

	toString() {
		return `${this.rank} of ${this.suit}`
	}
}

export default Card
