import { describe, it, expect } from 'vitest'
import { Deck } from '../src/index.js'

describe('Deck', () => {
	it('should contain 52 cards when reset', () => {
		const deck = new Deck()
		expect(deck.cards.length).toBe(52)
	})

	it('should draw a card and reduce size', () => {
		const deck = new Deck()
		const card = deck.draw()
		expect(card).toBeDefined()
		expect(deck.cards.length).toBe(51)
	})
})
