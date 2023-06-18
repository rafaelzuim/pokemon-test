// src/controllers/PokemonController.ts

import {Request, Response} from 'express';
import {PokemonService} from '../services/PokemonService';
import {SearchFilters} from "../types/SearchFilter";

const DEFAULT_PAGE_SIZE = 10;

export class PokemonController {

    constructor(private pokemonService: PokemonService) {
    }

    async getAllPokemon(req: Request, res: Response): Promise<void> {

        try {
            // extract the query params
            const { page, hp, attack, defense, name } = req.query;

            const searchFilters: SearchFilters = {
                hp: typeof hp === "string"? parseInt(hp, 10) : null,
                attack: typeof attack === "string"? parseInt(attack, 10) : null,
                defense: typeof defense === "string"? parseInt(defense, 10) : null,
                name: typeof name === "string"? name : null,
            }

            console.log(searchFilters);
            // initial load
            const pokemons = await this.pokemonService.getAllPokemons(searchFilters);

            // todo move to a class
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : DEFAULT_PAGE_SIZE;
            const totalPokemon = pokemons.length;
            const totalPages = Math.ceil(totalPokemon / pageSize);
            const currentPage = page ? parseInt(page as string, 10) : 1;
            const start = (currentPage - 1) * pageSize;
            const end = currentPage * pageSize;
            const paginatedPokemon = pokemons.slice(start, end);
            // end todo

            // Prepare response
            const response = {
                totalPokemon,
                totalPages,
                currentPage,
                pageSize,
                data: paginatedPokemon,
            };

            // Send response
            res.json(response);
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}