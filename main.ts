const searchButton = <HTMLButtonElement>document.querySelector('#search')
const nameInput = <HTMLInputElement>document.querySelector('#nameInput')

nameInput?.addEventListener('input', () =>
	console.log('nameInput: ', nameInput.value)
)
// console.log('searchButton: ', searchButton.innerText)

const pokemonsContainer = document.getElementById('pokemonContainer')
const pokemonModal = document.querySelector('#pokemonModal')
const pokemon_number: number = 20
async function getPokemonById(id: number): Promise<void> {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const response = await fetch(url)
	const pokemon = await response.json()
	console.log('pokemon: ', pokemon)

	// createMiniPokemonCard(pokemon);
}
getPokemonById(2)
