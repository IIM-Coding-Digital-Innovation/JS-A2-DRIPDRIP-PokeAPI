let currentUrl;

fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => {
      const pokemonList = document.querySelector('.pokemon-list');
      data.results.forEach(pokemon => {
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
    });
