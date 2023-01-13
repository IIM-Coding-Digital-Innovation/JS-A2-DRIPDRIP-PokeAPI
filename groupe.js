const pokemons = [
    {name: "Pikachu", type: "électrique", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", id: 25},
    {name: "Salamèche", type: "feux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", id: 4},
    {name: "Carapuce", type: "eaux", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", id: 7},
    {name: "Bulbizarre", type: "herbe", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", id: 1},
    {name: "Rondoudou", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", id: 39},
    {name: "Chenipan", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", id: 10},
    {name: "Aspicot", type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", id: 13},
];

// Récupère l'élément HTML avec l'id "pokemon-container" pour y ajouter les informations des Pokémons
const pokemonContainer = document.getElementById("pokemon-container");

// Pour chaque Pokémon dans le tableau "pokemons", créer une "div" pour chaque Pokémon
for (let i = 0; i < pokemons.length; i++) {
      // Créer la div qui contiendra les informations du Pokémon
    let pokemonDiv = document.createElement("div");
    pokemonDiv.setAttribute('class','myCanvas tremble');
    pokemonDiv.setAttribute('id','tremble');
        // Ajouter des styles à la div pour une présentation agréable
    pokemonDiv.style.backgroundColor = '#919492';
    pokemonDiv.style.width = '10rem';
    pokemonDiv.style.grid = 'flex';
    pokemonDiv.style.justifySelf = 'center';
    pokemonDiv.style.textAlign = 'center';
    pokemonDiv.style.margin = '0.5rem';
    pokemonDiv.style.border = '0.25rem solid';
    pokemonDiv.style.borderRadius = '1rem';
    pokemonDiv.style.boxShadow = '10px 5px 5px gray';

        // Créer les éléments pour le nom, l'image et le type du Pokémon
    let pokemonName = document.createElement("p");
    let pokemonImg = document.createElement("img");
    let pokemonType = document.createElement("p");

        // Ajouter les valeurs des propriétés du Pokémon aux éléments créés
    pokemonName.innerHTML = pokemons[i].name;
    pokemonImg.src = pokemons[i].image;
    pokemonType.innerHTML = pokemons[i].type;

    // drag and drop
    pokemonImg.draggable = true;
    pokemonImg.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("text", pokemons[i].id);
    });
    // Ajouter les éléments créés pour le nom, l'image et le type du Pokémon à la div du Pokémon
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
 // Si le nombre d'équipes est égal à 6, ne pas en ajouter de nouvelles
    if (teams.length === 6) return;

    // Créer un élément 'li' pour afficher l'équipe
    const teamLi = document.createElement('li');
    teamLi.classList.add("team");
    
    // Créer un objet pour stocker les propriétés de l'équipe
    /** @type {Team} */
    const team = {
        id: nextId,
        node: teamLi,
        members: Array.from({ length: 6 }, () => ({ pokemonId: -1, skills: [] }))
    };
    nextId++;

    
    // afficher les pokémons et les stats sur deux colonnes
    const leftDiv = document.createElement('div');

    // Récupérer le nom de l'équipe entré dans le champ de saisie ou en créer un par défaut
    const name = teamNameInput.value || ('Équipe n°' + team.id);
    teamNameInput.value = "";
    
    //Créer un element pour afficher le nom de l'équipe

    const teamName = document.createElement('h2');
    teamName.innerText = name;

    // Ajouter le nom de l'équipe à la structure créée
    leftDiv.appendChild(teamName);

    // Crée une liste pour contenir les membres de l'équipe

    const membersUl = document.createElement('ul');

    // Ajoute une classe pour le style
    membersUl.classList.add("team-members")

    // Boucle pour créer 6 images pour les membres de l'équipe
    for (let i = 0; i < 6; i++) {
        const memberImg = document.createElement('img');
        memberImg.classList.add(i);
        memberImg.addEventListener("dragstart", (e) => e.preventDefault());
        memberImg.addEventListener("dragover", (e) => e.preventDefault())
        memberImg.addEventListener("drop", (e) => addPokemon(team.id, i, e.dataTransfer.getData("text")))
        membersUl.appendChild(memberImg);
    }
    leftDiv.appendChild(membersUl);

    // Crée un bouton pour supprimer l'équipe
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'Supprimer';
    // Ajoute un écouteur pour supprimer l'équipe lorsque cliqué
    deleteButton.addEventListener("click", deleteTeam(team.id));
    leftDiv.appendChild(deleteButton);

    // Ajouter la structure à l'élément 'li' qui affiche l'équipe
    teamLi.appendChild(leftDiv);

    // Crée un conteneur pour les compétences de l'équipe
    const skillsDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerText = "Talents";
    skillsDiv.appendChild(h3);
    const ul = document.createElement("ul");
    ul.classList.add("skills");
    skillsDiv.appendChild(ul);
    teamLi.appendChild(skillsDiv);
    
    teamsUl.appendChild(teamLi);
    teams.push(team);

    // Si le nombre d'équipes est égal à 6, bloque l'ajout d'équipe
    if (teams.length === 6) {
        addTeamButton.disabled = true;
        teamNameInput.disabled = true;
    }
};

// fonction qui retourne un listener/callback
const deleteTeam = (id) => () => {
    const index = teams.findIndex(t => t.id === id);
    const [team] = teams.splice(index, 1);
    team.node.remove();

    if (teams.length < 6) {
        addTeamButton.disabled = false;
        teamNameInput.disabled = false;
    }
};

function addPokemon(teamId, memberId, pokemonId) {
    const team = teams.find(t => t.id === teamId);
    team.members[memberId].pokemonId = pokemonId;
    team.node.getElementsByClassName(memberId).item(0).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        .then(res => res.json())
        .then(pokemon => team.members[memberId].skills = pokemon.moves.map(m => m.move.name))
        .then(() => displayTeamSkills(teamId));
}

function displayTeamSkills(teamId) {
    const team = teams.find(t => t.id === teamId);
    const ul = team.node.getElementsByClassName("skills").item(0);
    ul.innerHTML = "";
    for (const skill of new Set(team.members.flatMap(m => m.skills.slice(0, 3)))) {
        const li = document.createElement('li');
        li.innerText = skill;
        ul.appendChild(li);
    }
}

/** 
* @typedef Team
* @type {object}
* @property {number} id
* @property {HTMLLIElement} node
* @property {TeamMember[]} members 
*/

/** 
* @typedef TeamMember
* @type {object}
* @property {number} pokemonId
* @property {string[]} skills
*/