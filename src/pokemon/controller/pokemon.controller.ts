import { Controller, Get, Query } from '@nestjs/common';
import { IPokemonResponse } from '../interface/pokemon.interface';
import { PokemonService } from '../service/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  
  @Get()
  async getPokemon(): Promise<IPokemonResponse> {
    return this.pokemonService.getPokemon();
  }
}