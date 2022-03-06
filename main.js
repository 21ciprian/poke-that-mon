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
nameInput === null || nameInput === void 0 ? void 0 : nameInput.addEventListener('input', () => console.log('nameInput: ', nameInput.value));
// console.log('searchButton: ', searchButton.innerText)
const pokemonsContainer = document.getElementById('pokemonContainer');
const pokemonModal = document.querySelector('#pokemonModal');
const pokemon_number = 20;
function getPokemonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = yield fetch(url);
        const pokemon = yield response.json();
        console.log('pokemon: ', pokemon);
        // createMiniPokemonCard(pokemon);
    });
}
getPokemonById(2);
