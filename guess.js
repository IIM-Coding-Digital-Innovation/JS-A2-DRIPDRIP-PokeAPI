let pokemonName;

// Fetch a random Pokemon
$.get("https://pokeapi.co/api/v2/pokemon/random/", function(data) {
  pokemonName = data.name;
  $("#pokemon-image").attr("src", data.sprites.front_default);
});

// Handle form submission
$("#submit-guess").click(function(e) {
  e.preventDefault();
  let guess = $("#guess").val();
  if (guess.toLowerCase() === pokemonName) {
    $("#result").html("Correct! The Pokemon was " + pokemonName).addClass("correct");
  } else {
    $("#result").html("Incorrect. The Pokemon was " + pokemonName).addClass("incorrect");
  }
});
