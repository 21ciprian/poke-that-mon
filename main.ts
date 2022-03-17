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
// console.log('nameInput: ', nameInput)

const pokemonsContainer = <HTMLElement>(
	document.querySelector('#pokemonContainer')
)
const pokemonModal = <HTMLElement>document.querySelector('#pokemonModal')
document.addEventListener('load', function () {
	console.log('window - load - capture') // 4th
	pokemonModal.style.display = 'block'
})

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

	createMiniPokemonCard(pokemon)
}
function createMiniPokemonCard(pokemon: PProps) {
	const poke_types = pokemon.types.map(type => type.type.name)
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

	const miniPokemonCard = <HTMLDivElement>document.createElement('div')
	miniPokemonCard.classList.add('miniPokemonCard')
	miniPokemonCard.setAttribute('aria-label', pokemon.name)

	const imgContainer = <HTMLDivElement>document.createElement('div')
	imgContainer.classList.add('img-container')
	imgContainer.setAttribute('aria-label', pokemon.name)

	const pokeImg = <HTMLImageElement>document.createElement('img')
	pokeImg.setAttribute('aria-label', pokemon.name)
	pokeImg.setAttribute(
		'src',
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
	)
	pokeImg.setAttribute('alt', pokemon.name)

	const infoContainer = <HTMLDivElement>document.createElement('div')
	infoContainer.classList.add('info')
	infoContainer.setAttribute('aria-label', pokemon.name)

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
	miniPokemonCard.addEventListener('click', getPokemonByLabel)
}

async function getPokemonByName(name: string) {
	//name
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`
	const response = await fetch(url)
	const pokemonName = await response.json()
	createBigPokemonCard(pokemonName)
	nameInput.value = ''
	console.log('pokemonName', pokemonName)
}
function handleSearch() {
	// event.preventDefault()
	const name = nameInput.value
	getPokemonByName(name)
	pokemonModal.style.display = 'block'
}
searchButton.addEventListener('click', handleSearch)

function createBigPokemonCard(pokemon: PProps) {
	const poke_types = pokemon.types.map(type => type.type.name)
	console.log('poke_types: ', poke_types[0])
	const bigPokemonCard = <HTMLDivElement>document.createElement('div')
	bigPokemonCard.classList.add('bigPokemonCard')

	const firstMoves = 3
	const moves = []
	for (let i = 0; i < firstMoves; i++) {
		moves.push(pokemon.moves[i].move.name)
	}

	const abilities = pokemon.abilities.map(function (item) {
		return item.ability
	})
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
	const abilitiesList = <HTMLUListElement>document.createElement('ul')
	abilitiesList.classList.add('ability')

	abilities
		.map(function (item) {
			const abilityLi = <HTMLLIElement>document.createElement('li')
			abilityLi.innerText = item.name
			abilitiesList.appendChild(abilityLi)
		})
		.join('')
	const movesList = <HTMLUListElement>document.createElement('ul')
	movesList.classList.add('moves')
	const movesHeader = <HTMLHeadingElement>document.createElement('h4')
	movesHeader.innerText = `Main moves: `
	movesList.appendChild(movesHeader)

	moves
		.map(function (move) {
			const moveLi = <HTMLLIElement>document.createElement('li')
			moveLi.innerText = move
			movesList.appendChild(moveLi)
		})
		.join('')
	const imgContainer = <HTMLDivElement>document.createElement('div')
	imgContainer.classList.add('img-container')
	imgContainer.setAttribute('aria-label', pokemon.name)

	const pokeImg = <HTMLImageElement>document.createElement('img')
	pokeImg.setAttribute('aria-label', pokemon.name)
	pokeImg.setAttribute(
		'src',
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
	)
	pokeImg.setAttribute('alt', pokemon.name)

	const infoContainer = <HTMLDivElement>document.createElement('div')
	infoContainer.classList.add('info')

	const numNameType = <HTMLDivElement>document.createElement('div')

	const spanNum = <HTMLSpanElement>document.createElement('span')
	spanNum.innerText = `#${pokemon.id.toString().padStart(3, '0')}`
	spanNum.classList.add('number')

	const pokeName = <HTMLHeadingElement>document.createElement('h3')
	pokeName.classList.add('name')
	pokeName.innerText = name

	const pokemonType = <HTMLElement>document.createElement('small')
	pokemonType.classList.add('type')
	pokemonType.innerText = `Type: `

	const spanType = <HTMLSpanElement>document.createElement('span')
	spanType.innerText = poke_types[0]

	const pokeStats = <HTMLElement>document.createElement('section')
	pokeStats.classList.add('stats')

	const divAbilities = <HTMLDivElement>document.createElement('div')
	divAbilities.classList.add('abilities')

	const abilitiesHeader = <HTMLHeadingElement>document.createElement('h4')
	divAbilities.classList.add('abilities')
	abilitiesHeader.innerText = `Main abilities: `

	divAbilities.append(abilitiesHeader, abilitiesList)
	pokeStats.append(divAbilities, movesList)
	pokemonType.appendChild(spanType)

	imgContainer.appendChild(pokeImg)

	numNameType.append(spanNum, pokeName, pokemonType)
	infoContainer.append(numNameType, pokeStats)

	bigPokemonCard.append(imgContainer, infoContainer)

	pokemonModal.appendChild(bigPokemonCard)
}

function hideModal(event: MouseEvent) {
	if (event.target === pokemonModal) {
		pokemonModal.style.display = 'none'
	}
}
function getPokemonByLabel(event: any) {
	getPokemonByName(event.target.ariaLabel)
	pokemonModal.style.display = 'block'
}
window.addEventListener('click', hideModal)

getPokemonsList()
