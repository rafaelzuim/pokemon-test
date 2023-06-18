// src/repositories/PokemonRepository.ts

import {Pokemon} from '../models/Pokemon';
import {promises as fsPromises} from 'fs';
import * as path from 'path';
import {SearchFilters} from "../types/SearchFilter";

export class PokemonRepository {
    private pokemons: Pokemon[] = [];

    async loadFromCSV(filePath: string): Promise<void> {
        const csvFilePath = path.join(__dirname, filePath);
        const csvData = await fsPromises.readFile(csvFilePath, 'utf-8');

        // simply loads the data from the csv
        const pokemonData = this.parseCSV(csvData);

        // mapping to Pokemon entities
        this.pokemons = pokemonData.map((data) => this.createPokemon(data));

        // filter and applies the logic to remove and change pokemon data accordingly to the business logic

        /**
         * todo If I have time, think about how to overcome this situation and clean up my code.
         * The spec is a bit ambiguous in relation to the TYPE field, therefore I'm always testing Type1 and Type2.
         **/
        this.pokemons = this.pokemons
            .filter((pokemon) => !pokemon.legendary)
            .filter((pokemon) => pokemon.type2 !== 'Ghost' && pokemon.type1 !== 'Ghost')
            .map((pokemon) => {
                if (pokemon.type1 === 'Steel' || pokemon.type2 === 'Steel') {
                    pokemon.hp *= 2;
                }

                if (pokemon.type1 === 'Fire' || pokemon.type2 === 'Fire') {
                    pokemon.attack -= pokemon.attack * 0.1;
                }

                if (pokemon.type1 === 'Bug' && pokemon.type2 === 'Flying' || pokemon.type1 === 'Flying' && pokemon.type2 === 'Bug') {
                    pokemon.speed += pokemon.speed * 0.1;
                }

                if (pokemon.name.charAt(0) === 'G') {
                    const defenseIncrease = (pokemon.name.length - 1) * 5;
                    pokemon.defense += defenseIncrease;
                }

                return pokemon;
            });
    }

    async getAll(filter: Partial<SearchFilters>): Promise<Pokemon[]> {
        const {hp, attack, defense, name} = filter;
        let filteredPokemon = this.pokemons;
        if (hp) {
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.hp === hp);
        }
        if (attack) {
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.attack === attack);
        }
        if (defense) {
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.defense === defense);
        }
        if (name) {
            const searchName = (name as string).toLowerCase();
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchName));
        }
        return filteredPokemon;
    }

    // Helper function to parse CSV content into an array of objects
    private parseCSV(csvContent: string): any[] {
        const lines = csvContent.trim().split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map((line) => {
            const values = line.split(',');
            return headers.reduce((obj: any, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });
    }

    private createPokemon(data: any): Pokemon {
        return {
            id: parseInt(data['#'], 10),
            name: data.Name,
            type1: data['Type 1'],
            type2: data['Type 2'],
            total: parseInt(data.Total, 10),
            hp: parseInt(data.HP, 10),
            attack: parseInt(data.Attack, 10),
            defense: parseInt(data.Defense, 10),
            spAtk: parseInt(data['Sp. Atk'], 10),
            spDef: parseInt(data['Sp. Def'], 10),
            speed: parseInt(data.Speed, 10),
            generation: parseInt(data.Generation, 10),
            legendary: data.Legendary === 'True',
        };
    }
}
