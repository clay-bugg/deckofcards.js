// card.js
class Card {
	constructor(suit, rank, value = null) {
		this.suit = suit
		this.rank = rank
		this.value = value !== null ? value : 0
	}
}

export default Card
