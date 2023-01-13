let allPokemon = [];
let filteredPokemon = [];
let currentUrl;

fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
        allPokemon = data.results;
        console.log(allPokemon)
        const pokemonList = document.querySelector('.pokemon-list');
        displayPokemon(allPokemon);

        function displayPokemon(pokemonData) {
            pokemonList.innerHTML = "";
            pokemonData.forEach(pokemon => {
                fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const listItem = document.createElement('li');
                        const img = document.createElement("img");
                        currentUrl = pokemonData.sprites.front_default;
                        img.src = currentUrl;
                        img.id = pokemonData.name;
                        listItem.appendChild(img);
                        listItem.appendChild(document.createTextNode(pokemonData.name));


                        pokemonList.appendChild(listItem);

                    });
            });
        }
    });

