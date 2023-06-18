// src/routes.ts

import { Router } from 'express';
import { PokemonController } from './controllers/PokemonController';
import { PokemonService } from './services/PokemonService';
import { PokemonRepository } from './repositories/PokemonRepository';

const router = Router();
const pokemonRepository= new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const pokemonController = new PokemonController(pokemonService);

// Route to get all Pokemon
router.get('/pokemon', pokemonController.getAllPokemon.bind(pokemonController));

export default router;
