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
                            // Créer la div conteneur pour chaque élément <li>
                            const pokemonContainer = document.createElement('div');
                            pokemonContainer.classList.add('pokemon-card');
                            // Créer l'élément <li> pour chaque pokemon
                            const pokemonElement = document.createElement('li');
                            const nameElement = document.createElement('p');
                            const imageElement = document.createElement('img');
                            const seeMoreButton = document.createElement('button');
                                seeMoreButton.textContent = "Voir plus";
                                seeMoreButton.classList = "pokemon-button";
                                seeMoreButton.addEventListener('click', () => {
                                    document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`; 
                                });
                            nameElement.textContent = pokemonData.name;
                            imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                            imageElement.alt = pokemonData.name;
                            pokemonElement.appendChild(nameElement);
                            pokemonElement.appendChild(imageElement);
                            pokemonElement.appendChild(seeMoreButton);
                            // Ajouter l'élément <li> à la div conteneur
                            pokemonContainer.appendChild(pokemonElement);
                            return pokemonContainer;
                        });
                });
                // Attendre que toutes les requêtes soient terminées
                Promise.all(pokemonList).then(pokemonContainers => {
                    // Ajouter la liste des pokemons à l'élement "pokemon-list"
                    const pokemonListElement = document.getElementById('pokemon-list');
                    // Supprimer les enfants actuels
                    while (pokemonListElement.firstChild) {
                        pokemonListElement.removeChild(pokemonListElement.firstChild);
                    }
                    pokemonContainers.forEach(pokemonContainer => {
                        pokemonListElement.appendChild(pokemonContainer);
                    });
                });
            });
        } else {
            // Utiliser l'API PokeAPI pour récupérer les pokemons du type sélectionné
            fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
                .then(response => response.json())
                .then(data => {
                    const pokemons = data.pokemon;
                    pokemonList = pokemons.map(pokemon => {
                        return fetch(pokemon.pokemon.url)
                            .then(response => response.json())
                            .then(pokemonData => {
                                // Créer la div conteneur pour chaque élément <li>
                                const pokemonContainer = document.createElement('div');
                                pokemonContainer.classList.add('pokemon-card');
                                // Créer l'élément <li> pour chaque pokemon
                                const pokemonElement = document.createElement('li');
                                const nameElement = document.createElement('p');
                                const imageElement = document.createElement('img');
                                const seeMoreButton = document.createElement('button');
                                seeMoreButton.textContent = "Voir plus";
                                seeMoreButton.addEventListener('click', () => {
                                    document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`; 
                                });
                                nameElement.textContent = pokemonData.name;
                                imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                                imageElement.alt = pokemonData.name;
                                pokemonElement.appendChild(nameElement);
                                pokemonElement.appendChild(imageElement);
                                pokemonElement.appendChild(seeMoreButton);
                                // Ajouter l'élément <li> à la div conteneur
                                pokemonContainer.appendChild(pokemonElement);
                                return pokemonContainer;
                            });
                    });
                    // Attendre que toutes les requêtes soient terminées
                    Promise.all(pokemonList).then(pokemonContainers => {
                        // Ajouter la liste des pokemons à l'élement "pokemon-list"
                        const pokemonListElement = document.getElementById('pokemon-list');
                        // Supprimer les enfants actuels
                        while (pokemonListElement.firstChild) {
                            pokemonListElement.removeChild(pokemonListElement.firstChild);
                        }
                        pokemonContainers.forEach(pokemonContainer => {
                            pokemonListElement.appendChild(pokemonContainer);
                        });
                    });
                });
    }
  }


  function filterGene() {
	// Récupérer la valeur sélectionnée
	const selectedGeneration = document.getElementById("generation").value;
	let pokemonList = [];
	if (selectedGeneration === 'all') {
		// Utiliser l'API PokeAPI pour récupérer les informations des 10 premiers pokemons
		fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`).then(response => response.json()).then(data => {
			const pokemons = data.results;
			pokemonList = pokemons.map(pokemon => {
				return fetch(pokemon.url).then(response => response.json()).then(pokemonData => {
					// Créer la div conteneur pour chaque élément <li>
					const pokemonContainer = document.createElement('div');
					pokemonContainer.classList.add('pokemon-card');
					// Créer l'élément <li> pour chaque pokemon
					const pokemonElement = document.createElement('li');
					const nameElement = document.createElement('p');
					const imageElement = document.createElement('img');
                    const seeMoreButton = document.createElement('button');
                                seeMoreButton.textContent = "Voir plus";
                                seeMoreButton.addEventListener('click', () => {
                                    document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`; 
                                });
					nameElement.textContent = pokemonData.name;
					imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
					imageElement.alt = pokemonData.name;
					pokemonElement.appendChild(nameElement);
					pokemonElement.appendChild(imageElement);
                    pokemonElement.appendChild(seeMoreButton);
					// Ajouter l'élément <li> à la div conteneur
					pokemonContainer.appendChild(pokemonElement);
					return pokemonContainer;
				});
			});
			// Attendre que toutes les requêtes soient terminées
			Promise.all(pokemonList).then(pokemonContainers => {
				// Ajouter la liste des pokemons à l'élement "pokemon-list"
				const pokemonListElement = document.getElementById('pokemon-list');
				// Supprimer les enfants actuels
				while (pokemonListElement.firstChild) {
					pokemonListElement.removeChild(pokemonListElement.firstChild);
				}
				pokemonContainers.forEach(pokemonContainer => {
					pokemonListElement.appendChild(pokemonContainer);
				});
			});
		});
	} else {
		// Utiliser l'API PokeAPI pour récupérer les pokemons de la génération sélectionnée
		fetch(`https://pokeapi.co/api/v2/generation/${selectedGeneration}`).then(response => response.json()).then(data => {
			const pokemons = data.pokemon_species;
			pokemonList = pokemons.map(pokemon => {
				return fetch(pokemon.url).then(response => response.json()).then(pokemonData => {
					// Créer la div conteneur pour chaque élément <li>
					const pokemonContainer = document.createElement('div');
					pokemonContainer.classList.add('pokemon-card');
					// Créer l'élément <li> pour chaque pokemon
					const pokemonElement = document.createElement('li');
					const nameElement = document.createElement('p');
					const imageElement = document.createElement('img');
                    const seeMoreButton = document.createElement('button');
                                seeMoreButton.textContent = "Voir plus";
                                seeMoreButton.addEventListener('click', () => {
                                    document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`; 
                                });
					nameElement.textContent = pokemonData.name;
					imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
					imageElement.alt = pokemonData.name;
					pokemonElement.appendChild(nameElement);
					pokemonElement.appendChild(imageElement);
                    pokemonElement.appendChild(seeMoreButton);
					// Ajouter l'élément <li> à la div conteneur
					pokemonContainer.appendChild(pokemonElement);
					return pokemonContainer;
				});
			});
			// Attendre que toutes les requêtes soient terminées
			Promise.all(pokemonList).then(pokemonContainers => {
				// Ajouter la liste des pokemons à l'élement "pokemon-list"
				const pokemonListElement = document.getElementById('pokemon-list');
				// Supprimer les enfants actuels
				while (pokemonListElement.firstChild) {
					pokemonListElement.removeChild(pokemonListElement.firstChild);
				}
				pokemonContainers.forEach(pokemonContainer => {
					pokemonListElement.appendChild(pokemonContainer);
				});
			});
		});
	}
}

  window.onload = function() {
    filterPokemon();
}
  