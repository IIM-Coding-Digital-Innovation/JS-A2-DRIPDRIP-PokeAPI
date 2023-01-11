let allPokemon = [];
let currentUrl;

fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => {
        allPokemon = data.results;
        const pokemonList = document.querySelector('.pokemon-list');
        displayPokemon(allPokemon);

        function filterPokemon(generation, type, averageStat, evolution) {
            const filteredPokemon = allPokemon.filter(pokemon => {
                if (generation !== "All" && pokemon.generation !== generation) {
                    return false;
                }
                if (type !== "All" && !pokemon.type) {
                    return false;
                }
                if (averageStat !== "All" && pokemon.average_stat !== averageStat) {
                    return false;
                }
                if (evolution !== "All" && pokemon.evolution !== evolution) {
                    return false;
                }
                return true;
            });
            displayPokemon(filteredPokemon);
        }
        function displayPokemon(pokemonData) {
            pokemonList.innerHTML = "";
            pokemonData.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const listItem = document.createElement('li');
                        const img = document.createElement("img");
                        currentUrl = pokemonData.sprites.front_default;
                        img.src = currentUrl;
                        img.id = pokemonData.name;
                        listItem.appendChild(img);
                        listItem.appendChild(document.createTextNode(pokemonData.name));

                        const shinyBtn = document.createElement("button");
                        shinyBtn.innerHTML = "shiny";
                        shinyBtn.addEventListener("click", () => {
                            currentUrl = currentUrl === pokemonData.sprites.front_default ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default;
                            img.src = currentUrl;
                        });
                        listItem.appendChild(shinyBtn);
                        pokemonList.appendChild(listItem);
                    });
            });
        }

        const generationFilter = document.querySelector("#generation-filter");
        const typeFilter = document.querySelector("#type-filter");
        const averageStatFilter = document.querySelector("#average-stat-filter");
        const evolutionFilter = document.querySelector("#evolution-filter");

        generationFilter.addEventListener("change", event => {
            filterPokemon(event.target.value, typeFilter.value, averageStatFilter.value, evolutionFilter.value);
        });
        typeFilter.addEventListener("change", event => {
            filterPokemon(generationFilter.value, event.target.value, averageStatFilter.value, evolutionFilter.value);
        });
        averageStatFilter.addEventListener("change", event => {
            filterPokemon(generationFilter.value, typeFilter.value, event.target.value, evolutionFilter.value);
        });
        evolutionFilter.addEventListener("change", event => {
            filterPokemon(generationFilter.value, typeFilter.value, averageStatFilter.value, event.target.value);
        });
    });

