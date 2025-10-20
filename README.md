# 🃏 Deck of Cards

A simple, reusable, and object-oriented **JavaScript library** for simulating decks of playing cards.  
Includes support for shuffling, drawing, peeking, cutting, finding cards, and even multiple decks or jokers.

---

## ✨ Features

- Create one or more standard 52-card decks  
- Optionally include Jokers  
- Shuffle, cut, draw, or peek cards  
- Inspect or find specific cards  
- Reset or merge decks  
- Fully ES Module compatible  
- Tested with [Vitest](https://vitest.dev)

---

## 🚀 Installation

--bash
npm install deck-of-cards

🧩 Usage

import { Deck } from 'deck-of-cards'

const deck = new Deck({ includeJokers: true })
deck.shuffle()

const topCard = deck.peek()
console.log(topCard.toString()) // e.g. "Queen of Hearts"

const drawn = deck.draw()
console.log(drawn.value) // e.g. 10

🧠 Example Methods
Method	Description
shuffle()	Randomizes card order
cut()	Cuts the deck at a random point
draw()	Removes and returns the top card
peek()	Returns the top card without removing it
reset()	Restores deck to full state
findCard(rank, suit)	Finds a specific card
toString()	Returns readable card text

🧪 Testing

npm test

