$(document).ready(function(){
	let poke1, poke2, container; 
	let offset= Math.floor(Math.random()*800);

	$('#enter').click(enterGame);

	$('#center').click(function () {
		if(poke1 && poke2) {
			battle();
		}
		else {
			alert('Please load Pokemon before continuing!');
		}
		
	});

	addEventHandlers();

	function enterGame() {
		$('#welcome').hide();
		$('#arena').fadeOut();
		$('h1').hide();
		$('#start').fadeIn();
		$('h1').css('font-size', '48px');
		$('h1').css('text-shadow','1px 5px rgb(85,85,82)')
		$('h1').fadeIn();
		$('#start').css('display', 'flex');
		$('body').css('background-image', 'linear-gradient(to bottom right, #e69846, #f7d569), url(images/texture.png)');
		$('body').css('background-blend-mode', 'overlay');
		$('body').css('justify-content', 'flex-start');
	}	

	function getPokemon(div) {
		container = div; 
		console.log("In function");
		$.get( `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${offset}`, function( data ) {
		  offset = Math.floor(Math.random()*800);
		  setPokemon(data);
		});
	}

	function setPokemon(data) {
		let pokemon = {
			name: '',
			frontImg: '',
			backImg: '',
			speed: 0,
			defense: 0,
			attack: 0,
			hp: 0
		};
		$.get( `https://pokeapi.co/api/v2/pokemon/${data.results[0].name}`, function( pokeData ) {
		  pokemon.name = capitalize(pokeData.species.name);
		  pokemon.frontImg = pokeData.sprites.front_default;
		  pokemon.backImg = pokeData.sprites.back_default;
		  pokemon.speed = pokeData.stats[0].base_stat;
		  pokemon.defense = pokeData.stats[3].base_stat;
		  pokemon.attack = pokeData.stats[4].base_stat;
		  pokemon.hp = pokeData.stats[5].base_stat;
		  if(container == '#first') {
		    poke1 = pokemon;
		    $('#getPoke1').hide();
		  }
		  else {
		    poke2 = pokemon;
		    $('#getPoke2').hide();
		  }
		  displayPokemon(pokemon);
		});		
	}

	function displayPokemon(pokemon) {
		$(container).prepend(`<img class="poke-img" src="${pokemon.frontImg}" alt="${pokemon.name} image">
			<div class="pokemon-stats">
				<h2>${pokemon.name}</h2>
				<p>Speed: <span class="red">${pokemon.speed}</span></p>
				<p>Attack: <span class="red">${pokemon.attack}</span></p>
				<p>Defense: <span class="red">${pokemon.defense}</span></p>
				
			</div>`
		);
		if(poke1 && poke2) {
			$('#center').css('animation', 'pulse 1s linear infinite');
		}
	}

	function battle() {
		$('#first').hide();
		$('#second').hide();
		$('#center').hide();
		$('#result').css('display', 'flex');
		let winner = calculateWinner();
		$('#result').prepend(`<h2 style="color:red;">${winner.name} est le gagnant !</h1>
			<img class="poke-img-win" src="${winner.frontImg}" alt="${winner.name} image">
		`);
	}

	function calculateWinner() {
		let winner;
		if(poke1.attack > poke2.attack) {
			winner = poke1;
		}
		else {
			winner = poke2;
		}
		return winner;
	}

	function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function enterGameFast() {
		$('#welcome').hide();
		$('#arena').hide();
		$('h1').hide();
		$('#start').show();
		$('h1').css('font-size', '48px');
		$('h1').css('text-shadow','1px 5px rgb(85,85,82)')
		$('h1').show();
		$('#start').css('display', 'flex');
		$('body').css('background-image', 'linear-gradient(to bottom right, #e69846, #f7d569), url(images/texture.png)');
		$('body').css('background-blend-mode', 'overlay');
		$('body').css('justify-content', 'flex-start');
	}

	function addEventHandlers() {
		$('#getPoke1').click(function () {
			$('#getPoke1').fadeOut();
			getPokemon('#first');
		});

		$('#getPoke2').click(function () {
			$('#getPoke2').fadeOut();
			getPokemon('#second');
		});

		$('#play-again').click(function() {

			$('#result').empty();
			$('#result').append('<button class="poke-btn" id="play-again">Rejouer</button>');
			$('#result').hide();
			$('#center').css('animation', 'none');
			poke1 = undefined;
			poke2 = undefined;
			$('#first').empty();
			$('#first').append('<button class="poke-btn" id="getPoke1">Pokémon Aléatoire</button>');
			$('#second').empty();
			$('#second').append('<button class="poke-btn" id="getPoke2">Pokémon Aléatoire</button>')
			$('#first').show();
			$('#second').show();
			$('#center').show();
			addEventHandlers();

		});
	}	
})