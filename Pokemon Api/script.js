const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pName = document.getElementById("pokemon-name");
const pId = document.getElementById("pokemon-id");
const pImageDiv = document.getElementById("pokemon-image");
const pTypes = document.getElementById("types");
const pWeight = document.getElementById("weight");
const pHeight = document.getElementById("height");
const pHp = document.getElementById("hp");
const pAttack = document.getElementById("attack");
const pDefense = document.getElementById("defense");
const pSpeed = document.getElementById("speed");
const pSpecialAttack = document.getElementById("special-attack");
const pSpecialDefense = document.getElementById("special-defense");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

searchBtn.addEventListener('click', () => {
  const search = searchInput.value;

  pTypes.innerText = "";

  let searchUrl = `${url}/${search}`;
  try {
    fetch(searchUrl.toLowerCase())
      .then((response) => {
        if(response.status === 404){
          alert("Pokémon not found");
          return response;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        pName.innerText = data.name.toUpperCase();
        pId.innerText = data.id;
        pWeight.innerText = data.weight;
        pHeight.innerText = data.height;
        pHp.innerText = data.stats[0].base_stat;
        pAttack.innerText = data.stats[1].base_stat;
        pDefense.innerText = data.stats[2].base_stat;
        pSpeed.innerText = data.stats[5].base_stat;
        pSpecialAttack.innerText = data.stats[3].base_stat;
        pSpecialDefense.innerText = data.stats[4].base_stat;
        pImageDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}"/>`
        // Map through types array
        let temp = ``;
        data.types.map((item) => {
          temp += `<p>${item.type.name.toUpperCase()}</p>`
        })
        pTypes.innerHTML = temp;
      })
      .catch((err) => {
        console.log(`Fetch Error : ${err}`)
      })
  } catch (error) {
    console.log(error);
  }
  
});

/**
 * 
 * Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon to see a list of all valid Pokémon names, id numbers, and URLs.

Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id} to get data for a Pokémon, where {name-or-id} is the Pokémon's name or id number.

Note: Pokémon names should be in lowercase, have special characters removed, and be dash separated. Also, if the Pokémon has either ♀ or ♂ as part of its name, the format is {name-f} or {name-m}, respectively.

Example Requests
Click any of the example requests below to see its response.

All valid Pokémon:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon
Pikachu:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/25
 */
