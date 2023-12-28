const pokemonOl = document.getElementById('pokemons')
const btn = document.getElementById('loadmoreButton')
const limit = 10
let offset = 0
const maxrecords = 151;


function loadPokemonsItems(offset, limit){

pokeApi.getPokemons(offset,limit).then((pokemons = []) => {

   const newHtml =  pokemons.map((pokemon) => `

         <li class="pokemon ${pokemon.type}">
               <span class="number">#00${pokemon.number}</span>
                   <span class="name">${pokemon.name}</span>
                       <div class="detail">
                          <ol class="types">
                           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                      </ol>
                  <img class="img" src="${pokemon.photo}" alt="${pokemon.name}">
              </div> 
           </li>
      
      `).join('')
   
      pokemonOl.innerHTML += newHtml
})

}

loadPokemonsItems(offset,limit)

btn.addEventListener('click', () => {
   offset += limit

   const qtdRecords = offset + limit

   if(qtdRecords >= maxrecords){
      const newLimit = maxrecords - offset
   loadPokemonsItems(offset,newLimit)

   btn.parentElement.removeChild(btn)

   }else{
      loadPokemonsItems(offset,limit)

   } 


})