const fetch = require('node-fetch')
const fs = require('fs');
let fileName = 'input.txt'

const readInputFile = (inputFile) => {
  let data = fs.readFileSync(inputFile).toString()
  return data.split('\n')
}

const fetchPokemon = () => {
  let pokemonArray = readInputFile(fileName)
  pokemonArray.forEach((pokemon) => {
    let pokemonType = ''
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then((data) => data.types)
      .then((types) => {
        types.forEach((type) => {
          if (pokemonType.length !== 0) {
            pokemonType += ', ' + type.type.name
          } else {
            pokemonType += type.type.name;
          }
        })
      })
      .then(() => {
        pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
        pokemon += `: ${pokemonType}`
        console.log(`${pokemon}`)
      })
  })
  return pokemonArray
}

fetchPokemon()