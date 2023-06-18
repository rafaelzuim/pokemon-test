// src/controllers/PokemonController.ts

import {Request, Response} from 'express';
import {PokemonService} from '../services/PokemonService';
import {SearchFilters} from "../types/SearchFilter";
import {PaginationService} from "../services/PaginationService";

export class PokemonController {

    constructor(private pokemonService: PokemonService) {
    }

    async getAllPokemon(req: Request, res: Response): Promise<void> {

        try {
            // extract the query params
            const { hp, attack, defense, name } = req.query;

            const searchFilters: SearchFilters = {
                hp: typeof hp === "string"? parseInt(hp, 10) : null,
                attack: typeof attack === "string"? parseInt(attack, 10) : null,
                defense: typeof defense === "string"? parseInt(defense, 10) : null,
                name: typeof name === "string"? name : null,
            }

            // initial load
            const pokemons = await this.pokemonService.getAllPokemons(searchFilters);
            const paginatedResponse = new PaginationService(req);

            // Send response
            res.json(paginatedResponse.paginateResults(pokemons));
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}