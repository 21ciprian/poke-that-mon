type PAbility = {
	ability: {
		name: string
		url: string
	}
	is_hidden: boolean
	slot: number
}
type PForm = {
	name: string
	url: string
}
type PGroupDetail = {
	level_learned_at: number
	move_learn_method: {
		name: string
		url: string
	}
	version_group: {
		name: string
		url: string
	}
}
type PSpecie = {
	name: string
	url: string
}
type PIndices = {
	game_index: number
	version: {
		name: string
		url: string
	}
}
type PSprite = {
	back_default: string
	back_female: string | null
	back_shiny: string
	back_shiny_female: string | null
	front_default: string
	front_female: string | null
	front_shiny: string
	front_shiny_female: string | null
	other: {
		dream_world: {
			back_default: string
			front_female: string | null
		}
		home: {
			front_default: string
			front_female: string | null
			back_shiny: string
			front_shiny_female: string | null
		}
		'official-artwork': {
			front_default: string
		}
	}
	versions: {}
}
type PType = {
	slot: number
	type: {
		name: string
		url: string
	}
}
type PStat = {
	base_stat: number
	effort: number
	stat: {
		name: string
		url: string
	}
}
type PMove = {
	move: {
		name: string
		url: string
	}
	version_group_details: PGroupDetail[]
}
type PProps = {
	abilities: PAbility[]
	base_experience: number
	forms: PForm[]
	game_indices: PIndices[]
	height: number
	held_items: any[]
	id: number
	is_default: boolean
	location_area_encounters: string
	moves: PMove[]
	name: string
	order: number
	past_types: any[]
	species: PSpecie
	sprites: any
	stats: PStat[]
	types: PType[]
	weight: number
}
const searchButton = <HTMLButtonElement>document.querySelector('#search')
const nameInput = <HTMLInputElement>document.querySelector('#nameInput')

const pokemonsContainer = <HTMLElement>(
	document.querySelector('#pokemonContainer')
)
console.log('pokemonsContainer: ', pokemonsContainer)
const pokemonModal = document.querySelector('#pokemonModal')

const pokemon_number: number = 10

async function getPokemonsList(): Promise<void> {
	for (let i = 1; i <= pokemon_number; i++) {
		await getPokemonById(i)
	}
}
async function getPokemonById(id: number): Promise<void> {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const response = await fetch(url)
	const pokemon = await response.json()
	console.log('pokemon: ', pokemon)

	createMiniPokemonCard(pokemon)
}
function createMiniPokemonCard(pokemon: PProps) {
	const poke_types = pokemon.types.map(type => type.type.name)
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
	const miniPokemonCard = <HTMLDivElement>document.createElement('div')

	miniPokemonCard.classList.add('miniPokemonCard')
	miniPokemonCard.setAttribute('aria-label', pokemon.name)

	const imgContainer = <HTMLDivElement>document.createElement('div')
	const infoContainer = <HTMLDivElement>document.createElement('div')
	infoContainer.classList.add('info')
	infoContainer.setAttribute('aria-label', pokemon.name)

	imgContainer.classList.add('img-container')
	imgContainer.setAttribute('aria-label', pokemon.name)

	const pokeImg = <HTMLImageElement>document.createElement('img')
	pokeImg.setAttribute('aria-label', pokemon.name)
	pokeImg.setAttribute(
		'src',
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
	)
	pokeImg.setAttribute('alt', pokemon.name)

	const idPokemon = <HTMLSpanElement>document.createElement('span')
	idPokemon.setAttribute('aria-label', pokemon.name)
	idPokemon.classList.add('number')
	idPokemon.innerText = `#${pokemon.id.toString().padStart(3, '0')}`

	const pokemonName = <HTMLHeadingElement>document.createElement('h3')
	pokemonName.setAttribute('aria-label', pokemon.name)
	pokemonName.classList.add('name')
	pokemonName.innerText = name

	const pokemonType = <HTMLElement>document.createElement('small')
	pokemonType.classList.add('type')
	pokemonType.innerText = `Type: `

	const spanType = <HTMLSpanElement>document.createElement('span')
	spanType.innerText = poke_types[0]

	pokemonType.appendChild(spanType)

	imgContainer.appendChild(pokeImg)
	infoContainer.append(idPokemon, pokemonName, pokemonType)
	miniPokemonCard.append(imgContainer, infoContainer)

	pokemonsContainer.appendChild(miniPokemonCard)
}

async function getPokemonByName(name: string) {
	//name
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`
	const response = await fetch(url)
	const pokemonName = await response.json()
	// createBigPokemonCard(pokemonName)
	nameInput.value = ''
	console.log('pokemonName', pokemonName)
}
getPokemonByName('bulbasaur')
// getPokemonsList()
