import { PokemonByIdService } from './../service/pokemonById.service';
import { Controller, Get, Query } from '@nestjs/common';
import { IDetailedByIdResult } from '../interface/pokemonById.interface';
import { PokemonByIdQueryParams } from '../validator/pokemonById.validator';

@Controller('pokemon')
export class PokemonByIdController {
  constructor(private readonly pokemonByIdService: PokemonByIdService) {}

  @Get('getPokemonByName')
  async getPokemonById(
    @Query() pokemonByIdQueryParams: PokemonByIdQueryParams
  ): Promise<IDetailedByIdResult> {
    const { name } = pokemonByIdQueryParams;
    return this.pokemonByIdService.getPokemonById(name);
  }
}
