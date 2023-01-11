const pokemons = [
    {name: "Pikachu", type: "électrique", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"},
    {name: "Salamèche", type: "feux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},
    {name: "Carapuce", type: "eaux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"},
    {name: "Bulbizarre", type: "herbe", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
    {name: "Rondoudou", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"}
  ];
  
  const pokemonContainer = document.getElementById("pokemon-container");
  
  for (let i = 0; i < pokemons.length; i++) {
    let pokemonDiv = document.createElement("div");
    pokemonDiv.style.backgroundColor = '#919492';
    pokemonDiv.style.width = '10rem';
    pokemonDiv.style.grid = 'flex';
    pokemonDiv.style.justifySelf = 'center';
    pokemonDiv.style.textAlign = 'center';
    pokemonDiv.style.margin = '0.5rem';
    pokemonDiv.style.border = '0.25rem solid';
    pokemonDiv.style.borderRadius = '1rem';
    pokemonDiv.style.boxShadow = '10px 5px 5px gray';
    let pokemonName = document.createElement("p");
    let pokemonImg = document.createElement("img");
    let pokemonType = document.createElement("p");
  
    pokemonName.innerHTML = pokemons[i].name;
    pokemonImg.src = pokemons[i].image;
    pokemonType.innerHTML = pokemons[i].type;
  
    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(pokemonImg);
    pokemonDiv.appendChild(pokemonType);
    pokemonContainer.appendChild(pokemonDiv);
  }
  