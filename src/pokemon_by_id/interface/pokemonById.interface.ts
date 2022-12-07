export interface IDetailedByIdResult {
  pokeId: number;
  name: string;
  movesRaw: Array<string>;
  imageUrl: string;
  description: string;
  abilitiesRaw: Array<string>;
  statsRaw: Array<any>;
}

export interface IPokemonByIdRawResponse {
  abilities: Array<any>;
  descriptions: Array<any>;
  name: string;
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<any>;
  moves: Array<any>;
}