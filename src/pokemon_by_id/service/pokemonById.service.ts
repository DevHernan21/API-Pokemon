import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fetchData } from 'src/utils/pokemon.utils';
import {
  IDetailedByIdResult,
  IPokemonByIdRawResponse
} from '../interface/pokemonById.interface';

@Injectable()
export class PokemonByIdService {

  private getPokeById(value: string): Promise<IPokemonByIdRawResponse> {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${value}`;

    return fetchData(pokemonUrl);
  }

  private getCharacteristicById(id: number): Promise<IPokemonByIdRawResponse> {
    const pokemonUrl = `https://pokeapi.co/api/v2/characteristic/${id}`;

    return fetchData(pokemonUrl);
  }

  async getPokemonById(value: string): Promise<IDetailedByIdResult> {
    try {
      const { 
        abilities, 
        name, 
        id: pokeId, 
        sprites, 
        stats, 
        moves 
      } = await this.getPokeById(value);
      const imageUrl = sprites.other['official-artwork'].front_default;
      const movesRaw = moves.map(({ move: { name } }) => name);
      const abilitiesRaw = abilities.map(({ ability: { name } }) => name);
      const statsRaw = stats.map(({ stat: { name }, base_stat:  baseStat }) => { return { name, baseStat } });

      const { descriptions } = await this.getCharacteristicById(pokeId);
      const allDescriptions = descriptions.find((e) => e.language.name === 'es');
      const description = allDescriptions.description;

      return { 
        description,
        abilitiesRaw,
        name,
        pokeId,
        imageUrl,
        statsRaw,
        movesRaw
      };

    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error?.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}