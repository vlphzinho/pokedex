
const pokeApi = {}

function convertPokeApiDetailsTOPokemon(pokeDetails){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetails.name
    pokemon.number = pokeDetails.id
    // 
    const types = pokeDetails.types.map((typeslot) => typeslot.type.name)
    const [type] = types
    // 
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}


// lista de detalhes das requisiçoes, 
pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
          .then((responsejson)=> responsejson.json())
          .then(convertPokeApiDetailsTOPokemon)
}

// link , comrço e limite de busca da api....
pokeApi.getPokemons = (offset = 0, limit = 5) => {
const pokeapi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   
// requisiçoes da api, 
     return  fetch(pokeapi)
    .then((response) => response.json())
    .then((jsonbody) => jsonbody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
};
