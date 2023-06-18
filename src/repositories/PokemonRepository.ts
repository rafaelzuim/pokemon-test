// src/repositories/PokemonRepository.ts

import { Pokemon } from '../models/Pokemon';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

export class PokemonRepository {
    private pokemons: Pokemon[] = [];

    async loadFromCSV(filePath: string): Promise<void> {
        const csvFilePath = path.join(__dirname, filePath);
        const csvData = await fsPromises.readFile(csvFilePath, 'utf-8');
        const pokemonData = this.parseCSV(csvData);


        this.pokemons = pokemonData.map((data) => ({
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
        }));
    }

    async getAll(): Promise<Pokemon[]> {
        return this.pokemons;
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
}
