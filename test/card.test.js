import { describe, it, expect } from 'vitest'
import { Card } from '../src/index.js'

describe('Card class', () => {
	it('should correctly store suit and rank', () => {
		const card = new Card('Hearts', 'Ace')
		expect(card.suit).toBe('Hearts')
		expect(card.rank).toBe('Ace')
	})

	it('toString() should return a readable string', () => {
		const card = new Card('Spades', 'King')
		expect(card.toString()).toBe('King of Spades')
	})

	it('two different cards should be distinct', () => {
		const card1 = new Card('Clubs', '2')
		const card2 = new Card('Clubs', '3')
		expect(card1.toString()).not.toBe(card2.toString())
	})
})
