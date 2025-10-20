import { describe, it, expect } from 'vitest'
import Card from '../src/card.js' // make sure path points to card.js

describe('Card class', () => {
	it('should correctly store suit, rank, and value', () => {
		const ace = new Card('Hearts', 'Ace')
		expect(ace.suit).toBe('Hearts')
		expect(ace.rank).toBe('Ace')
		expect(ace.value).toEqual([1, 11])

		const king = new Card('Spades', 'King')
		expect(king.value).toBe(10)

		const five = new Card('Diamonds', '5')
		expect(five.value).toBe(5)
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

	it('Joker cards should have value 0', () => {
		const joker = new Card('Joker', 'Red')
		expect(joker.value).toBe(0)
	})
})
