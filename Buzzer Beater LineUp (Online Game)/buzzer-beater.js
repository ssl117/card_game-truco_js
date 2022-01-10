var players_stats_string = `Sergio Arbiter	P	33	5	4	4	1	4	4	8	7	8	7	2	1	1	9
Romain Bonnard	B	27	20	8	19	20	20	12	9	6	6	7	5	10	12	9
Tudor Cernea	AL	21	14	9	14	13	13	7	8	11	6	7	8	3	13	9
Sanjin Dražina	P	0	2	4	3	1	6	5	4	3	5	3	9	6	4	3
Juan Fernández	AL	16	18	12	12	13	14	3	6	4	7	8	9	6	4	8
Pascual Figueroa	B	0	5	3	2	6	2	4	1	1	1	3	9	15	2	2
Leonardo Francescoli	B	0	3	5	1	6	7	3	1	1	7	7	9	15	2	4
Ricardo Larrique	AL	0	3	1	2	2	2	2	1	1	1	1	5	14	17	2
Luca Paschini	P	15	6	3	4	3	8	1	17	17	18	9	6	9	8	9
Diego Sanchez	B	0	4	1	1	6	3	3	2	1	2	1	9	8	2	3
Démian Sonsol	B	32	19	13	16	17	17	14	8	9	2	7	9	7	8	9
Kristopher Stanley	P	27	10	6	4	8	11	6	19	18	16	13	7	12	9	9
Alessio Stevanella	B	32	15	10	17	17	17	15	5	8	3	7	9	5	10	7
Bartas Stuckas	P	21	4	4	3	5	3	3	9	9	6	5	9	8	2	9
Ville Vasara	AP	16	8	1	8	6	9	6	11	8	17	4	9	2	11	7
`;

//----------------------------------------------------------------------------------------------

function separatePlayers(){
	
	var players_stats_commas = players_stats_string.replace(/\s+/g, ',');
	var players_stats_arr = players_stats_commas.split(',')
	var players_stats_arr_copy = [...players_stats_arr];

	do {
  		players_array.push(players_stats_arr_copy.splice(0,18));
	}
	while (players_stats_arr_copy.length > 0);

	players_array.pop();

	var i = players_array.length - 1

	do {
  		players_array[i].splice(2,1);
  		players_array[i].splice(2,1);
  		players_array[i].pop();
  		players_array[i].pop();
  		i -= 1;
	}
	while (i >= 0);
}

//----------------------------------------------------------------------------------------------

function definePosition(){

	let players_array_skills = [];

	for(let i = 0; i <= players_array.length - 1; i++){

		let new_player_array = [];

		let player_name = players_array[i][0] + ' ' + players_array[i][1];
		new_player_array.push(player_name);

		let player_calc_skills = calcPosition(players_array[i]);
		new_player_array.push(player_calc_skills);

		players_array_skills.push(new_player_array)
	}
	
	return players_array_skills;
}

//----------------------------------------------------------------------------------------------

function calcPosition(player){

	let base_skills = 		[25,40,45,5,5];
	let escolta_skills = 	[45,40,25,5,5];
	let alero_skills = 		[10,30,20,30,10];
	let ala_skills = 		[5,10,20,45,40];
	let pivot_skills = 		[5,5,15,45,50];

	let position_skills_arr = [];
	
	position_skills_arr.push(base_skills);
	position_skills_arr.push(escolta_skills);
	position_skills_arr.push(alero_skills); 
	position_skills_arr.push(ala_skills);
	position_skills_arr.push(pivot_skills);

	let player_skills_sum = [];

	let sum_base = player_skills_sum.push(player.slice(2,4).reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
	let sum_escolta = player_skills_sum.push(player.slice(4,6).reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
	let sum_alero = player_skills_sum.push(player.slice(6,8).reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
	let sum_ala = player_skills_sum.push(player.slice(8,10).reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
	let sum_pivot = player_skills_sum.push(player.slice(10,12).reduce((a, b) => parseFloat(a) + parseFloat(b), 0));

	player_skills_sum[0]

	let player_position = [];

	for(let i = 0; i <= position_skills_arr.length - 1; i++){

		let player_position_calc = [];

		let sum_pos_skills = 0;

			for(let j = 0; j <= player_skills_sum.length - 1; j++){

				let calc_skill = (parseFloat(position_skills_arr[i][j]) * parseFloat(player_skills_sum[j])) / 10;
				sum_pos_skills += calc_skill;
			}

		player_position_calc.push(sum_pos_skills);

		let sum_avg_position_value = (player_position_calc.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / 5;

		player_position.push(sum_avg_position_value.toFixed(2));

	}

	return player_position;

}

//----------------------------------------------------------------------------------------------

function chooseLineup(players){

	let new_players_arr = [...players];

	let best_lineup = [];

	for(let j = 0; j < 5; j++){

		let skill_value = 0;
		let best_player = [];
		let best_player_index = 0;

		for(let i = 0; i <= new_players_arr.length - 1; i++){

			if(parseFloat(new_players_arr[i][1][j]) > skill_value){
				best_player.pop();
				best_player.push(new_players_arr[i][0]);
				skill_value = new_players_arr[i][1][j];
				best_player_index = i;
			}
		}

		best_lineup.push(best_player);

		new_players_arr.splice(best_player_index, 1);
	}

	return best_lineup;

}


let players_array = [];

separatePlayers()

let skills_value_arr = definePosition();

console.log(chooseLineup(skills_value_arr))


/*
function definePosition(){

	let players_array_skills = [];

	for(let i = 0; i <= players_array.length - 1; i++){
		let new_player_array = [];
		let player_name = players_array[i][0] + ' ' + players_array[i][1];
		new_player_array.push(player_name);
		let sum_out_skills = players_array[i].slice(2,8).reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let outside_skills = 'OUT-SK: ' + sum_out_skills
		new_player_array.push(outside_skills);
		let sum_ins_skills = players_array[i].slice(8,13).reduce((a, b) => parseInt(a) + parseInt(b), 0)
		let inside_skills = 'INS-SK: ' + sum_ins_skills
		new_player_array.push(inside_skills);
		players_array_skills.push(new_player_array)
	}
	
	return players_array_skills;
}
*/

