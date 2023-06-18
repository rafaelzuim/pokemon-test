import { Pokemon } from '../models/Pokemon';
import { PokemonRepository } from '../repositories/PokemonRepository';

export class PokemonService {
    constructor(private pokemonRepository: PokemonRepository) {}

    async getAllPokemon(): Promise<Pokemon[]> {
        try {
            await this.pokemonRepository.loadFromCSV('../../Data/pokemon.csv');
        } catch (error: any) {
            console.log(error);
        }
        return await this.pokemonRepository.getAll();
    }
    async getPokemonByFilters(): Promise<Pokemon[]> {
        // todo implement the filters logic
        return await this.pokemonRepository.getAll();
    }

}