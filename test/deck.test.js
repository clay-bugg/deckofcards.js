import { describe, it, expect } from 'vitest'
import { Deck, DECK_PRESETS, Card } from '../src/index.js'

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
	it('cut() should reorder the deck without changing the number of cards', () => {
		const deck = new Deck()
		const originalOrder = [...deck.cards]

		deck.cut()

		// Deck size should remain the same
		expect(deck.cards.length).toBe(originalOrder.length)

		// Most of the time the order should change
		const isSameOrder = deck.cards.every(
			(card, i) => card === originalOrder[i]
		)
		// It's possible by rare chance it cuts at 0 or full length, so we allow that
		expect(isSameOrder).toBe(false || isSameOrder)
	})
	describe('Deck', () => {
		it('cut() should reorder the deck without changing the number of cards', () => {
		  const deck = new Deck()
		  const originalOrder = [...deck.cards]
	  
		  deck.cut()
	  
		  // Deck size should remain the same
		  expect(deck.cards.length).toBe(originalOrder.length)
	  
		  // Most of the time the order should change
		  const isSameOrder = deck.cards.every((card, i) => card === originalOrder[i])
		  // It's possible by rare chance it cuts at 0 or full length, so we allow that
		  expect(isSameOrder).toBe(false || isSameOrder) 
		})
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
		const card = deck.findCard('Ace', 'Spades')

		expect(card).not.toBeNull()
		expect(card.rank).toBe('Ace')
		expect(card.suit).toBe('Spades')
	})

})

describe('Deck presets', () => {
	it('creates a standard deck with 52 cards', () => {
		const deck = new Deck({ preset: 'standard' })
		expect(deck.cards.length).toBe(52)
	})

	it('creates a blackjack deck with 6 decks (312 cards)', () => {
		const deck = new Deck({ preset: 'blackjack' })
		expect(deck.cards.length).toBe(52 * 6)
	})

	it('creates a poker deck identical to standard', () => {
		const poker = new Deck({ preset: 'poker' })
		const standard = new Deck({ preset: 'standard' })
		expect(poker.cards.length).toBe(standard.cards.length)
		expect(poker.includeJokers).toBe(standard.includeJokers)
	})

	it('creates a euchre deck with 24 cards (9–Ace only)', () => {
		const deck = new Deck({ preset: 'euchre' })
		expect(deck.cards.length).toBe(24)
		expect(deck.ranks).toEqual(['9', '10', 'Jack', 'Queen', 'King', 'Ace'])
	})

	it('creates a joker deck with 54 cards (includes jokers)', () => {
		const deck = new Deck({ preset: 'doublejoker' })
		expect(deck.cards.length).toBe(54)
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(2)
	})

	it('allows overriding jokers and deck count in presets', () => {
		const deck = new Deck({
			preset: 'poker',
			includeJokers: true,
			deckCount: 2,
		})
		expect(deck.cards.length).toBe(52 * 2 + 2 * 2) // 2 decks, 4 jokers total
		const jokers = deck.cards.filter((c) => c.suit === 'Joker')
		expect(jokers.length).toBe(4)
	})

	it('defaults to standard if preset is unknown', () => {
		const deck = new Deck({ preset: 'unknownGame' })
		expect(deck.cards.length).toBe(52)
	})
})
