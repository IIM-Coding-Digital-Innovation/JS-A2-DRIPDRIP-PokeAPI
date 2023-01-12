let allPokemon = [];
let filteredPokemon = [];
let currentUrl;

fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => {
        allPokemon = data.results;
        console.log(allPokemon)
        const pokemonList = document.querySelector('.pokemon-list');
        displayPokemon(allPokemon);

        allPokemon.forEach(pokemon => {
            fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
                .then(response => response.json())
                .then(pokemon => {
                    console.log(pokemon)
                })
        })

        function filterByCriteria(generation, type, averageStat, evolution) {
            filteredPokemon = allPokemon.filter(pokemon => {
                if (generation !== "All" && pokemon.generation !== generation) {
                    return false;
                }
                if (type !== "All" && (!pokemon.type || !pokemon.types.includes(type))) {
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
            return filteredPokemon;
        }

        function displayPokemon(pokemonData) {
        pokemonList.innerHTML = "";
        pokemonData.forEach(pokemon => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name +  '?limit=10')
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
                const gen = document.createElement("p");
                gen.innerHTML = "gen : " + pokemonData.past_generation;
                const type = document.createElement("p");
                type.innerHTML = "type : " + pokemonData.types.map(type => type.type.name).join(" / ");

                listItem.appendChild(gen);
                listItem.appendChild(type);
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
            filteredPokemon = filterByCriteria(event.target.value, typeFilter.value, averageStatFilter.value, evolutionFilter.value);
            displayPokemon(filteredPokemon);
        });
        typeFilter.addEventListener("change", event => {
            filteredPokemon = filterByCriteria(typeFilter.value, event.target.value, averageStatFilter.value, evolutionFilter.value);
            displayPokemon(filteredPokemon);
        });
        averageStatFilter.addEventListener("change", event => {
            filteredPokemon = filterByCriteria(generationFilter.value, typeFilter.value, event.target.value, evolutionFilter.value);
            displayPokemon(filteredPokemon);
        });
        evolutionFilter.addEventListener("change", event => {
            filteredPokemon = filterByCriteria(generationFilter.value, typeFilter.value, averageStatFilter.value, event.target.value);
            displayPokemon(filteredPokemon);
        });
    });

