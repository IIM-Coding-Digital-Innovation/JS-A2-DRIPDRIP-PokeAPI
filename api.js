const numberOfPokemonsToDisplay = 10;

function filterPokemon() {
    // Récupérer la valeur sélectionnée
    const selectedType = document.getElementById("type").value;
    let pokemonList = [];
    if (selectedType === 'all') {
        // Utiliser l'API PokeAPI pour récupérer les informations des 10 premiers pokemons
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemonsToDisplay}`)
            .then(response => response.json())
            .then(data => {
                const pokemons = data.results;
                pokemonList = pokemons.map(pokemon => {
                    return fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            const pokemonElement = document.createElement('li');
                            const nameElement = document.createElement('p');
                            const imageElement = document.createElement('img');
                            nameElement.textContent = pokemonData.name;
                            imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                            imageElement.alt = pokemonData.name;
                            pokemonElement.appendChild(nameElement);
                            pokemonElement.appendChild(imageElement);
                            return pokemonElement;
                        });
                });
                // Attendre que toutes les requêtes soient terminées
                Promise.all(pokemonList).then(pokemonElements => {
                    // Ajouter la liste des pokemons à l'élement "pokemon-list"
                    const pokemonListElement = document.getElementById('pokemon-list');
                    // Supprimer les enfants actuels
                    while (pokemonListElement.firstChild) {
                        pokemonListElement.removeChild(pokemonListElement.firstChild);
                    }
                    pokemonElements.forEach(pokemonElement => {
                        pokemonListElement.appendChild(pokemonElement);
                    });
                });
            });
    } else {
    // Utiliser l'API PokeAPI pour récupérer les pokemons du type sélectionné
    fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(response => response.json())
        .then(data => {
            // Récupérer les informations de Pokémon de la réponse
            const pokemons = data.pokemon;
            const pokemonList = pokemons.map(pokemon => {
                // Récupérer les informations de chaque pokemon
                return fetch(pokemon.pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const pokemonElement = document.createElement('li');
                        const nameElement = document.createElement('p');
                        const imageElement = document.createElement('img');
                        nameElement.textContent = pokemonData.name;
                        imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                        imageElement.alt = pokemonData.name;
                        pokemonElement.appendChild(nameElement);
                        pokemonElement.appendChild(imageElement);
                        return pokemonElement;
                    });
            });
            // Attendre que toutes les requêtes soient terminées
            Promise.all(pokemonList).then(pokemonElements => {
                // Ajouter la liste des pokemons à l'élement "pokemon-list"
                const pokemonListElement = document.getElementById('pokemon-list');
                // Supprimer les enfants actuels
                while (pokemonListElement.firstChild) {
                    pokemonListElement.removeChild(pokemonListElement.firstChild);
                }
                pokemonElements.forEach(pokemonElement => {
                    pokemonListElement.appendChild(pokemonElement);
                });
            });
        });
    }
  }

  window.onload = function() {
    filterPokemon();
}
  