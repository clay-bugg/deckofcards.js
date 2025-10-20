import Card from './card.js'

const DECK_PRESETS = {
	standard: {
		deckCount: 1,
		includeJokers: false,
		description: 'Standard 52-card deck',
	},
	poker: {
		deckCount: 1,
		includeJokers: false,
		description: 'Standard deck used in most poker games',
	},
	blackjack: {
		deckCount: 6,
		includeJokers: false,
		description: 'Typical casino blackjack shoe with 6 decks',
	},
	euchre: {
		deckCount: 1,
		includeJokers: false,
		ranks: ['9', '10', 'Jack', 'Queen', 'King', 'Ace'],
		description: 'Euchre deck with 24 cards',
	},
	doublejoker: {
		deckCount: 1,
		includeJokers: true,
		description: '52 cards plus 2 jokers',
	},
}
class Deck {
	constructor({ preset = 'standard', includeJokers, deckCount } = {}) {
		const config = DECK_PRESETS[preset] || DECK_PRESETS.standard
		
		this.includeJokers =
			includeJokers !== undefined ? includeJokers : config.includeJokers
		this.deckCount =
			deckCount !== undefined ? deckCount : config.deckCount

		this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
		this.ranks =
			config.ranks ||
			['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

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

	cut() {
		if (this.cards.length <= 1) return

		const min = Math.floor(this.cards.length * 0.3)
		const max = Math.ceil(this.cards.length * 0.7)
		const cutIndex = Math.floor(Math.random() * (max - min + 1)) + min

		const top = this.cards.slice(0, cutIndex)
		const bottom = this.cards.slice(cutIndex)
		this.cards = bottom.concat(top)
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
}

export default Deck
export { DECK_PRESETS }
