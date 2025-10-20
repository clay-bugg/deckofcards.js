import { Deck } from './src/index.js'

const deck = new Deck({ deckCount: 1, includeJokers: false })
deck.shuffle()
console.log(deck.findCard('3', 'Clubs'))
