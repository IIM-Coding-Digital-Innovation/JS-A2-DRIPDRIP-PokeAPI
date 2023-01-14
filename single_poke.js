(async function () {
    const pageId = getPageId();
    console.log(pageId);
    getPage(pageId);
  })();
  
  function getPageId() {
    return new URL(location.href).searchParams.get("pokeId");
  }
  
  function getPage(pageId) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${pageId}`;
    console.log(API_URL);
    getPoke(API_URL);
  
    const main = document.getElementById("single_poke");
  
    function getPoke(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          singlePoke(data);
          function singlePoke(data) {
            const pokemonEL = document.createElement("div"); // creation de div cette div va etre notre card
            pokemonEL.classList.add("single_poke");
            const { id, name, sprites, types, height, weight, stats } = data; // on defini la constante pokemon
            const type = types[0].type.name;
            // cretion d'un élement html qui va etre modifier et génerer par le js
            if (types.length == 1) {
              const pokeInnerHTML = ` 
              <div class="img_single_pokemon">
              <img src="${sprites.front_default}" alt="${name}"/>
          </div>
          <div class="single_info">
            <div class="infos">
              <p class="single_number">
                  Number in pokedex : ${id}
              </p>
              <h2 class="single_name">
                  ${name}
              </h2>
              <p class="single_type">
                  Type : <span class="${types[0].type.name}">${types[0].type.name}</span> 
              </p >
              <div class="statistique">
                <p> Heigth : ${height}</p>
                <p> Weigth : ${weight}</p>
              </div>
              <div> 
                <h3> Pokemon version shiny : </h3>
                <img src="${sprites.front_shiny}" alt="${name}"/>
              </div>
            </div>
            <div class="statistiques">
                <h3> Pokemon statistique </h3>
                <span class="">${stats[0].stat.name} : ${stats[0].base_stat}</span> 
                <span class="">${stats[1].stat.name} : ${stats[1].base_stat}</span>
                <span class="">${stats[2].stat.name} : ${stats[2].base_stat}</span>
                <span class="">${stats[3].stat.name} : ${stats[3].base_stat}</span>
                <span class="">${stats[4].stat.name} : ${stats[4].base_stat}</span>
                <span class="">${stats[5].stat.name} : ${stats[5].base_stat}</span>
              </div >  
          </div>
      </div>`;
              pokemonEL.innerHTML = pokeInnerHTML;
              main.appendChild(pokemonEL);
            } else if (types.length == 2) {
              const pokeInnerHTMTwoType = ` 
                  <div class="img_single_pokemon">
                      <img src="${sprites.front_default}" alt="${name}"/>
                  </div>
                  <div class="single_info">
                    <div class="infos">
                      <p class="single_number">
                          Number in pokedex : ${id}
                      </p>
                      <h2 class="single_name">
                          ${name}
                      </h2>
                      <p class="single_type">
                          Type : <span class="${types[0].type.name}">${types[0].type.name}</span> 
                          <span class="${types[1].type.name}">${types[1].type.name}</span>
                      </p >
                      <div class="statistique">
                        <p> Heigth : ${height}</p>
                        <p> Weigth : ${weight}</p>
                      </div>
                      <div> 
                        <h3> Pokemon version shiny : </h3>
                        <img src="${sprites.front_shiny}" alt="${name}"/>
                      </div>
                    </div>
                    <div class="statistiques">
                        <h3> Pokemon statistique </h3>
                        <span class="">${stats[0].stat.name} : ${stats[0].base_stat}</span> 
                        <span class="">${stats[1].stat.name} : ${stats[1].base_stat}</span>
                        <span class="">${stats[2].stat.name} : ${stats[2].base_stat}</span>
                        <span class="">${stats[3].stat.name} : ${stats[3].base_stat}</span>
                        <span class="">${stats[4].stat.name} : ${stats[4].base_stat}</span>
                        <span class="">${stats[5].stat.name} : ${stats[5].base_stat}</span>
                      </div >  
                  </div>
              </div>`;
              pokemonEL.innerHTML = pokeInnerHTMTwoType;
              main.appendChild(pokemonEL);
            }
          }
        });
    }
  }
  
  
  const card = document.getElementsByClassName('img_single_pokemon');
  document.addEventListener("scroll", function() {
    card.classList.add('shake');
    console.log("shake");
  });