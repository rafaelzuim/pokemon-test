// src/controllers/PokemonController.ts

import { Request, Response } from 'express';
import { PokemonService } from '../services/PokemonService';

export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    async getAllPokemon(_req: Request, res: Response): Promise<void> {
        try {
            const pokemons = await this.pokemonService.getAllPokemon();
            res.json(pokemons);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}