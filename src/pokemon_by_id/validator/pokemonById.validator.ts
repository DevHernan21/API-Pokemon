import { IsNumber, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonByIdQueryParams {
  @ApiProperty({
    description: 'Pon el nombre del pokemon.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}