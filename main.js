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
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info');
    infoContainer.setAttribute('aria-label', pokemon.name);
    imgContainer.classList.add('img-container');
    imgContainer.setAttribute('aria-label', pokemon.name);
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
getPokemonByName('bulbasaur');
// getPokemonsList()
