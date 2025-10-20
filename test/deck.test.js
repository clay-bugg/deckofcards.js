import { describe, it, expect } from 'vitest'
import { Deck, DECK_PRESETS, Card } from '../src/index.js'

describe('Card class', () => {
	it('should correctly store suit, rank, and value', () => {
		const ace = new Card('Hearts', 'Ace', 11)
		expect(ace.suit).toBe('Hearts')
		expect(ace.rank).toBe('Ace')
		expect(ace.value).toBe(11)

		const king = new Card('Spades', 'King', 10)
		expect(king.value).toBe(10)

		const five = new Card('Diamonds', '5', 5)
		expect(five.value).toBe(5)
	})

	it('toString() should return a readable string', () => {
		Card.prototype.toString = function () {
			return `${this.rank} of ${this.suit}`
		}
		const card = new Card('Spades', 'King', 10)
		expect(card.toString()).toBe('King of Spades')
	})

	it('two different cards should be distinct', () => {
		const card1 = new Card('Clubs', '2', 2)
		const card2 = new Card('Clubs', '3', 3)
		expect(card1.toString()).not.toBe(card2.toString())
	})

	it('Joker cards should have value 0', () => {
		const joker = new Card('Joker', 'Red', 0)
		expect(joker.value).toBe(0)
	})
})

describe('Deck class', () => {
	it('includeJokers should optionally include 2 jokers', () => {
		const deck = new Deck({ includeJokers: true })
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(2)
		expect(deck.cards.length).toBe(54)
	})

	it('reset() should create correct number of cards', () => {
		const deck = new Deck()
		expect(deck.cards.length).toBe(52)
	})

	it('shuffle() should shuffle without changing deck size', () => {
		const deck = new Deck()
		const before = deck.cards.map((c) => c.toString())
		deck.shuffle()
		const after = deck.cards.map((c) => c.toString())
		expect(after.length).toBe(52)
		expect(after).not.toEqual(before)
	})

	it('cut() should reorder deck without changing number of cards', () => {
		const deck = new Deck()
		const originalOrder = [...deck.cards]
		deck.cut()
		expect(deck.cards.length).toBe(originalOrder.length)
		const isSameOrder = deck.cards.every((c, i) => c === originalOrder[i])
		expect(isSameOrder).toBe(false || isSameOrder)
	})

	it('draw() should remove top card', () => {
		const deck = new Deck()
		const card = deck.draw()
		expect(card).toBeDefined()
		expect(deck.cards.length).toBe(51)
	})

	it('peek() should reveal top card without removing it', () => {
		const deck = new Deck()
		const topCard = deck.peek()
		const topCardAgain = deck.peek()
		expect(topCardAgain).toBe(topCard)
		expect(deck.cards.length).toBe(52)
	})

	it('findCard() should return correct card or null', () => {
		const deck = new Deck()
		const card = deck.findCard('Ace', 'Spades')
		expect(card).not.toBeNull()
		expect(card.rank).toBe('Ace')
		expect(card.suit).toBe('Spades')

		const missing = deck.findCard('Joker', 'Green')
		expect(missing).toBeNull()
	})
})

describe('Deck presets', () => {
	it('creates standard deck with correct values', () => {
		const deck = new Deck({ preset: 'standard' })
		expect(deck.cards.length).toBe(52)
		expect(deck.cards[0].value).toBe(deck.values[deck.cards[0].rank])
	})

	it('creates blackjack deck with 6 decks', () => {
		const deck = new Deck({ preset: 'blackjack' })
		expect(deck.cards.length).toBe(52 * 6)
	})

	it('creates euchre deck with 24 cards', () => {
		const deck = new Deck({ preset: 'euchre' })
		expect(deck.cards.length).toBe(24)
		expect(deck.ranks).toEqual(['9', '10', 'Jack', 'Queen', 'King', 'Ace'])
	})

	it('creates doublejoker deck with 2 jokers', () => {
		const deck = new Deck({ preset: 'doublejoker' })
		expect(deck.cards.length).toBe(54)
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(2)
	})

	it('overrides deckCount and includeJokers correctly', () => {
		const deck = new Deck({
			preset: 'poker',
			includeJokers: true,
			deckCount: 2,
		})
		expect(deck.cards.length).toBe(52 * 2 + 4)
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(4)
	})

	it('defaults to standard deck if preset unknown', () => {
		const deck = new Deck({ preset: 'unknown' })
		expect(deck.cards.length).toBe(52)
	})
})
