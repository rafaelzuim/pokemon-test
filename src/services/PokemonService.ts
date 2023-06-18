import { Pokemon } from '../models/Pokemon';
import { PokemonRepository } from '../repositories/PokemonRepository';
import {SearchFilters} from "../types/SearchFilter";

export class PokemonService {
    constructor(private pokemonRepository: PokemonRepository) {}

    async getAllPokemons( filters: Partial<SearchFilters>): Promise<Pokemon[]> {
        try {
            await this.pokemonRepository.loadFromCSV('../../Data/pokemon.csv');
        } catch (error: any) {
            console.log(error);
        }
        return await this.pokemonRepository.getAll(filters);
    }
}