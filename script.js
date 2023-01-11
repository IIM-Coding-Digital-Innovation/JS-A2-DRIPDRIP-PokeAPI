const pokemons = [
    {name: "Pikachu", type: "électrique", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"},
    {name: "Salamèche", type: "feux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},
    {name: "Carapuce", type: "eaux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"},
    {name: "Bulbizarre", type: "herbe", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
    {name: "Rondoudou", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"},
    {name: "Chenipan", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"},
    {name: "Aspicot", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png"},
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

const teamsUl = document.getElementById("teams");
const addTeamButton = document.getElementById("add-team");
const teamNameInput = document.getElementById("new-team-name");
/** @type {Team[]} */
const teams = [];
let nextId = 1;

const addTeam = () => {
    const teamLi = document.createElement('li');
    
    /** @type {Team} */
    const team = {
        id: nextId,
        node: teamLi,
        members: Array.from({ length: 6 }).fill(-1) 
    };
    nextId++;

    const name = teamNameInput.value || ('Équipe n°' + team.id);
    teamNameInput.value = "";
    
    const teamName = document.createElement('h2');
    teamName.innerText = name;
    teamLi.appendChild(teamName);

    const membersUl = document.createElement('ul');
    membersUl.classList.add("team-members")
    for (let i = 0; i < 6; i++) {
        const memberImg = document.createElement('img');
        membersUl.appendChild(memberImg);
    }
    teamLi.appendChild(membersUl);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'Supprimer';
    deleteButton.addEventListener("click", deleteTeam(team.id));
    teamLi.appendChild(deleteButton);
    
    teamsUl.appendChild(teamLi);
    teams.push(team);
};

// fonction qui retourne un listener/callback
const deleteTeam = (id) => () => {
    const index = teams.findIndex(t => t.id === id);
    const [team] = teams.splice(index, 1);
    team.node.remove();
};

/** 
* @typedef Team
* @type {object}
* @property {number} id
* @property {HTMLLIElement} node
* @property {number[]} members 
*/