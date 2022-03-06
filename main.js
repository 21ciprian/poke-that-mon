"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchButton = document.querySelector('#search');
const nameInput = document.querySelector('#nameInput');
// console.log('nameInput: ', nameInput)
const pokemonsContainer = (document.querySelector('#pokemonContainer'));
console.log('pokemonsContainer: ', pokemonsContainer);
const pokemonModal = document.querySelector('#pokemonModal');
const pokemon_number = 10;
function getPokemonsList() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i <= pokemon_number; i++) {
            yield getPokemonById(i);
        }
    });
}
function getPokemonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = yield fetch(url);
        const pokemon = yield response.json();
        console.log('pokemon: ', pokemon);
        createMiniPokemonCard(pokemon);
    });
}
function createMiniPokemonCard(pokemon) {
    const poke_types = pokemon.types.map(type => type.type.name);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const miniPokemonCard = document.createElement('div');
    miniPokemonCard.classList.add('miniPokemonCard');
    miniPokemonCard.setAttribute('aria-label', pokemon.name);
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.setAttribute('aria-label', pokemon.name);
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info');
    infoContainer.setAttribute('aria-label', pokemon.name);
    const pokeImg = document.createElement('img');
    pokeImg.setAttribute('aria-label', pokemon.name);
    pokeImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`);
    pokeImg.setAttribute('alt', pokemon.name);
    const idPokemon = document.createElement('span');
    idPokemon.setAttribute('aria-label', pokemon.name);
    idPokemon.classList.add('number');
    idPokemon.innerText = `#${pokemon.id.toString().padStart(3, '0')}`;
    const pokemonName = document.createElement('h3');
    pokemonName.setAttribute('aria-label', pokemon.name);
    pokemonName.classList.add('name');
    pokemonName.innerText = name;
    const pokemonType = document.createElement('small');
    pokemonType.classList.add('type');
    pokemonType.innerText = `Type: `;
    const spanType = document.createElement('span');
    spanType.innerText = poke_types[0];
    pokemonType.appendChild(spanType);
    imgContainer.appendChild(pokeImg);
    infoContainer.append(idPokemon, pokemonName, pokemonType);
    miniPokemonCard.append(imgContainer, infoContainer);
    pokemonsContainer.appendChild(miniPokemonCard);
    miniPokemonCard.addEventListener('click', getPokemonByLabel);
}
function getPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        //name
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = yield fetch(url);
        const pokemonName = yield response.json();
        // createBigPokemonCard(pokemonName)
        nameInput.value = '';
        console.log('pokemonName', pokemonName);
    });
}
// getPokemonByName('bulbasaur')
function handleSearch() {
    const name = nameInput.value;
    getPokemonByName(name);
    // pokemonModal.style.display = 'block'
}
searchButton.addEventListener('click', handleSearch);
function createBigPokemonCard(pokemon) {
    const poke_types = pokemon.types.map(type => type.type.name);
    const bigPokemonCard = document.createElement('div');
    bigPokemonCard.classList.add('bigPokemonCard');
    const firstMoves = 3;
    const moves = [];
    for (let i = 0; i < firstMoves; i++) {
        moves.push(pokemon.moves[i].move.name);
    }
    // console.log('move outside', moves)
    const pokemon_types = pokemon.types.map(function (item) {
        return item.type.name;
    });
    const abilities = pokemon.abilities.map(function (item) {
        return item.ability;
    });
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const abilityLi = document.createElement('li');
    const moveLi = document.createElement('li');
    const ability = abilities
        .map(function (item) {
        return (abilityLi.innerText = `${item.name}`);
        // `<li>${item.name}</li>`) //(<HTMLElement>document.createElement('li'))
    })
        .join('');
    const move = moves
        .map(function (move) {
        return (moveLi.innerText = `${move}`); //`<li>${item}</li>`
    })
        .join('');
    // console.log('move', move)
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.setAttribute('aria-label', pokemon.name);
    const pokeImg = document.createElement('img');
    pokeImg.setAttribute('aria-label', pokemon.name);
    pokeImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`);
    pokeImg.setAttribute('alt', pokemon.name);
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info');
    const numNameType = document.createElement('div');
    const spanNum = document.createElement('span');
    spanNum.innerText = `#${pokemon.id.toString().padStart(3, '0')}`;
    spanNum.classList.add('number');
    const pokeName = document.createElement('h3');
    pokeName.classList.add('name');
    pokeName.innerText = name;
    const pokemonType = document.createElement('small');
    pokemonType.classList.add('type');
    pokemonType.innerText = `Type: `;
    const spanType = document.createElement('span');
    spanType.innerText = poke_types[0];
    const pokeStats = document.createElement('section');
    pokeStats.classList.add('stats');
    const divAbilities = document.createElement('div');
    divAbilities.classList.add('abilities');
    const abilitiesHeader = document.createElement('h4');
    divAbilities.classList.add('abilities');
    abilitiesHeader.innerText = `Main abilities: `;
    const abilitiesList = document.createElement('ul');
    abilitiesList.classList.add('ability');
    abilitiesList.appendChild(abilityLi);
    divAbilities.append(abilitiesHeader, abilitiesList);
    pokeStats.append(divAbilities);
    pokemonType.appendChild(spanType);
    const movesList = document.createElement('ul');
    movesList.classList.add('moves');
    const movesHeader = document.createElement('h4');
    movesHeader.innerText = `Main moves: `;
    movesList.appendChild(moveLi);
    imgContainer.appendChild(pokeImg);
    numNameType.append(spanNum, pokeName, pokemonType);
    infoContainer.append(numNameType, pokeStats, movesList);
    bigPokemonCard.append(imgContainer, infoContainer);
    pokemonModal.appendChild(bigPokemonCard);
}
function hideModal(event) {
    // console.log('hide')
    if (event.target === pokemonModal) {
        pokemonModal.style.display = 'none';
    }
}
function getPokemonByLabel(event) {
    event.stopPropagation();
    getPokemonByName(event.target.ariaLabel);
    pokemonModal.style.display = 'block';
}
window.addEventListener('click', hideModal);
getPokemonsList();
