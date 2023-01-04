var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchButton = document.querySelector('#search');
var nameInput = document.querySelector('#nameInput');
var pokemonsContainer = (document.querySelector('#pokemonContainer'));
var pokemonModal = document.querySelector('#pokemonModal');
document.addEventListener('load', function () {
    pokemonModal.style.display = 'block';
});
var pokemon_number = 10;
function getPokemonsList() {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= pokemon_number)) return [3 /*break*/, 4];
                    return [4 /*yield*/, getPokemonById(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getPokemonById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, pokemon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://pokeapi.co/api/v2/pokemon/".concat(id);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    pokemon = _a.sent();
                    createMiniPokemonCard(pokemon);
                    return [2 /*return*/];
            }
        });
    });
}
function createMiniPokemonCard(pokemon) {
    var poke_types = pokemon.types.map(function (type) { return type.type.name; });
    var name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    var miniPokemonCard = document.createElement('div');
    miniPokemonCard.classList.add('miniPokemonCard');
    miniPokemonCard.setAttribute('aria-label', pokemon.name);
    var imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.setAttribute('aria-label', pokemon.name);
    var pokeImg = document.createElement('img');
    pokeImg.setAttribute('aria-label', pokemon.name);
    pokeImg.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/".concat(pokemon.id, ".png"));
    pokeImg.setAttribute('alt', pokemon.name);
    var infoContainer = document.createElement('div');
    infoContainer.classList.add('info');
    infoContainer.setAttribute('aria-label', pokemon.name);
    var idPokemon = document.createElement('span');
    idPokemon.setAttribute('aria-label', pokemon.name);
    idPokemon.classList.add('number');
    idPokemon.innerText = "#".concat(pokemon.id.toString().padStart(3, '0'));
    var pokemonName = document.createElement('h3');
    pokemonName.setAttribute('aria-label', pokemon.name);
    pokemonName.classList.add('name');
    pokemonName.innerText = name;
    var pokemonType = document.createElement('small');
    pokemonType.classList.add('type');
    pokemonType.innerText = "Type: ";
    var spanType = document.createElement('span');
    spanType.innerText = poke_types[0];
    pokemonType.appendChild(spanType);
    imgContainer.appendChild(pokeImg);
    infoContainer.append(idPokemon, pokemonName, pokemonType);
    miniPokemonCard.append(imgContainer, infoContainer);
    pokemonsContainer.appendChild(miniPokemonCard);
    miniPokemonCard.addEventListener('click', getPokemonByLabel);
}
function getPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, pokemonName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://pokeapi.co/api/v2/pokemon/".concat(name);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    pokemonName = _a.sent();
                    createBigPokemonCard(pokemonName);
                    nameInput.value = '';
                    return [2 /*return*/];
            }
        });
    });
}
function handleSearch() {
    // event.preventDefault()
    var name = nameInput.value;
    getPokemonByName(name);
    pokemonModal.style.display = 'block';
}
searchButton.addEventListener('click', handleSearch);
function createBigPokemonCard(pokemon) {
    var poke_types = pokemon.types.map(function (type) { return type.type.name; });
    var bigPokemonCard = document.createElement('div');
    bigPokemonCard.classList.add('bigPokemonCard');
    var firstMoves = 3;
    var moves = [];
    for (var i = 0; i < firstMoves; i++) {
        moves.push(pokemon.moves[i].move.name);
    }
    var abilities = pokemon.abilities.map(function (item) {
        return item.ability;
    });
    var name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    var abilitiesList = document.createElement('ul');
    abilitiesList.classList.add('ability');
    abilities
        .map(function (item) {
        var abilityLi = document.createElement('li');
        abilityLi.innerText = item.name;
        abilitiesList.appendChild(abilityLi);
    })
        .join('');
    var divMoves = document.createElement('div');
    divMoves.classList.add('moves');
    var movesList = document.createElement('ul');
    movesList.classList.add('moves');
    var movesHeader = document.createElement('h4');
    movesHeader.innerText = "Main moves: ";
    divMoves.append(movesHeader, movesList);
    moves
        .map(function (move) {
        var moveLi = document.createElement('li');
        moveLi.innerText = move;
        movesList.appendChild(moveLi);
    })
        .join('');
    var imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.setAttribute('aria-label', pokemon.name);
    var pokeImg = document.createElement('img');
    pokeImg.setAttribute('aria-label', pokemon.name);
    pokeImg.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/".concat(pokemon.id, ".png"));
    pokeImg.setAttribute('alt', pokemon.name);
    var infoContainer = document.createElement('div');
    infoContainer.classList.add('info');
    var numNameType = document.createElement('div');
    var spanNum = document.createElement('span');
    spanNum.innerText = "#".concat(pokemon.id.toString().padStart(3, '0'));
    spanNum.classList.add('number');
    var pokeName = document.createElement('h3');
    pokeName.classList.add('name');
    pokeName.innerText = name;
    var pokemonType = document.createElement('small');
    pokemonType.classList.add('type');
    pokemonType.innerText = "Type: ";
    var spanType = document.createElement('span');
    spanType.innerText = poke_types[0];
    var pokeStats = document.createElement('section');
    pokeStats.classList.add('stats');
    var divAbilities = document.createElement('div');
    divAbilities.classList.add('abilities');
    var abilitiesHeader = document.createElement('h4');
    divAbilities.classList.add('abilities');
    abilitiesHeader.innerText = "Main abilities: ";
    divAbilities.append(abilitiesHeader, abilitiesList);
    pokeStats.append(divAbilities, divMoves);
    pokemonType.appendChild(spanType);
    imgContainer.appendChild(pokeImg);
    numNameType.append(spanNum, pokeName, pokemonType);
    infoContainer.append(numNameType, pokeStats);
    bigPokemonCard.append(imgContainer, infoContainer);
    pokemonModal.appendChild(bigPokemonCard);
}
function hideModal(event) {
    if (event.target === pokemonModal) {
        pokemonModal.style.display = 'none';
    }
}
function getPokemonByLabel(event) {
    getPokemonByName(event.target.ariaLabel);
    pokemonModal.style.display = 'block';
}
window.addEventListener('click', hideModal);
getPokemonsList();
