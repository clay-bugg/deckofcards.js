import Card from './card.js'

const DECK_PRESETS = {
	standard: {
		deckCount: 1,
		includeJokers: false,
		description: 'Standard 52-card deck',
		values: {
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			Jack: 11,
			Queen: 12,
			King: 13,
			Ace: 14,
		},
		ranks: [
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
		],
	},
	poker: {
		deckCount: 1,
		includeJokers: false,
		description: 'Standard deck used in most poker games',
		values: {
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			Jack: 11,
			Queen: 12,
			King: 13,
			Ace: 14,
		},
		ranks: [
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
		],
	},
	blackjack: {
		deckCount: 6,
		includeJokers: false,
		description: 'Typical casino blackjack shoe with 6 decks',
		values: {
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			Jack: 10,
			Queen: 10,
			King: 10,
			Ace: 11,
		},
		ranks: [
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
		],
	},
	euchre: {
		deckCount: 1,
		includeJokers: false,
		ranks: ['9', '10', 'Jack', 'Queen', 'King', 'Ace'],
		description: 'Euchre deck with 24 cards',
		values: { 9: 9, 10: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 },
	},
	doublejoker: {
		deckCount: 1,
		includeJokers: true,
		ranks: [
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
		],
		description: '52 cards plus 2 jokers',
		values: {
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			Jack: 11,
			Queen: 12,
			King: 13,
			Ace: 14,
			Joker: 0,
		},
	},
}

class Deck {
	constructor({ preset = 'standard', includeJokers, deckCount } = {}) {
		const config = DECK_PRESETS[preset] || DECK_PRESETS.standard
		this.includeJokers =
			includeJokers !== undefined ? includeJokers : config.includeJokers
		this.deckCount = deckCount !== undefined ? deckCount : config.deckCount
		this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
		this.ranks = config.ranks || Object.keys(config.values)
		this.values = config.values
		this.singleJokerPreset = preset === 'doublejoker'
		this.cards = []
		this.reset()
	}

	reset() {
		this.cards = []

		for (let n = 0; n < this.deckCount; n++) {
			for (const suit of this.suits) {
				for (const rank of this.ranks) {
					const value = this.values?.[rank] ?? 0
					this.cards.push(new Card(suit, rank, value))
				}
			}

			// Add jokers **per deck only if not "single-joker preset"**
			if (this.includeJokers && !this.singleJokerPreset) {
				this.cards.push(
					new Card('Joker', 'Red', this.values?.['Joker'] ?? 0)
				)
				this.cards.push(
					new Card('Joker', 'Black', this.values?.['Joker'] ?? 0)
				)
			}
		}

		// For presets like doublejoker, add 2 jokers exactly once
		if (this.includeJokers && this.singleJokerPreset) {
			this.cards.push(
				new Card('Joker', 'Red', this.values?.['Joker'] ?? 0)
			)
			this.cards.push(
				new Card('Joker', 'Black', this.values?.['Joker'] ?? 0)
			)
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
			this.cards.find((c) => c.rank === rank && c.suit === suit) || null
		)
	}
}

export default Deck
export { DECK_PRESETS }
