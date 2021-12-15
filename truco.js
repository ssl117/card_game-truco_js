function createDeck(){
	const palos = ['Oro','Basto','Espada','Copa'];
	const num_cartas = [1,2,3,4,5,6,7,10,11,12];
	let cartas = [];
	for(let i = 0; i <= palos.length - 1; i++){
		for(let j = 0; j <= num_cartas.length - 1; j++){
			cartas.push([palos[i],num_cartas[j]]); 
		}
	}
	return cartas;
}

function shuffleDeck(deck){
	let arr = deck;
	let new_arr = [...arr];
	for(let i = 0; i <= (arr.length * 4); i++){
		let randNum = Math.floor(Math.random()*(arr.length-2));
		let pop_card = new_arr.pop()
		let insert_card = new_arr.splice(randNum, 0, pop_card);
	}
	return new_arr;
}

function createHand(deck){
	let hand = []
	for(let i = 0; i <= 2; i++){
		hand.push(deck.pop());
	}
	return hand;
}

function orderHand(hand){
	let arr = hand;
	let new_arr = [];
	let order_hand = [];

	for(let i = 0; i <= arr.length - 1; i++){
		let card_value = valueCards(arr[i]);
		new_arr.push(card_value);
	}

	let new_arr_order = [...new_arr];

	new_arr_order.sort(function(a, b) {
  		return a - b;
	});

	for(let i = 0; i <= arr.length - 1; i++){
		let position = new_arr.indexOf(new_arr_order.pop())
		order_hand.push(arr[position]);
	}

	return order_hand;
}


function valueCards(card){
	switch(card.join('')){
		case 'Espada1':
			return 70;
			break;
		case 'Basto1':
			return 60;
			break; 
		case 'Espada7':
			return 50;
			break; 
		case 'Oro7':
			return 40;
			break; 
		default:
			if(card[1] >= 1 && card[1] <= 3){
				return card[1] * 10 + 5; 
			} else {
				return card[1];
			}
			break;
	}
}

function winsGame(round){
	switch(round){
		case 1:
			return 'Play';
			break;

		case 2:
			if(roundsPlayerOne == 2 && roundsPlayerTwo == 0){
				return 'Player One Wins!';
				break;
			} else if(roundsPlayerTwo == 2 && roundsPlayerOne == 0){
				return 'Player Two Wins!';
				break;
			} else if(roundsPlayerOne == 4){
				return 'Player One Wins!';
				break;
			} else if(roundsPlayerTwo == 4){
				return 'Player Two Wins!';
				break;
			} else {
				return 'Play';
				break;
		}

		case 3:
			if(roundsPlayerOne > roundsPlayerTwo){
				return 'Player One Wins!';
			} else if(roundsPlayerOne < roundsPlayerTwo){
				return 'Player Two Wins!';
			} else {
				if(first_round == 'P1'){
					return 'Player One Wins! (Won First Round)';
				} else if(first_round == 'P2'){
					return 'Player Two Wins! (Won First Round)';
				} else {
					return 'WHAAAAAAAAAAAAAAAAT';
				}
		}

		default:
			return 'Play';
			break;
	}
}

function playHand(hand1, hand2){
	
	let rounds = 3;

	console.log('Player 1 Hand:\n')
	console.log(hand1);
	console.log('\n')
	console.log('Player 2 Hand:\n')
	console.log(hand2);
	console.log('\n')

	for(i = 0; i < rounds; i++){

		let whoWins = winsGame(round_count);

		if(whoWins != 'Play') {
			return whoWins;
		}

		round_count += 1;

		console.log('Round ' + (i+1) + ': \n')
		console.log(hand1[0]);
		console.log(hand2[0]);
		console.log('\n')
		let PLayerOneCard = valueCards(hand1.shift());
		let PLayerTwoCard = valueCards(hand2.shift());

		if(PLayerOneCard > PLayerTwoCard){
			roundsPlayerOne += 1;
		} else if (PLayerOneCard < PLayerTwoCard){
			roundsPlayerTwo += 1;
		} else {
			roundsPlayerOne += 3;
			roundsPlayerTwo += 3;
		}

		if(round_count == 1){
			if(roundsPlayerOne > roundsPlayerTwo){
				first_round = 'P1';
			} else if(roundsPlayerOne < roundsPlayerTwo){
				first_round = 'P2';
			} else {
				first_round = 'Tie';
			}
		}

		if(round_count == 3){

			whoWins = winsGame(round_count);

			if(whoWins != 'Play') {
				return whoWins;
			}

		}
	}

}

let roundsPlayerOne = 0;
let roundsPlayerTwo = 0;
let round_count = 0;
let first_round = '';

let mazo = shuffleDeck(createDeck());

let mano_player1 = orderHand(createHand(mazo));
let mano_player2 = orderHand(createHand(mazo));

console.log(playHand(mano_player1,mano_player2))



