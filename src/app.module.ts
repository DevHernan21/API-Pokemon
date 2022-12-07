import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/module/pokemon.module';
import { PokemonByIdModule } from './pokemon_by_id/module/pokemonById.module';

@Module({
  imports: [HttpModule, PokemonModule, PokemonByIdModule],
})
export class AppModule {}
