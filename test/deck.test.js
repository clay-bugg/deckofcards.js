import { describe, it, expect } from 'vitest'
import { Deck } from '../src/index.js'

describe('Deck', () => {
	it(' includeJokers should optionally include 2 jokers', () => {
		const deck = new Deck({ includeJokers: true })
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(2)
		expect(deck.cards.length).toBe(54)
	})
	it('reset() should contain 52 cards', () => {
		const deck = new Deck()
		expect(deck.cards.length).toBe(52)
	})
	it('shuffle() should shuffle cards without changing total count', () => {
		const deck = new Deck()
		const before = deck.cards.map((c) => c.toString())
		deck.shuffle()
		const after = deck.cards.map((c) => c.toString())
		expect(after.length).toBe(52)
		expect(after).not.toEqual(before) // occasionally may fail if shuffle returns same order by chance
	})

	it('draw() should draw a card and reduce deck size', () => {
		const deck = new Deck()
		const card = deck.draw()
		expect(card).toBeDefined()
		expect(deck.cards.length).toBe(51)
	})
	it('peek() should reveal top card of deck without changing deck size', () => {
		const deck = new Deck() // 52 cards
		const initialLength = deck.cards.length

		const topCard = deck.peek() // peek at top card
		const peekedCardStr = topCard.toString()

		// Peeking again shouldn't change anything
		const topCardAgain = deck.peek()
		expect(topCardAgain.toString()).toBe(peekedCardStr)

		// Deck size should not change after peek
		expect(deck.cards.length).toBe(initialLength)

		// Draw the top card
		const drawnCard = deck.draw()

		// Deck size should decrease by 1 after draw
		expect(deck.cards.length).toBe(initialLength - 1)

		// The new top card should be different (unless deck size 1)
		const newTopCard = deck.peek()

		if (deck.cards.length > 0) {
			expect(newTopCard).not.toBe(drawnCard)
			expect(drawnCard).toBe(topCard)
		}
	})
	it('findCard() should return the correct card or null', () => {
		const deck = new Deck()
		expect(deck.findCard('Ace', 'Spades')).toEqual({
			rank: 'Ace',
			suit: 'Spades',
		})
	})
	it('hasCard() should correctly detect cards', () => {
		expect(deck.hasCard('10', 'Hearts')).toBe(true)
		expect(deck.hasCard('2', 'Clubs')).toBe(false)
	})
})
