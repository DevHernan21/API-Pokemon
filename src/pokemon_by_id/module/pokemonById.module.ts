import { Module } from '@nestjs/common';
import { PokemonByIdController } from '../controller/pokemonById.controller';
import { PokemonByIdService } from '../service/pokemonById.service';

@Module({
  controllers: [PokemonByIdController],
  providers: [PokemonByIdService],
})
export class PokemonByIdModule {}
