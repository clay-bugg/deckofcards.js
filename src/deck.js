import Card from './card.js'

class Deck {
	constructor({ includeJokers = false, deckCount = 1 } = {}) {
		this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
		this.ranks = [
			'Ace',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'Jack',
			'Queen',
			'King',
		]
		this.includeJokers = includeJokers
		this.deckCount = deckCount
		this.cards = []
		this.reset()
	}
	reset() {
		this.cards = []
		for (let n = 0; n < this.deckCount; n++) {
			for (const suit of this.suits) {
				for (const rank of this.ranks) {
					this.cards.push(new Card(suit, rank))
				}
			}
			if (this.includeJokers) {
				this.cards.push(new Card('Joker', 'Red'))
				this.cards.push(new Card('Joker', 'Black'))
			}
		}
	}
	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
		}
	}
	draw() {
		return this.cards.pop()
	}
	peek() {
		return this.cards[this.cards.length - 1]
	}
	findCard(rank, suit) {
		return (
			this.cards.find(
				(card) => card.rank === rank && card.suit === suit
			) || null
		)
	}
	hasCard(value, suit) {
		return this.cards.some(
			(card) => card.value === value && card.suit === suit
		)
	}
}

export default Deck
