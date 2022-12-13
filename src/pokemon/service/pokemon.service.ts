import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { 
  IDetailedResult,
  IPokemonRawResponse, 
  IPokemonResponse 
} from '../interface/pokemon.interface';
import { fetchData } from '../../utils/pokemon.utils';

@Injectable()
export class PokemonService {

  private getPokemonGeneric(): Promise<IPokemonRawResponse> {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;
    return fetchData(pokemonUrl)
  }

  async getPokemon(): Promise<IPokemonResponse> {
    try {
      const { next, previous, results } = await this.getPokemonGeneric();
      let detailedResults: Array<IDetailedResult> = await Promise.all(
        results.map(
          async ({ url: pokemonDetailUrl }): Promise<IDetailedResult> => {
            const {
              name,
              id,
              types: typesRaw,
              sprites: { front_default: imageUrl },
              weight,
              abilities: abilitiesRaw,
            } = await fetchData(pokemonDetailUrl);
            const abilities = abilitiesRaw.map(({ ability: { name } }) => name);
            const types = typesRaw.map(({ type: { name } }) => name);

            return { name, id, types, imageUrl, weight, abilities };
          },
        ),
      );

      detailedResults = detailedResults.filter(Boolean);

      return { next, previous, detailedResults};

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