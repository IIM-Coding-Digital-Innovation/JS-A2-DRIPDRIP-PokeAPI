fetch(`https://pokeapi.co/api/v2/pokemon/${($_GET('pokeId'))}`)
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
                            const types = data.types;
                            const abilities = data.abilities;
                            const stats = data.stats;
                            const seeMoreButton = document.createElement('button');
                                seeMoreButton.textContent = "Voir plus";
                                seeMoreButton.addEventListener('click', () => {
                                    document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}&pokeTypes=${types}&pokeAbility=${abilities}&pokeStats=${stats}`; 
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