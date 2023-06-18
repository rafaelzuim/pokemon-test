import { Pokemon } from '../models/Pokemon';

interface pokemonDecorator
{
    isLegendary: () => boolean,
    isFromSteel: () => boolean,
    isFromFire: () => boolean,
    isABugAndCanFly: () => boolean,
    startsWithG: () => boolean
}

export function extendPokemonWithDecorators(pokemon: Pokemon): Pokemon & pokemonDecorator {
    return {
        ...pokemon,
        isLegendary: function () {
            return this.legendary;
        },
        isFromSteel: function () {
            return this.type1 === 'Steel' || this.type2 === 'Steel';
        },
        isFromFire: function () {
            return this.type1 === 'Fire' || this.type2 === 'Fire';
        },
        isABugAndCanFly: function () {
            return this.type1 === 'Bug' && this.type2 === 'Flying' || this.type1 === 'Flying' && this.type2 === 'Bug'
        },
        startsWithG: function () {
            return this.name.charAt(0) === 'G'
        }
    };
}